import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, FileText, Eye, Bell } from "lucide-react";
import { format } from "date-fns";

export default function AdminCases() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - will be replaced with Supabase queries
  const cases = [
    {
      id: "CASE-2024-156",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 555-0123",
      country: "United States",
      scamType: "Pig Butchering Scam",
      amountLost: "$45,000",
      cryptocurrency: "USDT",
      status: "active",
      date: "2026-06-22T14:30:00Z"
    },
    {
      id: "CASE-2024-155",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 555-0124",
      country: "Canada",
      scamType: "Crypto Exchange Fraud",
      amountLost: "$23,500",
      cryptocurrency: "Bitcoin",
      status: "pending",
      date: "2026-06-21T10:15:00Z"
    },
    {
      id: "CASE-2024-154",
      name: "Michael Johnson",
      email: "m.johnson@example.com",
      phone: "+44 7700 900123",
      country: "United Kingdom",
      scamType: "Romance Scam",
      amountLost: "$67,000",
      cryptocurrency: "Ethereum",
      status: "active",
      date: "2026-06-20T16:45:00Z"
    },
    {
      id: "CASE-2024-153",
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      phone: "+61 412 345 678",
      country: "Australia",
      scamType: "Investment Scam",
      amountLost: "$89,000",
      cryptocurrency: "Bitcoin",
      status: "closed",
      date: "2026-06-19T09:20:00Z"
    },
    {
      id: "CASE-2024-152",
      name: "David Brown",
      email: "david.b@example.com",
      phone: "+1 555-0125",
      country: "United States",
      scamType: "NFT Scam",
      amountLost: "$12,300",
      cryptocurrency: "Ethereum",
      status: "pending",
      date: "2026-06-18T13:00:00Z"
    }
  ];

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
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
            <Link href="/admin/cases" className="text-sm font-medium text-foreground hover:text-foreground transition-colors">
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
            <Link href="/admin/notifications" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-4 w-4" />
            </Link>
          </nav>
          <div className="ml-auto">
            <Button asChild variant="outline" size="sm">
              <Link href="/">View Site</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground font-heading">Case Management</h1>
          <p className="text-muted-foreground mt-2">
            Review and manage fraud investigation case submissions
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filter Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name, email, or case ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Cases Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Cases ({filteredCases.length})</CardTitle>
              <Badge variant="outline">
                {cases.filter(c => c.status === "pending").length} Pending Review
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="p-4 border-2 rounded-lg hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm text-primary font-bold">
                          {caseItem.id}
                        </span>
                        <Badge variant={
                          caseItem.status === "active" ? "default" :
                          caseItem.status === "pending" ? "secondary" : "outline"
                        }>
                          {caseItem.status.toUpperCase()}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg">{caseItem.name}</h3>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Contact</div>
                      <div className="font-medium">{caseItem.email}</div>
                      <div className="text-muted-foreground">{caseItem.phone}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Location</div>
                      <div className="font-medium">{caseItem.country}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Scam Type</div>
                      <div className="font-medium">{caseItem.scamType}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Amount / Crypto</div>
                      <div className="font-medium">{caseItem.amountLost}</div>
                      <div className="text-muted-foreground">{caseItem.cryptocurrency}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                    Submitted: {new Date(caseItem.date).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              ))}

              {filteredCases.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No cases found matching your search criteria.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}