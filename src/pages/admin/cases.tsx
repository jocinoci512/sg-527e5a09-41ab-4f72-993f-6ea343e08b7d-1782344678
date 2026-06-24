import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, FileText, Eye, Bell, Download, ExternalLink, Calendar, Home } from "lucide-react";
import { caseService } from "@/services/caseService";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AdminCases() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cases, setCases] = useState<any[]>([]);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [evidenceFiles, setEvidenceFiles] = useState<string[]>([]);
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

  const handleStatusUpdate = async (caseId: string, newStatus: string) => {
    try {
      await caseService.updateCaseStatus(caseId, newStatus);
      toast({
        title: "Status Updated",
        description: `Case status changed to ${newStatus}`,
      });
      loadCases();
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Update Failed",
        description: "Could not update case status",
        variant: "destructive"
      });
    }
  };

  const viewCaseDetails = async (caseItem: any) => {
    setSelectedCase(caseItem);
    
    // Load evidence files if they exist
    if (caseItem.file_attachments && Array.isArray(caseItem.file_attachments)) {
      const urls: string[] = [];
      for (const filePath of caseItem.file_attachments) {
        const { data } = supabase.storage
          .from('case-evidence')
          .getPublicUrl(filePath);
        if (data) urls.push(data.publicUrl);
      }
      setEvidenceFiles(urls);
    }
  };

  const exportCase = (caseItem: any) => {
    const csvContent = `Case Reference ID,${caseItem.case_reference_id}
Full Name,${caseItem.full_name}
Email,${caseItem.email}
Phone,${caseItem.phone}
Country,${caseItem.country}
Fraud Type,${caseItem.scam_type}
Incident Date,${caseItem.incident_date || 'N/A'}
Amount Lost,${caseItem.amount_lost}
Currency,${caseItem.currency || 'N/A'}
Platform,${caseItem.platform_involved || 'N/A'}
Wallet Address,${caseItem.wallet_address || 'N/A'}
Transaction Hash,${caseItem.transaction_hash || 'N/A'}
Status,${caseItem.status}
Submitted,${new Date(caseItem.created_at).toLocaleString()}`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `case-${caseItem.case_reference_id}.csv`;
    a.click();
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      'submitted': { variant: 'secondary', label: 'SUBMITTED' },
      'under_review': { variant: 'default', label: 'UNDER REVIEW' },
      'investigation_started': { variant: 'default', label: 'INVESTIGATION STARTED' },
      'awaiting_information': { variant: 'outline', label: 'AWAITING INFO' },
      'active': { variant: 'default', label: 'ACTIVE' },
      'consultation_scheduled': { variant: 'default', label: 'CONSULTATION SCHEDULED' },
      'pending': { variant: 'secondary', label: 'PENDING' },
      'closed': { variant: 'outline', label: 'CLOSED' }
    };
    const config = variants[status] || { variant: 'secondary', label: status.toUpperCase() };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Cipher Trace" width={40} height={40} />
            <span className="font-heading font-bold text-lg">Cipher Trace Admin</span>
          </Link>
          <nav className="flex items-center gap-6 ml-8">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home
            </Link>
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
            <Link href="/admin/homepage" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Homepage
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
                  placeholder="Search by name, email, reference ID..."
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
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="investigation_started">Investigation Started</SelectItem>
                  <SelectItem value="awaiting_information">Awaiting Information</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="consultation_scheduled">Consultation Scheduled</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
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
              <CardTitle>All Cases ({cases.length})</CardTitle>
              <Badge variant="outline">
                {cases.filter(c => c.status === 'submitted' || c.status === 'pending').length} Pending Review
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
                {cases.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    className="p-4 border-2 rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm text-primary font-bold">
                            {caseItem.case_reference_id || caseItem.id.slice(0, 8).toUpperCase()}
                          </span>
                          {getStatusBadge(caseItem.status)}
                          {caseItem.incident_date && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Incident: {new Date(caseItem.incident_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg">{caseItem.full_name}</h3>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => viewCaseDetails(caseItem)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-3">
                                Case Details
                                <span className="font-mono text-primary">
                                  {selectedCase?.case_reference_id || selectedCase?.id.slice(0, 8)}
                                </span>
                              </DialogTitle>
                              <DialogDescription>
                                Complete case information and evidence
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedCase && (
                              <Tabs defaultValue="details" className="mt-4">
                                <TabsList className="grid w-full grid-cols-3">
                                  <TabsTrigger value="details">Details</TabsTrigger>
                                  <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                                  <TabsTrigger value="evidence">Evidence</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="details" className="space-y-4 mt-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Full Name</p>
                                      <p className="font-medium">{selectedCase.full_name}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Email</p>
                                      <p className="font-medium">{selectedCase.email}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Phone</p>
                                      <p className="font-medium">{selectedCase.phone}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Country</p>
                                      <p className="font-medium">{selectedCase.country}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Preferred Contact</p>
                                      <p className="font-medium">{selectedCase.preferred_contact_method || 'Email'}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Status</p>
                                      <div className="mt-1">
                                        <Select 
                                          value={selectedCase.status}
                                          onValueChange={(value) => {
                                            handleStatusUpdate(selectedCase.id, value);
                                            setSelectedCase({...selectedCase, status: value});
                                          }}
                                        >
                                          <SelectTrigger className="w-full">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="submitted">Submitted</SelectItem>
                                            <SelectItem value="under_review">Under Review</SelectItem>
                                            <SelectItem value="investigation_started">Investigation Started</SelectItem>
                                            <SelectItem value="awaiting_information">Awaiting Information</SelectItem>
                                            <SelectItem value="active">Active Investigation</SelectItem>
                                            <SelectItem value="consultation_scheduled">Consultation Scheduled</SelectItem>
                                            <SelectItem value="closed">Closed</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="border-t pt-4">
                                    <h4 className="font-semibold mb-3">Fraud Details</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-sm text-muted-foreground">Fraud Type</p>
                                        <p className="font-medium">{selectedCase.scam_type}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">Incident Date</p>
                                        <p className="font-medium">
                                          {selectedCase.incident_date ? new Date(selectedCase.incident_date).toLocaleDateString() : 'N/A'}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">Amount Lost</p>
                                        <p className="font-medium text-destructive">
                                          {selectedCase.currency || 'USD'} {selectedCase.amount_lost?.toLocaleString()}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">Platform Involved</p>
                                        <p className="font-medium">{selectedCase.platform_involved || 'N/A'}</p>
                                      </div>
                                      {selectedCase.scammer_name && (
                                        <div>
                                          <p className="text-sm text-muted-foreground">Scammer Name</p>
                                          <p className="font-medium">{selectedCase.scammer_name}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="border-t pt-4">
                                    <h4 className="font-semibold mb-2">Incident Description</h4>
                                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                      {selectedCase.incident_description}
                                    </p>
                                  </div>

                                  {selectedCase.timeline_of_events && (
                                    <div className="border-t pt-4">
                                      <h4 className="font-semibold mb-2">Timeline of Events</h4>
                                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                        {selectedCase.timeline_of_events}
                                      </p>
                                    </div>
                                  )}

                                  {selectedCase.additional_notes && (
                                    <div className="border-t pt-4">
                                      <h4 className="font-semibold mb-2">Additional Notes</h4>
                                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                        {selectedCase.additional_notes}
                                      </p>
                                    </div>
                                  )}
                                </TabsContent>
                                
                                <TabsContent value="blockchain" className="space-y-4 mt-4">
                                  <div className="grid grid-cols-1 gap-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Wallet Address</p>
                                      <p className="font-mono text-sm break-all">
                                        {selectedCase.wallet_address || 'Not provided'}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Transaction Hash</p>
                                      <p className="font-mono text-sm break-all">
                                        {selectedCase.transaction_hash || 'Not provided'}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Exchange Used</p>
                                      <p className="font-medium">{selectedCase.exchange_used || 'Not provided'}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Cryptocurrency Type</p>
                                      <p className="font-medium">{selectedCase.cryptocurrency_used || 'Not provided'}</p>
                                    </div>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="evidence" className="space-y-4 mt-4">
                                  {evidenceFiles.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-4">
                                      {evidenceFiles.map((url, index) => (
                                        <Card key={index}>
                                          <CardContent className="pt-6">
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-3">
                                                <FileText className="h-8 w-8 text-primary" />
                                                <div>
                                                  <p className="font-medium text-sm">Evidence {index + 1}</p>
                                                  <p className="text-xs text-muted-foreground">Uploaded file</p>
                                                </div>
                                              </div>
                                              <Button asChild variant="outline" size="sm">
                                                <a href={url} target="_blank" rel="noopener noreferrer">
                                                  <ExternalLink className="h-4 w-4" />
                                                </a>
                                              </Button>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-center py-12 text-muted-foreground">
                                      No evidence files uploaded for this case
                                    </div>
                                  )}
                                </TabsContent>
                              </Tabs>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm" onClick={() => exportCase(caseItem)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
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
                        {caseItem.preferred_contact_method && (
                          <div className="text-xs text-muted-foreground">Via {caseItem.preferred_contact_method}</div>
                        )}
                      </div>
                      <div>
                        <div className="text-muted-foreground">Fraud Type</div>
                        <div className="font-medium">{caseItem.scam_type}</div>
                        {caseItem.platform_involved && (
                          <div className="text-xs text-muted-foreground">{caseItem.platform_involved}</div>
                        )}
                      </div>
                      <div>
                        <div className="text-muted-foreground">Amount / Currency</div>
                        <div className="font-medium text-destructive">
                          {caseItem.currency || 'USD'} {caseItem.amount_lost?.toLocaleString()}
                        </div>
                        {caseItem.cryptocurrency_used && (
                          <div className="text-xs text-muted-foreground">{caseItem.cryptocurrency_used}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t text-sm text-muted-foreground flex items-center justify-between">
                      <span>
                        Submitted: {new Date(caseItem.created_at).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      {caseItem.file_attachments && caseItem.file_attachments.length > 0 && (
                        <span className="flex items-center gap-1 text-primary">
                          <FileText className="h-3 w-3" />
                          {caseItem.file_attachments.length} files attached
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {cases.length === 0 && !loading && (
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