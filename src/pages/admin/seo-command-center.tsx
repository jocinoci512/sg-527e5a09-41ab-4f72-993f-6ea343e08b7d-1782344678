import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, TrendingUp, TrendingDown, Minus, Target, Users, Zap, Mail, Activity, Home, BarChart3, LineChart } from "lucide-react";
import { seoAnalyticsService } from "@/services/seoAnalyticsService";
import { useToast } from "@/hooks/use-toast";

export default function SEOCommandCenter() {
  const [rankings, setRankings] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [weeklyReports, setWeeklyReports] = useState<any[]>([]);
  const [activityLog, setActivityLog] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("intelligence");
  const { toast } = useToast();

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [rankingsData, recsData, reportsData, activityData] = await Promise.all([
        seoAnalyticsService.getKeywordRankings(),
        seoAnalyticsService.getRecommendations({ status: "pending" }),
        seoAnalyticsService.getWeeklyReports(5),
        seoAnalyticsService.getActivityLog(20)
      ]);
      setRankings(rankingsData);
      setRecommendations(recsData);
      setWeeklyReports(reportsData);
      setActivityLog(activityData);
    } catch (error) {
      console.error("Error loading SEO data:", error);
      toast({
        title: "Error Loading Data",
        description: "Could not load SEO Command Center data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateWeeklyReport = async () => {
    try {
      await seoAnalyticsService.generateWeeklyReport();
      toast({
        title: "Report Generated",
        description: "Weekly SEO report has been created successfully"
      });
      loadAllData();
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Generation Failed",
        description: "Could not generate weekly report",
        variant: "destructive"
      });
    }
  };

  const generateRecommendations = async () => {
    try {
      await seoAnalyticsService.generateRecommendations();
      toast({
        title: "Recommendations Generated",
        description: "SEO optimization recommendations have been created"
      });
      loadAllData();
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast({
        title: "Generation Failed",
        description: "Could not generate recommendations",
        variant: "destructive"
      });
    }
  };

  const getPositionChangeIcon = (change: number | null) => {
    if (!change || change === 0) return <Minus className="h-4 w-4 text-yellow-500" />;
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getPositionChangeColor = (change: number | null) => {
    if (!change || change === 0) return "text-yellow-600";
    if (change > 0) return "text-green-600";
    return "text-red-600";
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors: Record<string, string> = {
      easy: "bg-green-500",
      medium: "bg-yellow-500",
      hard: "bg-orange-500",
      very_competitive: "bg-red-500"
    };
    return (
      <Badge className={colors[difficulty]}>
        {difficulty.replace("_", " ").toUpperCase()}
      </Badge>
    );
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
            <Link href="/admin/cases" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Cases
            </Link>
            <Link href="/admin/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/admin/seo-content" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              SEO Content
            </Link>
            <Link href="/admin/seo-command-center" className="text-sm font-medium text-foreground hover:text-foreground transition-colors">
              SEO Command
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-heading flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              SEO Command Center
            </h1>
            <p className="text-muted-foreground mt-2">
              Enterprise SEO analytics, competitor tracking, and automation
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={generateRecommendations} variant="outline">
              <Zap className="mr-2 h-4 w-4" />
              Generate Recommendations
            </Button>
            <Button onClick={generateWeeklyReport}>
              <Mail className="mr-2 h-4 w-4" />
              Generate Weekly Report
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Keywords Tracked</CardDescription>
              <CardTitle className="text-3xl">{rankings.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {rankings.filter(r => r.ranking_position <= 10).length} in top 10
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Ranking Improvements</CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {rankings.filter(r => r.position_change && r.position_change > 0).length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Last 30 days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Recommendations</CardDescription>
              <CardTitle className="text-3xl">{recommendations.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {recommendations.filter(r => r.priority === "high").length} high priority
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Weekly Reports</CardDescription>
              <CardTitle className="text-3xl">{weeklyReports.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {weeklyReports.filter(r => r.email_sent).length} sent via email
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="intelligence">
              <Target className="mr-2 h-4 w-4" />
              Keyword Intelligence
            </TabsTrigger>
            <TabsTrigger value="competitors">
              <Users className="mr-2 h-4 w-4" />
              Competitor Analysis
            </TabsTrigger>
            <TabsTrigger value="recommendations">
              <Zap className="mr-2 h-4 w-4" />
              SEO Recommendations
            </TabsTrigger>
            <TabsTrigger value="reports">
              <LineChart className="mr-2 h-4 w-4" />
              Weekly Reports
            </TabsTrigger>
          </TabsList>

          {/* KEYWORD INTELLIGENCE TAB */}
          <TabsContent value="intelligence" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Keyword Intelligence Center</CardTitle>
                <CardDescription>
                  Track keyword rankings, difficulty, search volume, and opportunity scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-12 text-muted-foreground">Loading keyword data...</div>
                ) : rankings.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No keyword rankings yet. Rankings will appear here once tracked via SEO Content system.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {rankings.map((ranking) => (
                      <div key={ranking.id} className="p-4 border-2 rounded-lg hover:border-primary transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">
                                {ranking.keyword?.keyword || "Unknown Keyword"}
                              </h3>
                              {getDifficultyBadge(ranking.keyword_difficulty || "medium")}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground text-xs">Current Position</p>
                                <p className="font-bold text-2xl">{ranking.ranking_position || "—"}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">Position Change</p>
                                <div className="flex items-center gap-2">
                                  {getPositionChangeIcon(ranking.position_change)}
                                  <p className={`font-semibold ${getPositionChangeColor(ranking.position_change)}`}>
                                    {ranking.position_change > 0 ? `+${ranking.position_change}` : ranking.position_change || "—"}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">Search Volume</p>
                                <p className="font-semibold">{(ranking.search_volume || 0).toLocaleString()}/mo</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">Opportunity Score</p>
                                <p className="font-semibold">{ranking.seo_opportunity_score || 0}/100</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-3">
                              <div>
                                <p className="text-muted-foreground text-xs">Est. Organic Clicks</p>
                                <p className="font-semibold">{ranking.organic_clicks_estimate || 0}/mo</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">CTR</p>
                                <p className="font-semibold">{ranking.click_through_rate || 0}%</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">Ranking URL</p>
                                <p className="font-semibold text-primary truncate">
                                  {ranking.ranking_url || "Not ranking"}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">Last Updated</p>
                                <p className="font-semibold">
                                  {new Date(ranking.ranking_date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* COMPETITOR ANALYSIS TAB */}
          <TabsContent value="competitors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Competitor Ranking Analysis</CardTitle>
                <CardDescription>
                  Monitor top 10 competitors for each tracked keyword
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Competitor Tracking Coming Soon</p>
                  <p className="text-sm">
                    Connect Google Search Console or SEMrush API to enable real-time competitor analysis
                  </p>
                  <div className="mt-6 p-4 bg-muted rounded-lg text-left max-w-2xl mx-auto">
                    <p className="font-medium mb-2">Planned Features:</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Top 10 ranking competitors per keyword</li>
                      <li>• Domain authority estimates</li>
                      <li>• Traffic value projections</li>
                      <li>• Competitor content analysis</li>
                      <li>• Ranking gap identification</li>
                      <li>• Improvement opportunities</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO RECOMMENDATIONS TAB */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Optimization Recommendations</CardTitle>
                <CardDescription>
                  AI-driven content gap analysis and optimization suggestions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recommendations.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="mb-4">No active recommendations. Click "Generate Recommendations" to analyze your SEO data.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recommendations.map((rec) => (
                      <div key={rec.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold">{rec.title}</h3>
                              <Badge variant={rec.priority === "high" ? "default" : "outline"}>
                                {rec.priority} priority
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                            {rec.action_items && (
                              <div className="space-y-1">
                                <p className="text-xs font-medium">Action Items:</p>
                                {rec.action_items.map((item: string, idx: number) => (
                                  <p key={idx} className="text-xs text-muted-foreground pl-4">
                                    • {item}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-xs text-muted-foreground mb-1">Impact Score</p>
                            <p className="text-2xl font-bold text-green-600">{rec.impact_score}</p>
                            <p className="text-xs text-muted-foreground mt-2">Effort Score</p>
                            <p className="text-lg font-semibold">{rec.effort_score}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* WEEKLY REPORTS TAB */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly SEO Performance Reports</CardTitle>
                <CardDescription>
                  Automated Monday morning summaries with rankings, traffic, and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {weeklyReports.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="mb-4">No weekly reports yet. Click "Generate Weekly Report" to create one.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {weeklyReports.map((report) => (
                      <div key={report.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold">
                              Week of {new Date(report.week_start_date).toLocaleDateString()}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Report generated {new Date(report.report_date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={report.email_sent ? "default" : "outline"}>
                            {report.email_sent ? "Email Sent" : "Not Sent"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="text-muted-foreground text-xs mb-1">Keywords Gained</p>
                            <p className="text-2xl font-bold text-green-600">{report.keywords_gained}</p>
                          </div>
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="text-muted-foreground text-xs mb-1">Keywords Lost</p>
                            <p className="text-2xl font-bold text-red-600">{report.keywords_lost}</p>
                          </div>
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="text-muted-foreground text-xs mb-1">Weekly Growth</p>
                            <p className="text-2xl font-bold">{report.weekly_traffic_growth}%</p>
                          </div>
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="text-muted-foreground text-xs mb-1">Monthly Growth</p>
                            <p className="text-2xl font-bold">{report.monthly_traffic_growth}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Activity Log */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Admin Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activityLog.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No activity logged yet</p>
            ) : (
              <div className="space-y-2">
                {activityLog.slice(0, 10).map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                    <div>
                      <p className="font-medium">{log.action_description || log.action_type}</p>
                      <p className="text-xs text-muted-foreground">{log.admin_email}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(log.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}