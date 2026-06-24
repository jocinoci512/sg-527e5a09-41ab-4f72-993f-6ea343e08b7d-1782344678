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
  const [soundOn, setSoundOn] = useState(soundEnabled);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      
      if (soundOn) {
        const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE=");
        audio.play().catch(() => {});
      }
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [notification, soundOn, onClose]);

  if (!notification || !isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <Card className="w-96 border-primary shadow-lg">
        <CardHeader className="relative pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <CardTitle className="text-base">New Case Submission</CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setSoundOn(!soundOn)}
              >
                {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => onClose?.(), 300);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
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
              {new Date(notification.createdAt).toLocaleString()}
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