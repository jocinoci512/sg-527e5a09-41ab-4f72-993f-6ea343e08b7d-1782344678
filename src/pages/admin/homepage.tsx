import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Bell, Save, Plus, Trash2, Home, BarChart3, Globe, Trophy, Star, MessageSquare } from "lucide-react";
import { homepageService } from "@/services/homepageService";
import { useToast } from "@/hooks/use-toast";

export default function AdminHomepage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // State for all content types
  const [statistics, setStatistics] = useState<any[]>([]);
  const [liveUpdates, setLiveUpdates] = useState<any[]>([]);
  const [globalRegions, setGlobalRegions] = useState<any[]>([]);
  const [fraudCategories, setFraudCategories] = useState<any[]>([]);
  const [dashboardMetrics, setDashboardMetrics] = useState<any[]>([]);
  const [successStories, setSuccessStories] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    loadAllContent();
  }, []);

  const loadAllContent = async () => {
    try {
      setLoading(true);
      const [stats, updates, regions, categories, metrics, stories, testimonials] = await Promise.all([
        homepageService.getStatistics(),
        homepageService.getLiveUpdates(),
        homepageService.getGlobalRegions(),
        homepageService.getFraudCategories(),
        homepageService.getDashboardMetrics(),
        homepageService.getSuccessStories(),
        homepageService.getTestimonials()
      ]);

      setStatistics(stats);
      setLiveUpdates(updates);
      setGlobalRegions(regions);
      setFraudCategories(categories);
      setDashboardMetrics(metrics);
      setSuccessStories(stories);
      setTestimonials(testimonials);
    } catch (error) {
      console.error("Error loading homepage content:", error);
      toast({
        title: "Error Loading Content",
        description: "Could not load homepage data from database.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatistic = async (id: string, updates: any) => {
    try {
      setSaving(true);
      await homepageService.updateStatistic(id, updates);
      await loadAllContent();
      toast({
        title: "Statistic Updated",
        description: "Homepage statistic has been updated successfully."
      });
    } catch (error) {
      console.error("Error updating statistic:", error);
      toast({
        title: "Update Failed",
        description: "Could not update statistic.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateRegion = async (id: string, updates: any) => {
    try {
      setSaving(true);
      await homepageService.updateGlobalRegion(id, updates);
      await loadAllContent();
      toast({
        title: "Region Updated",
        description: "Global region has been updated successfully."
      });
    } catch (error) {
      console.error("Error updating region:", error);
      toast({
        title: "Update Failed",
        description: "Could not update region.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateFraudCategory = async (id: string, updates: any) => {
    try {
      setSaving(true);
      await homepageService.updateFraudCategory(id, updates);
      await loadAllContent();
      toast({
        title: "Category Updated",
        description: "Fraud category has been updated successfully."
      });
    } catch (error) {
      console.error("Error updating category:", error);
      toast({
        title: "Update Failed",
        description: "Could not update category.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateDashboardMetric = async (id: string, updates: any) => {
    try {
      setSaving(true);
      await homepageService.updateDashboardMetric(id, updates);
      await loadAllContent();
      toast({
        title: "Metric Updated",
        description: "Dashboard metric has been updated successfully."
      });
    } catch (error) {
      console.error("Error updating metric:", error);
      toast({
        title: "Update Failed",
        description: "Could not update metric.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

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
            <Link href="/admin/homepage" className="text-sm font-medium text-foreground hover:text-foreground transition-colors">
              Homepage
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
          <h1 className="text-3xl font-bold text-foreground font-heading flex items-center gap-2">
            <Home className="h-8 w-8 text-primary" />
            Homepage Content Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage all homepage statistics, sections, and content
          </p>
        </div>

        {loading ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12 text-muted-foreground">
                Loading homepage content...
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="statistics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="statistics">
                <BarChart3 className="h-4 w-4 mr-2" />
                Statistics
              </TabsTrigger>
              <TabsTrigger value="regions">
                <Globe className="h-4 w-4 mr-2" />
                Regions
              </TabsTrigger>
              <TabsTrigger value="categories">
                <Trophy className="h-4 w-4 mr-2" />
                Categories
              </TabsTrigger>
              <TabsTrigger value="metrics">
                <BarChart3 className="h-4 w-4 mr-2" />
                Metrics
              </TabsTrigger>
            </TabsList>

            {/* Statistics Tab */}
            <TabsContent value="statistics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Global Trust Statistics</CardTitle>
                  <CardDescription>
                    Manage the 8 animated counter statistics displayed on the homepage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {statistics.map((stat) => (
                      <div key={stat.id} className="p-4 border rounded-lg space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor={`stat-label-${stat.id}`}>Label</Label>
                            <Input
                              id={`stat-label-${stat.id}`}
                              value={stat.label}
                              onChange={(e) => {
                                const updated = statistics.map(s =>
                                  s.id === stat.id ? { ...s, label: e.target.value } : s
                                );
                                setStatistics(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`stat-value-${stat.id}`}>Value</Label>
                            <Input
                              id={`stat-value-${stat.id}`}
                              type="number"
                              value={stat.value}
                              onChange={(e) => {
                                const updated = statistics.map(s =>
                                  s.id === stat.id ? { ...s, value: parseInt(e.target.value) || 0 } : s
                                );
                                setStatistics(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`stat-suffix-${stat.id}`}>Suffix</Label>
                            <Input
                              id={`stat-suffix-${stat.id}`}
                              value={stat.suffix}
                              placeholder="e.g., +, %, M+"
                              onChange={(e) => {
                                const updated = statistics.map(s =>
                                  s.id === stat.id ? { ...s, suffix: e.target.value } : s
                                );
                                setStatistics(updated);
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={stat.is_enabled}
                              onCheckedChange={(checked) => {
                                handleUpdateStatistic(stat.id, { is_enabled: checked });
                              }}
                            />
                            <Label>Enabled</Label>
                          </div>
                          <Button
                            onClick={() => handleUpdateStatistic(stat.id, {
                              label: stat.label,
                              value: stat.value,
                              suffix: stat.suffix
                            })}
                            size="sm"
                            disabled={saving}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Global Regions Tab */}
            <TabsContent value="regions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Global Operations Network</CardTitle>
                  <CardDescription>
                    Manage the 6 regional coverage cards displayed on the homepage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {globalRegions.map((region) => (
                      <div key={region.id} className="p-4 border rounded-lg space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`region-name-${region.id}`}>Region Name</Label>
                            <Input
                              id={`region-name-${region.id}`}
                              value={region.region}
                              onChange={(e) => {
                                const updated = globalRegions.map(r =>
                                  r.id === region.id ? { ...r, region: e.target.value } : r
                                );
                                setGlobalRegions(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`region-countries-${region.id}`}>Countries</Label>
                            <Input
                              id={`region-countries-${region.id}`}
                              value={region.countries}
                              onChange={(e) => {
                                const updated = globalRegions.map(r =>
                                  r.id === region.id ? { ...r, countries: e.target.value } : r
                                );
                                setGlobalRegions(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`region-investigations-${region.id}`}>Investigations</Label>
                            <Input
                              id={`region-investigations-${region.id}`}
                              value={region.investigations}
                              onChange={(e) => {
                                const updated = globalRegions.map(r =>
                                  r.id === region.id ? { ...r, investigations: e.target.value } : r
                                );
                                setGlobalRegions(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`region-support-${region.id}`}>Support</Label>
                            <Input
                              id={`region-support-${region.id}`}
                              value={region.support}
                              onChange={(e) => {
                                const updated = globalRegions.map(r =>
                                  r.id === region.id ? { ...r, support: e.target.value } : r
                                );
                                setGlobalRegions(updated);
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={region.is_enabled}
                              onCheckedChange={(checked) => {
                                handleUpdateRegion(region.id, { is_enabled: checked });
                              }}
                            />
                            <Label>Enabled</Label>
                          </div>
                          <Button
                            onClick={() => handleUpdateRegion(region.id, {
                              region: region.region,
                              countries: region.countries,
                              investigations: region.investigations,
                              support: region.support
                            })}
                            size="sm"
                            disabled={saving}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Fraud Categories Tab */}
            <TabsContent value="categories" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Fraud Categories Performance</CardTitle>
                  <CardDescription>
                    Manage investigation performance metrics by fraud category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {fraudCategories.map((category) => (
                      <div key={category.id} className="p-4 border rounded-lg space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <Label htmlFor={`cat-name-${category.id}`}>Category</Label>
                            <Input
                              id={`cat-name-${category.id}`}
                              value={category.category}
                              onChange={(e) => {
                                const updated = fraudCategories.map(c =>
                                  c.id === category.id ? { ...c, category: e.target.value } : c
                                );
                                setFraudCategories(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`cat-cases-${category.id}`}>Cases</Label>
                            <Input
                              id={`cat-cases-${category.id}`}
                              type="number"
                              value={category.cases}
                              onChange={(e) => {
                                const updated = fraudCategories.map(c =>
                                  c.id === category.id ? { ...c, cases: parseInt(e.target.value) || 0 } : c
                                );
                                setFraudCategories(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`cat-success-${category.id}`}>Success Rate %</Label>
                            <Input
                              id={`cat-success-${category.id}`}
                              type="number"
                              value={category.success_rate}
                              onChange={(e) => {
                                const updated = fraudCategories.map(c =>
                                  c.id === category.id ? { ...c, success_rate: parseInt(e.target.value) || 0 } : c
                                );
                                setFraudCategories(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`cat-trend-${category.id}`}>Trend</Label>
                            <Input
                              id={`cat-trend-${category.id}`}
                              value={category.trend}
                              placeholder="e.g., +15%"
                              onChange={(e) => {
                                const updated = fraudCategories.map(c =>
                                  c.id === category.id ? { ...c, trend: e.target.value } : c
                                );
                                setFraudCategories(updated);
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={category.is_enabled}
                              onCheckedChange={(checked) => {
                                handleUpdateFraudCategory(category.id, { is_enabled: checked });
                              }}
                            />
                            <Label>Enabled</Label>
                          </div>
                          <Button
                            onClick={() => handleUpdateFraudCategory(category.id, {
                              category: category.category,
                              cases: category.cases,
                              success_rate: category.success_rate,
                              trend: category.trend
                            })}
                            size="sm"
                            disabled={saving}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Dashboard Metrics Tab */}
            <TabsContent value="metrics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recovery Dashboard Metrics</CardTitle>
                  <CardDescription>
                    Manage the real-time recovery metrics displayed on the homepage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {dashboardMetrics.map((metric) => (
                      <div key={metric.id} className="p-4 border rounded-lg space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor={`metric-label-${metric.id}`}>Label</Label>
                            <Input
                              id={`metric-label-${metric.id}`}
                              value={metric.label}
                              onChange={(e) => {
                                const updated = dashboardMetrics.map(m =>
                                  m.id === metric.id ? { ...m, label: e.target.value } : m
                                );
                                setDashboardMetrics(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`metric-value-${metric.id}`}>Value</Label>
                            <Input
                              id={`metric-value-${metric.id}`}
                              type="number"
                              value={metric.value}
                              onChange={(e) => {
                                const updated = dashboardMetrics.map(m =>
                                  m.id === metric.id ? { ...m, value: parseInt(e.target.value) || 0 } : m
                                );
                                setDashboardMetrics(updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`metric-change-${metric.id}`}>Change</Label>
                            <Input
                              id={`metric-change-${metric.id}`}
                              value={metric.change}
                              placeholder="e.g., +12%"
                              onChange={(e) => {
                                const updated = dashboardMetrics.map(m =>
                                  m.id === metric.id ? { ...m, change: e.target.value } : m
                                );
                                setDashboardMetrics(updated);
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={metric.is_enabled}
                              onCheckedChange={(checked) => {
                                handleUpdateDashboardMetric(metric.id, { is_enabled: checked });
                              }}
                            />
                            <Label>Enabled</Label>
                          </div>
                          <Button
                            onClick={() => handleUpdateDashboardMetric(metric.id, {
                              label: metric.label,
                              value: metric.value,
                              change: metric.change
                            })}
                            size="sm"
                            disabled={saving}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}