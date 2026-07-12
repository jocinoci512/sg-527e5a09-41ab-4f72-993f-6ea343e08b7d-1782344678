import { useEffect, useState } from "react";
import { Bell, X, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface NotificationPopupProps {
  notification: {
    id: string;
    fullName: string;
    country: string;
    scamType: string;
    createdAt: string;
  } | null;
  onClose: () => void;
  soundEnabled?: boolean;
}

export function NotificationPopup({ notification, onClose, soundEnabled = true }: NotificationPopupProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (notification) {
      setShow(true);
      
      // Play notification sound
      if (soundEnabled) {
        try {
          const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVKvi8bllHAU2jdXzzn0pBSh+zPLaizsIGGS56+OcTgwOUKXh8bllHAU1i9P0zn0pBSd9zPLaizsIGGO46uScTgwOT6Xh8rllHAU1i9Pzz30pBSd9zPLaizsIF2O46uScTgwOT6Xh8rllHAU1i9Pzz30pBSd9zPLaizsIF2O46uScTgwOT6Xh8rllHAU1i9Pzz30pBSd9zPLaizsIF2O46uScTgwOT6Xh8rllHAU1i9Pzz30pBSd9zPLaizsIF2O46uScTgwOT6Xh8rllHAU1i9Pzz30pBSd9zPLaizsIF2O46uScTgwOT6Xh8rllHAU1i9Pzz30pBSd9zPLaizsIF2O46uScTgwOT6Xh8rllHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rllHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rllHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rllHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rllHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rllHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rllHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rllHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rllHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rllHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rllHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rlkHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rlkHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rlkHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rlkHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rlkHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rlkHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rlkHAU1i9Pzz30pBSd9zPLbizsIF2O46uScTgwOT6Xh8rlkHAU1i9Pzz30pBSd9zPLbizsI');
          audio.play().catch(() => {
            // Ignore audio play errors (browser may block autoplay)
          });
        } catch (error) {
          // Ignore audio errors
        }
      }
      
      // Auto-dismiss after 8 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [notification, soundEnabled]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!notification || !show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <Card className="w-96 shadow-2xl border-2 border-primary/20 bg-background">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-base">New Case Submitted</h3>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Name:</span>
              <span className="font-medium text-sm">{notification.fullName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Country:</span>
              <span className="font-medium text-sm">{notification.country}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Type:</span>
              <Badge variant="secondary" className="text-xs">
                {notification.scamType}
              </Badge>
            </div>
          </div>
          
          <Button
            onClick={handleClose}
            className="w-full mt-4"
            size="sm"
          >
            <Bell className="mr-2 h-4 w-4" />
            View in Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}