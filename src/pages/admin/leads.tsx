import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  MessageSquare,
  Settings,
  LogOut,
  Search,
  Filter,
  Mail,
  Phone
} from "lucide-react";

export default function AdminLeads() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Mock data - will be replaced with Supabase queries
  const leads = [
    {
      id: "LEAD-1234",
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      phone: "+1 555-0126",
      type: "Case Review",
      message: "I need help recovering $50k stolen in a crypto scam...",
      status: "new",
      date: "2026-06-23T14:20:00Z"
    },
    {
      id: "LEAD-1233",
      name: "David Brown",
      email: "david.b@example.com",
      phone: "+1 555-0127",
      type: "Contact Form",
      message: "Can you help with investigating a romance scam?",
      status: "contacted",
      date: "2026-06-23T09:15:00Z"
    },
    {
      id: "LEAD-1232",
      name: "Emily Chen",
      email: "emily.chen@example.com",
      phone: "+65 9123 4567",
      type: "Case Review",
      message: "Lost $80k in investment fraud, need blockchain tracing...",
      status: "new",
      date: "2026-06-22T16:30:00Z"
    },
    {
      id: "LEAD-1231",
      name: "Robert Martinez",
      email: "r.martinez@example.com",
      phone: "+1 555-0128",
      type: "Contact Form",
      message: "General inquiry about your services...",
      status: "qualified",
      date: "2026-06-22T11:00:00Z"
    }
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || lead.type === typeFilter;
    return matchesSearch && matchesType;
  });

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
              <Button variant="default" size="sm" asChild>
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
          <h1 className="text-3xl font-bold text-foreground font-heading">Lead Management</h1>
          <p className="text-muted-foreground mt-2">
            Review and manage contact form submissions and inquiries
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filter Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name, email, or lead ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Case Review">Case Review</SelectItem>
                  <SelectItem value="Contact Form">Contact Form</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
              <Badge variant="outline">
                {leads.filter(l => l.status === "new").length} New
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 border-2 rounded-lg hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm text-primary font-bold">
                          {lead.id}
                        </span>
                        <Badge variant={
                          lead.status === "new" ? "default" :
                          lead.status === "contacted" ? "secondary" : "outline"
                        }>
                          {lead.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {lead.type}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{lead.name}</h3>
                      <div className="flex flex-col gap-1 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        "{lead.message}"
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Mark as Contacted
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t text-sm text-muted-foreground">
                    Submitted: {new Date(lead.date).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              ))}

              {filteredLeads.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No leads found matching your search criteria.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}