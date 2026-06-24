import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, BellOff, Check, CheckCheck, Search, Filter, FileText, AlertCircle, TrendingUp, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface NotificationItem {
  id: string;
  type: "case" | "lead" | "status" | "system";
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  metadata?: {
    caseId?: string;
    leadId?: string;
    status?: string;
  };
}

export default function AdminNotifications() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Mock data - will be replaced with Supabase real-time subscriptions
  const notifications: NotificationItem[] = [
    {
      id: "1",
      type: "case",
      title: "New Case Submission",
      message: "John Doe submitted a cryptocurrency fraud case from United States",
      createdAt: "2026-06-24T00:30:00Z",
      isRead: false,
      metadata: { caseId: "case-123" },
    },
    {
      id: "2",
      type: "lead",
      title: "New Contact Form",
      message: "Sarah Johnson sent a general inquiry via contact form",
      createdAt: "2026-06-24T00:15:00Z",
      isRead: false,
      metadata: { leadId: "lead-456" },
    },
    {
      id: "3",
      type: "status",
      title: "Case Status Updated",
      message: "Case #117 status changed to 'Under Investigation'",
      createdAt: "2026-06-23T23:45:00Z",
      isRead: true,
      metadata: { caseId: "case-117", status: "under_investigation" },
    },
    {
      id: "4",
      type: "case",
      title: "New Case Submission",
      message: "Michael Chen submitted a pig butchering scam case from Canada",
      createdAt: "2026-06-23T22:30:00Z",
      isRead: true,
      metadata: { caseId: "case-122" },
    },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    // TODO: Update notification status in Supabase
    console.log("Mark as read:", id);
  };

  const handleMarkAllAsRead = () => {
    // TODO: Bulk update all notifications in Supabase
    console.log("Mark all as read");
  };

  const getNotificationIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "case":
        return FileText;
      case "lead":
        return User;
      case "status":
        return TrendingUp;
      case "system":
        return AlertCircle;
      default:
        return Bell;
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesType = filterType === "all" || notification.type === filterType;
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesReadStatus = !showUnreadOnly || !notification.isRead;
    
    return matchesType && matchesSearch && matchesReadStatus;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Cipher Trace" width={40} height={40} />
            <span className="font-heading font-bold text-lg">Cipher Trace Admin</span>
          </Link>
          <nav className="flex items-center gap-6 ml-8">
            <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/cases" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Cases
            </Link>
            <Link href="/admin/leads" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Leads
            </Link>
            <Link href="/admin/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/admin/content" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Content
            </Link>
            <Link href="/admin/reports" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Reports
            </Link>
            <Link href="/admin/notifications" className="text-sm font-medium text-foreground hover:text-foreground transition-colors relative">
              Notifications
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </Link>
          </nav>
          <div className="ml-auto">
            <Button asChild variant="outline" size="sm">
              <Link href="/">View Site</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-heading mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              Real-time alerts and activity feed
            </p>
          </div>
          {unreadCount > 0 && (
            <Button onClick={handleMarkAllAsRead} variant="outline">
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark All as Read
            </Button>
          )}
        </div>

        {/* Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sound-alerts" className="text-base">
                  Sound Alerts
                </Label>
                <p className="text-sm text-muted-foreground">
                  Play a sound when new cases are submitted
                </p>
              </div>
              <Switch
                id="sound-alerts"
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="case">Cases</SelectItem>
                  <SelectItem value="lead">Leads</SelectItem>
                  <SelectItem value="status">Status Updates</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Switch
                  id="unread-only"
                  checked={showUnreadOnly}
                  onCheckedChange={setShowUnreadOnly}
                />
                <Label htmlFor="unread-only" className="cursor-pointer">
                  Unread only
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Feed</CardTitle>
            <CardDescription>
              {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No notifications to display</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex items-start gap-4 p-4 rounded-lg border transition-colors hover:bg-muted/50",
                        !notification.isRead && "bg-primary/5 border-primary/20"
                      )}
                    >
                      <div className={cn(
                        "p-2 rounded-full",
                        !notification.isRead ? "bg-primary/10" : "bg-muted"
                      )}>
                        <Icon className={cn(
                          "h-4 w-4",
                          !notification.isRead ? "text-primary" : "text-muted-foreground"
                        )} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium leading-none">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {format(new Date(notification.createdAt), "MMM d, h:mm a")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        {notification.metadata?.caseId && (
                          <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                            <Link href={`/admin/cases`}>
                              View Case →
                            </Link>
                          </Button>
                        )}
                      </div>
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="shrink-0"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Status */}
        <Card className="border-green-500/50 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-medium">Real-time notifications active</span>
              <span className="text-muted-foreground">
                • Connected to live feed (Supabase connection required for full functionality)
              </span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}