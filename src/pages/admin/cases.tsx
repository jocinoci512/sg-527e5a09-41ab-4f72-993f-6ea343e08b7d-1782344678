import { useState, useEffect } from "react";
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
import { caseService } from "@/services/caseService";
import { useToast } from "@/hooks/use-toast";

export default function AdminCases() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadCases();
  }, [statusFilter, searchQuery]);

  const loadCases = async () => {
    try {
      setLoading(true);
      const data = await caseService.getCaseReviews({
        status: statusFilter,
        search: searchQuery
      });
      setCases(data);
    } catch (error) {
      console.error("Error loading cases:", error);
      toast({
        title: "Error Loading Cases",
        description: "Could not load case data from database.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCases = cases;

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
                  placeholder="Search by name, email, or country..."
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
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading cases...
              </div>
            ) : (
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
                            {caseItem.id.slice(0, 8).toUpperCase()}
                          </span>
                          <Badge variant={
                            caseItem.status === "active" ? "default" :
                            caseItem.status === "pending" ? "secondary" : "outline"
                          }>
                            {caseItem.status.toUpperCase()}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg">{caseItem.full_name}</h3>
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
                        <div className="font-medium">{caseItem.scam_type}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Amount / Crypto</div>
                        <div className="font-medium">{caseItem.amount_lost}</div>
                        <div className="text-muted-foreground">{caseItem.cryptocurrency_used || "N/A"}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                      Submitted: {new Date(caseItem.created_at).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                ))}

                {filteredCases.length === 0 && !loading && (
                  <div className="text-center py-12 text-muted-foreground">
                    {searchQuery || statusFilter !== "all" 
                      ? "No cases found matching your search criteria."
                      : "No cases submitted yet. New case submissions will appear here automatically."}
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