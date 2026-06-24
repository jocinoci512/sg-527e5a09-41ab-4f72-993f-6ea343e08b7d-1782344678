import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Trash2, Calendar, Filter, Plus, TrendingUp, BarChart3, Bell } from "lucide-react";
import { format } from "date-fns";

export default function AdminReports() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [generating, setGenerating] = useState(false);

  // Mock data - will be replaced with Supabase queries
  const reports = [
    {
      id: 1,
      title: "Weekly Performance Report",
      period: "Jun 17 - Jun 23, 2026",
      generatedAt: "2026-06-23T23:59:00Z",
      fileSize: "2.4 MB",
      status: "completed",
    },
    {
      id: 2,
      title: "Weekly Performance Report",
      period: "Jun 10 - Jun 16, 2026",
      generatedAt: "2026-06-16T23:59:00Z",
      fileSize: "2.1 MB",
      status: "completed",
    },
    {
      id: 3,
      title: "Weekly Performance Report",
      period: "Jun 3 - Jun 9, 2026",
      generatedAt: "2026-06-09T23:59:00Z",
      fileSize: "1.9 MB",
      status: "completed",
    },
  ];

  const handleGenerateReport = async () => {
    setGenerating(true);
    // TODO: Implement PDF generation with jsPDF
    // TODO: Collect metrics from Supabase
    // TODO: Generate charts and KPIs
    setTimeout(() => {
      setGenerating(false);
      alert("Report generated successfully! (Supabase connection required for full functionality)");
    }, 2000);
  };

  const handleDownload = (reportId: number) => {
    // TODO: Fetch report from Supabase Storage and trigger download
    alert(`Downloading report ${reportId}... (Supabase connection required)`);
  };

  const handleDelete = (reportId: number) => {
    if (confirm("Are you sure you want to delete this report?")) {
      // TODO: Delete report from Supabase
      alert(`Report ${reportId} deleted (Supabase connection required)`);
    }
  };

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
            <Link href="/admin/reports" className="text-sm font-medium text-foreground hover:text-foreground transition-colors">
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

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">Performance Reports</h1>
          <p className="text-muted-foreground">
            Automated weekly reports and custom analytics
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                Since January 2026
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Generated in June
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12.5%</div>
              <p className="text-xs text-muted-foreground">
                Week-over-week cases
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Generate Custom Report */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Custom Report</CardTitle>
            <CardDescription>
              Create a performance report for a specific date range
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="dateFrom">From Date</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateTo">To Date</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger id="reportType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Metrics</SelectItem>
                    <SelectItem value="cases">Cases Only</SelectItem>
                    <SelectItem value="leads">Leads Only</SelectItem>
                    <SelectItem value="traffic">Traffic Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="opacity-0">Generate</Label>
                <Button
                  onClick={handleGenerateReport}
                  disabled={generating || !dateFrom || !dateTo}
                  className="w-full"
                >
                  {generating ? (
                    <>Generating...</>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports Archive */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Reports Archive</CardTitle>
                <CardDescription>
                  All generated performance reports
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Title</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Generated</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                      No reports generated yet. Click "Generate Report" to create your first report.
                    </TableCell>
                  </TableRow>
                ) : (
                  reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          {report.title}
                        </div>
                      </TableCell>
                      <TableCell>{report.period}</TableCell>
                      <TableCell>
                        {format(new Date(report.generatedAt), "MMM d, yyyy 'at' h:mm a")}
                      </TableCell>
                      <TableCell>{report.fileSize}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                          {report.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(report.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(report.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Automated Schedule Info */}
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Automated Report Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Weekly performance reports are automatically generated every Sunday at 11:59 PM and
              emailed to all administrators. The reports include comprehensive metrics, charts, and
              KPIs covering cases, leads, traffic, and business growth.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Next Scheduled:</span>{" "}
                <span className="font-medium">Sunday, Jun 29, 2026 at 11:59 PM</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div>
                <span className="text-muted-foreground">Status:</span>{" "}
                <span className="font-medium text-green-600 dark:text-green-400">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}