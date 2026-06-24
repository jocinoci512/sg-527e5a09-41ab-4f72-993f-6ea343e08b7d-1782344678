import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  MessageSquare,
  Settings,
  LogOut,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react";

export default function AdminDashboard() {
  // Mock data - will be replaced with Supabase queries
  const stats = {
    totalCases: 142,
    pendingCases: 23,
    activeCases: 45,
    closedCases: 74,
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

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Image
              src="/logo.png"
              alt="Cipher Trace"
              width={150}
              height={45}
            />
            <nav className="flex gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/cases">
                  <FileText className="mr-2 h-4 w-4" />
                  Cases
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/leads">
                  <Users className="mr-2 h-4 w-4" />
                  Leads
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/content">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Content
                </Link>
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/login">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground font-heading">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back. Here's what's happening with your cases and leads.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCases}</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  <Clock className="mr-1 h-3 w-3" />
                  {stats.pendingCases} Pending
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <AlertCircle className="mr-1 h-3 w-3" />
                  {stats.activeCases} Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCases}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Currently under investigation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLeads}</div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                {stats.newLeads} new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed Cases</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.closedCases}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Successfully completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
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
                <div className="space-y-4">
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
                        <Link href={`/admin/cases/${caseItem.id}`}>View Details</Link>
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
                <div className="space-y-4">
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
                        <Link href={`/admin/leads/${lead.id}`}>View Details</Link>
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
      </main>
    </div>
  );
}