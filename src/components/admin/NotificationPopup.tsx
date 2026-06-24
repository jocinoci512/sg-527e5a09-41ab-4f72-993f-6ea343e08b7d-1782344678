import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Bell, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  fullName: string;
  country: string;
  scamType: string;
  createdAt: string;
}

interface NotificationPopupProps {
  notification: Notification | null;
  onClose: () => void;
  soundEnabled?: boolean;
}

export function NotificationPopup({ notification, onClose, soundEnabled = true }: NotificationPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      
      // Play sound alert if enabled
      if (soundEnabled) {
        try {
          const audio = new Audio("/notification.mp3");
          audio.volume = 0.5;
          audio.play().catch(() => {
            // Silently fail if autoplay is blocked
          });
        } catch (error) {
          // Ignore audio errors
        }
      }

      // Auto-dismiss after 10 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [notification, soundEnabled]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!notification) return null;

  return (
    <div
      className={cn(
        "fixed top-20 right-6 z-[100] w-96 transition-all duration-300 ease-in-out",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}
    >
      <Card className="border-primary shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary/10">
                <Bell className="h-4 w-4 text-primary animate-pulse" />
              </div>
              <CardTitle className="text-base">New Case Submission</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Name:</span> {notification.fullName}
            </div>
            <div>
              <span className="font-medium">Country:</span> {notification.country}
            </div>
            <div>
              <span className="font-medium">Scam Type:</span> {notification.scamType}
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date(notification.timestamp).toLocaleString()}
            </div>
          </div>

          <Button asChild className="w-full">
            <Link href="/admin/cases">View All Cases</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}