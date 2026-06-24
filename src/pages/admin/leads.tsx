import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Mail, Phone, Bell } from "lucide-react";
import { leadService } from "@/services/leadService";
import { useToast } from "@/hooks/use-toast";

export default function AdminLeads() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadLeads();
  }, [statusFilter, searchQuery]);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const data = await leadService.getContactLeads({
        status: statusFilter !== "all" ? statusFilter : undefined,
        search: searchQuery
      });
      setLeads(data);
    } catch (error) {
      console.error("Error loading leads:", error);
      toast({
        title: "Error Loading Leads",
        description: "Could not load lead data from database.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads;

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
            <Link href="/admin/leads" className="text-sm font-medium text-foreground hover:text-foreground transition-colors">
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
                  placeholder="Search by name or email..."
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
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
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
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading leads...
              </div>
            ) : (
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
                            {lead.id.slice(0, 8).toUpperCase()}
                          </span>
                          <Badge variant={
                            lead.status === "new" ? "default" :
                            lead.status === "contacted" ? "secondary" : "outline"
                          }>
                            {lead.status.toUpperCase()}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{lead.full_name}</h3>
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              {lead.phone}
                            </div>
                          )}
                        </div>
                        <div className="mb-2">
                          <div className="text-sm font-medium text-foreground">Subject: {lead.subject}</div>
                        </div>
                        <p className="text-sm text-muted-foreground italic line-clamp-2">
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
                      Submitted: {new Date(lead.created_at).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                ))}

                {filteredLeads.length === 0 && !loading && (
                  <div className="text-center py-12 text-muted-foreground">
                    {searchQuery || statusFilter !== "all" 
                      ? "No leads found matching your search criteria."
                      : "No leads submitted yet. New contact submissions will appear here automatically."}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}