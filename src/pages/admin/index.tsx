import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Users, 
  Bell,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  FolderOpen
} from "lucide-react";
import { LiveCounter } from "@/components/admin/LiveCounter";
import { NotificationPopup } from "@/components/admin/NotificationPopup";

export default function AdminDashboard() {
  const [newNotification, setNewNotification] = useState<any>(null);
  const [unreadCount, setUnreadCount] = useState(2);

  // Mock data - will be replaced with Supabase real-time subscriptions
  const stats = {
    totalCases: 142,
    pendingCases: 23,
    activeCases: 45,
    closedCases: 74,
    newCasesToday: 5,
    totalLeads: 89,
    newLeads: 12
  };

  const recentCases = [
    {
      id: "CASE-2024-156",
      name: "John Doe",
      type: "Pig Butchering Scam",
      amount: "$45,000",
      status: "active",
      date: "2026-06-22"
    },
    {
      id: "CASE-2024-155",
      name: "Jane Smith",
      type: "Crypto Exchange Fraud",
      amount: "$23,500",
      status: "pending",
      date: "2026-06-21"
    },
    {
      id: "CASE-2024-154",
      name: "Michael Johnson",
      type: "Romance Scam",
      amount: "$67,000",
      status: "active",
      date: "2026-06-20"
    }
  ];

  const recentLeads = [
    {
      id: "LEAD-1234",
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      type: "Case Review",
      date: "2026-06-23"
    },
    {
      id: "LEAD-1233",
      name: "David Brown",
      email: "david.b@example.com",
      type: "Contact Form",
      date: "2026-06-23"
    }
  ];

  // Simulate real-time notification (in production, this would be Supabase subscription)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Uncomment to test notification popup
      // setNewNotification({
      //   id: "notif-1",
      //   fullName: "Test User",
      //   country: "United States",
      //   scamType: "Cryptocurrency Fraud",
      //   createdAt: new Date().toISOString()
      // });
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Cipher Trace" width={40} height={40} />
            <span className="font-heading font-bold text-lg">Cipher Trace Admin</span>
          </Link>
          <nav className="flex items-center gap-6 ml-8">
            <Link href="/admin" className="text-sm font-medium text-foreground hover:text-foreground transition-colors">
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
            <Link href="/admin/notifications" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell className="h-4 w-4" />
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
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome back. Here's what's happening with your cases and leads.
          </p>
        </div>

        {/* Real-time Live Counters */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <LiveCounter
            title="Total Cases"
            value={stats.totalCases}
            icon={FileText}
            trend={{ value: "+12.5%", isPositive: true }}
          />
          <LiveCounter
            title="New Today"
            value={stats.newCasesToday}
            icon={TrendingUp}
            pulse={true}
          />
          <LiveCounter
            title="Pending"
            value={stats.pendingCases}
            icon={Clock}
          />
          <LiveCounter
            title="Active"
            value={stats.activeCases}
            icon={AlertCircle}
          />
          <LiveCounter
            title="Closed"
            value={stats.closedCases}
            icon={CheckCircle}
          />
        </div>

        {/* Quick Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-primary" />
                Case Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pending Review</span>
                  <Badge variant="secondary">{stats.pendingCases}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Under Investigation</span>
                  <Badge variant="default">{stats.activeCases}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <Badge variant="outline">{stats.closedCases}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Lead Generation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Leads</span>
                  <span className="text-2xl font-bold">{stats.totalLeads}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">New This Week</span>
                  <Badge variant="default" className="bg-green-600">{stats.newLeads}</Badge>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  +18% conversion rate
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Tabs */}
        <Tabs defaultValue="cases" className="space-y-4">
          <TabsList>
            <TabsTrigger value="cases">Recent Cases</TabsTrigger>
            <TabsTrigger value="leads">Recent Leads</TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Case Submissions</CardTitle>
                <CardDescription>
                  Latest fraud investigation cases submitted through the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentCases.map((caseItem) => (
                    <div
                      key={caseItem.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm text-primary font-semibold">
                            {caseItem.id}
                          </span>
                          <Badge variant={
                            caseItem.status === "active" ? "default" :
                            caseItem.status === "pending" ? "secondary" : "outline"
                          }>
                            {caseItem.status}
                          </Badge>
                        </div>
                        <div className="font-medium">{caseItem.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {caseItem.type} • {caseItem.amount} • {new Date(caseItem.date).toLocaleDateString()}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/cases">View Details</Link>
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" asChild>
                    <Link href="/admin/cases">View All Cases</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Lead Inquiries</CardTitle>
                <CardDescription>
                  Latest contact form submissions and case review requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm text-primary font-semibold">
                            {lead.id}
                          </span>
                          <Badge variant="outline">{lead.type}</Badge>
                        </div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {lead.email} • {new Date(lead.date).toLocaleDateString()}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/leads">View Details</Link>
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" asChild>
                    <Link href="/admin/leads">View All Leads</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Real-time Status Indicator */}
        <Card className="border-green-500/50 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-medium">Real-time monitoring active</span>
              <span className="text-muted-foreground">
                • Dashboard updates automatically when new cases are submitted (Supabase connection required for full functionality)
              </span>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Real-time Notification Popup */}
      <NotificationPopup
        notification={newNotification}
        onClose={() => setNewNotification(null)}
        soundEnabled={true}
      />
    </div>
  );
}