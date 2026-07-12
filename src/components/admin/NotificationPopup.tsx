import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { emailService } from "@/services/emailService";
import Link from "next/link";

export function NotificationPopup() {
  const [recentCount, setRecentCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    loadRecentNotifications();
    const interval = setInterval(loadRecentNotifications, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const loadRecentNotifications = async () => {
    try {
      const notifications = await emailService.getNotificationHistory({ limit: 50 });
      const last24Hours = notifications.filter(n => {
        const sentDate = new Date(n.sent_at);
        const now = new Date();
        const hoursDiff = (now.getTime() - sentDate.getTime()) / (1000 * 60 * 60);
        return hoursDiff <= 24;
      });
      setRecentCount(last24Hours.length);
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={() => setShowPopup(!showPopup)}
      >
        <Bell className="h-5 w-5" />
        {recentCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {recentCount > 9 ? "9+" : recentCount}
          </Badge>
        )}
      </Button>

      {showPopup && (
        <Card className="absolute right-0 top-12 w-80 shadow-xl z-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Recent Notifications</h3>
              <Badge>{recentCount} new</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {recentCount} email notifications sent in the last 24 hours
            </p>
            <Button asChild className="w-full" size="sm">
              <Link href="/admin/notifications">
                View All Notifications
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}