import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bell, Plus, Edit, Trash2, Sparkles, Network, FileText, TrendingUp, Eye, Target, Zap } from "lucide-react";
import { seoContentService } from "@/services/seoContentService";
import { useToast } from "@/hooks/use-toast";

export default function AdminSEOContent() {
  const [keywords, setKeywords] = useState<any[]>([]);
  const [clusters, setClusters] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("keywords");
  const [editingKeyword, setEditingKeyword] = useState<any>(null);
  const [editingCluster, setEditingCluster] = useState<any>(null);
  const [isKeywordDialogOpen, setIsKeywordDialogOpen] = useState(false);
  const [isClusterDialogOpen, setIsClusterDialogOpen] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [keywordsData, clustersData, templatesData] = await Promise.all([
        seoContentService.getKeywords(),
        seoContentService.getClusters(),
        seoContentService.getContentTemplates()
      ]);
      setKeywords(keywordsData);
      setClusters(clustersData);
      setTemplates(templatesData);
    } catch (error) {
      console.error("Error loading SEO content data:", error);
      toast({
        title: "Error Loading Data",
        description: "Could not load SEO content management data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateKeyword = () => {
    setEditingKeyword({
      keyword: "",
      keyword_type: "primary",
      search_volume: 0,
      competition_level: "medium",
      priority: 5,
      cluster_id: clusters[0]?.id || "",
      content_status: "pending"
    });
    setIsKeywordDialogOpen(true);
  };

  const handleSaveKeyword = async () => {
    try {
      if (editingKeyword.id) {
        await seoContentService.updateKeyword(editingKeyword.id, editingKeyword);
        toast({ title: "Keyword Updated", description: "Keyword has been updated successfully" });
      } else {
        await seoContentService.createKeyword(editingKeyword);
        toast({ title: "Keyword Created", description: "New keyword has been added to the system" });
      }
      setIsKeywordDialogOpen(false);
      setEditingKeyword(null);
      loadAllData();
    } catch (error) {
      console.error("Error saving keyword:", error);
      toast({
        title: "Save Failed",
        description: "Could not save keyword",
        variant: "destructive"
      });
    }
  };

  const handleDeleteKeyword = async (keywordId: string) => {
    if (!confirm("Are you sure you want to delete this keyword?")) return;
    try {
      await seoContentService.deleteKeyword(keywordId);
      toast({ title: "Keyword Deleted", description: "Keyword has been removed from the system" });
      loadAllData();
    } catch (error) {
      console.error("Error deleting keyword:", error);
      toast({
        title: "Delete Failed",
        description: "Could not delete keyword",
        variant: "destructive"
      });
    }
  };

  const handleCreateCluster = () => {
    setEditingCluster({
      cluster_name: "",
      pillar_keyword: "",
      description: "",
      content_type: "blog",
      priority: 5
    });
    setIsClusterDialogOpen(true);
  };

  const handleSaveCluster = async () => {
    try {
      if (editingCluster.id) {
        await seoContentService.updateCluster(editingCluster.id, editingCluster);
        toast({ title: "Cluster Updated", description: "Topic cluster has been updated" });
      } else {
        await seoContentService.createCluster(editingCluster);
        toast({ title: "Cluster Created", description: "New topic cluster has been created" });
      }
      setIsClusterDialogOpen(false);
      setEditingCluster(null);
      loadAllData();
    } catch (error) {
      console.error("Error saving cluster:", error);
      toast({
        title: "Save Failed",
        description: "Could not save topic cluster",
        variant: "destructive"
      });
    }
  };

  const handleBulkGenerate = async () => {
    if (selectedKeywords.length === 0) {
      toast({
        title: "No Keywords Selected",
        description: "Please select at least one keyword to generate content templates",
        variant: "destructive"
      });
      return;
    }

    try {
      setGenerating(true);
      toast({
        title: "Generating Content Templates",
        description: `Creating ${selectedKeywords.length} content templates with full SEO metadata...`
      });

      const results = await seoContentService.bulkGenerateTemplates(selectedKeywords);
      
      toast({
        title: "Content Generated Successfully",
        description: `${results.length} content templates created with SEO metadata, image prompts, FAQs, and CTAs`
      });

      setSelectedKeywords([]);
      loadAllData();
      setActiveTab("templates");
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Generation Failed",
        description: "Could not generate content templates",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  const toggleKeywordSelection = (keywordId: string) => {
    setSelectedKeywords(prev =>
      prev.includes(keywordId)
        ? prev.filter(id => id !== keywordId)
        : [...prev, keywordId]
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: { variant: "secondary", label: "PENDING" },
      drafted: { variant: "outline", label: "DRAFTED" },
      published: { variant: "default", label: "PUBLISHED" },
      optimized: { variant: "default", label: "OPTIMIZED" }
    };
    const config = variants[status] || { variant: "secondary", label: status.toUpperCase() };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      primary: "bg-blue-500",
      secondary: "bg-green-500",
      long_tail: "bg-purple-500",
      semantic: "bg-orange-500"
    };
    return (
      <Badge variant="outline" className={colors[type]}>
        {type.replace("_", " ").toUpperCase()}
      </Badge>
    );
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
            <Link href="/admin/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/admin/seo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              SEO
            </Link>
            <Link href="/admin/seo-content" className="text-sm font-medium text-foreground hover:text-foreground transition-colors">
              SEO Content
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
              <Sparkles className="h-8 w-8 text-primary" />
              SEO Content Generation System
            </h1>
            <p className="text-muted-foreground mt-2">
              Automated content strategy, keyword management, and template generation
            </p>
          </div>
          <div className="flex gap-2">
            {selectedKeywords.length > 0 && (
              <Button onClick={handleBulkGenerate} disabled={generating} size="lg">
                <Zap className="mr-2 h-5 w-5" />
                {generating ? "Generating..." : `Generate ${selectedKeywords.length} Templates`}
              </Button>
            )}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Keywords</CardDescription>
              <CardTitle className="text-3xl">{keywords.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {keywords.filter(k => k.keyword_type === "primary").length} primary keywords
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Topic Clusters</CardDescription>
              <CardTitle className="text-3xl">{clusters.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {clusters.filter(c => c.priority >= 8).length} high priority
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Content Templates</CardDescription>
              <CardTitle className="text-3xl">{templates.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {templates.filter(t => t.status === "published").length} published
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Ready to Publish</CardDescription>
              <CardTitle className="text-3xl">
                {templates.filter(t => t.status === "ready_for_review").length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Content awaiting review
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="keywords">
              <Target className="mr-2 h-4 w-4" />
              Keywords ({keywords.length})
            </TabsTrigger>
            <TabsTrigger value="clusters">
              <Network className="mr-2 h-4 w-4" />
              Topic Clusters ({clusters.length})
            </TabsTrigger>
            <TabsTrigger value="templates">
              <FileText className="mr-2 h-4 w-4" />
              Content Templates ({templates.length})
            </TabsTrigger>
            <TabsTrigger value="bulk">
              <Zap className="mr-2 h-4 w-4" />
              Bulk Generator
            </TabsTrigger>
          </TabsList>

          {/* KEYWORDS TAB */}
          <TabsContent value="keywords" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Keyword Management</CardTitle>
                    <CardDescription>Add and organize SEO keywords with clustering</CardDescription>
                  </div>
                  <Button onClick={handleCreateKeyword}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Keyword
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-12 text-muted-foreground">Loading keywords...</div>
                ) : keywords.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No keywords yet. Click "Add Keyword" to get started with your SEO content strategy.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {keywords.map((keyword) => (
                      <div
                        key={keyword.id}
                        className="flex items-center justify-between p-4 border-2 rounded-lg hover:border-primary transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <input
                            type="checkbox"
                            checked={selectedKeywords.includes(keyword.id)}
                            onChange={() => toggleKeywordSelection(keyword.id)}
                            className="h-4 w-4"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold text-lg">{keyword.keyword}</span>
                              {getTypeBadge(keyword.keyword_type)}
                              {getStatusBadge(keyword.content_status)}
                              <Badge variant="outline">Priority: {keyword.priority}/10</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Cluster: {keyword.cluster?.cluster_name || "Uncategorized"}</span>
                              <span>•</span>
                              <span>Search Volume: {keyword.search_volume?.toLocaleString() || 0}</span>
                              <span>•</span>
                              <span>Competition: {keyword.competition_level}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingKeyword(keyword);
                              setIsKeywordDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteKeyword(keyword.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* CLUSTERS TAB */}
          <TabsContent value="clusters" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Topic Clusters</CardTitle>
                    <CardDescription>Organize content into topical authority clusters</CardDescription>
                  </div>
                  <Button onClick={handleCreateCluster}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Cluster
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {clusters.map((cluster) => (
                    <Card key={cluster.id} className="border-2">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{cluster.cluster_name}</CardTitle>
                            <CardDescription className="mt-2">
                              Pillar: <span className="font-semibold">{cluster.pillar_keyword}</span>
                            </CardDescription>
                          </div>
                          <Badge variant="outline">Priority: {cluster.priority}/10</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{cluster.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex gap-4">
                            <span className="text-muted-foreground">
                              Keywords: <span className="font-semibold text-foreground">
                                {keywords.filter(k => k.cluster_id === cluster.id).length}
                              </span>
                            </span>
                            <span className="text-muted-foreground">
                              Articles: <span className="font-semibold text-foreground">
                                {cluster.published_articles_count || 0}
                              </span>
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingCluster(cluster);
                              setIsClusterDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TEMPLATES TAB */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generated Content Templates</CardTitle>
                <CardDescription>
                  Auto-generated templates with SEO metadata, image prompts, FAQs, and CTAs
                </CardDescription>
              </CardHeader>
              <CardContent>
                {templates.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No content templates yet. Go to the "Bulk Generator" tab to create templates from your keywords.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {templates.map((template) => (
                      <Card key={template.id} className="border-2">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-2">{template.headline}</CardTitle>
                              <CardDescription>{template.subheadline}</CardDescription>
                              <div className="flex items-center gap-3 mt-3">
                                {getStatusBadge(template.status)}
                                <Badge variant="outline">{template.template_type.replace("_", " ")}</Badge>
                                <span className="text-xs text-muted-foreground">
                                  {template.target_word_count} words • {template.estimated_reading_time} min read
                                </span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground mb-1">SEO Title</p>
                              <p className="font-medium">{template.seo_title}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">URL Slug</p>
                              <p className="font-mono text-xs">/blog/{template.url_slug}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-muted-foreground mb-1">Meta Description</p>
                              <p className="text-xs">{template.meta_description}</p>
                            </div>
                            {template.featured_image_prompt && (
                              <div className="col-span-2 p-3 bg-muted rounded-lg">
                                <p className="text-muted-foreground mb-1 text-xs">Featured Image Prompt</p>
                                <p className="text-xs">{template.featured_image_prompt}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* BULK GENERATOR TAB */}
          <TabsContent value="bulk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Bulk Content Template Generator
                </CardTitle>
                <CardDescription>
                  Select multiple keywords to automatically generate complete content templates with SEO metadata
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">What Gets Auto-Generated:</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>✓ SEO Title, Meta Title, Meta Description</li>
                      <li>✓ URL Slug and Canonical URLs</li>
                      <li>✓ Open Graph metadata for social sharing</li>
                      <li>✓ Professional featured image prompt (cybersecurity themed)</li>
                      <li>✓ Content structure with 5 main sections</li>
                      <li>✓ FAQ section with 5 relevant questions</li>
                      <li>✓ Call-to-action section with conversion buttons</li>
                      <li>✓ Internal linking suggestions</li>
                      <li>✓ Reading time calculation</li>
                    </ul>
                  </div>

                  {keywords.filter(k => k.content_status === "pending").length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      All keywords have content templates. Add more keywords to generate additional content.
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-medium">
                          Select keywords below ({selectedKeywords.length} selected)
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const pendingIds = keywords
                              .filter(k => k.content_status === "pending")
                              .map(k => k.id);
                            setSelectedKeywords(pendingIds);
                          }}
                        >
                          Select All Pending
                        </Button>
                      </div>

                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {keywords.filter(k => k.content_status === "pending").map((keyword) => (
                          <div
                            key={keyword.id}
                            onClick={() => toggleKeywordSelection(keyword.id)}
                            className="flex items-center gap-3 p-3 border-2 rounded-lg hover:border-primary transition-colors cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedKeywords.includes(keyword.id)}
                              onChange={() => toggleKeywordSelection(keyword.id)}
                              className="h-4 w-4"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{keyword.keyword}</span>
                                {getTypeBadge(keyword.keyword_type)}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Cluster: {keyword.cluster?.cluster_name || "Uncategorized"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {selectedKeywords.length > 0 && (
                        <Button
                          onClick={handleBulkGenerate}
                          disabled={generating}
                          size="lg"
                          className="w-full"
                        >
                          <Zap className="mr-2 h-5 w-5" />
                          {generating
                            ? "Generating Content Templates..."
                            : `Generate ${selectedKeywords.length} Content Template${selectedKeywords.length > 1 ? "s" : ""}`
                          }
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Keyword Dialog */}
        <Dialog open={isKeywordDialogOpen} onOpenChange={setIsKeywordDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingKeyword?.id ? "Edit Keyword" : "Add New Keyword"}</DialogTitle>
              <DialogDescription>
                Configure keyword details and clustering
              </DialogDescription>
            </DialogHeader>
            {editingKeyword && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="keyword">Keyword *</Label>
                  <Input
                    id="keyword"
                    value={editingKeyword.keyword}
                    onChange={(e) => setEditingKeyword({ ...editingKeyword, keyword: e.target.value })}
                    placeholder="e.g., crypto scam recovery"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Keyword Type</Label>
                    <Select
                      value={editingKeyword.keyword_type}
                      onValueChange={(value) => setEditingKeyword({ ...editingKeyword, keyword_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Primary</SelectItem>
                        <SelectItem value="secondary">Secondary</SelectItem>
                        <SelectItem value="long_tail">Long Tail</SelectItem>
                        <SelectItem value="semantic">Semantic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cluster">Topic Cluster</Label>
                    <Select
                      value={editingKeyword.cluster_id}
                      onValueChange={(value) => setEditingKeyword({ ...editingKeyword, cluster_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {clusters.map((cluster) => (
                          <SelectItem key={cluster.id} value={cluster.id}>
                            {cluster.cluster_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority (1-10)</Label>
                    <Input
                      id="priority"
                      type="number"
                      min="1"
                      max="10"
                      value={editingKeyword.priority}
                      onChange={(e) => setEditingKeyword({ ...editingKeyword, priority: parseInt(e.target.value) })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="competition">Competition Level</Label>
                    <Select
                      value={editingKeyword.competition_level}
                      onValueChange={(value) => setEditingKeyword({ ...editingKeyword, competition_level: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="search_volume">Monthly Search Volume</Label>
                    <Input
                      id="search_volume"
                      type="number"
                      value={editingKeyword.search_volume}
                      onChange={(e) => setEditingKeyword({ ...editingKeyword, search_volume: parseInt(e.target.value) || 0 })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Content Status</Label>
                    <Select
                      value={editingKeyword.content_status}
                      onValueChange={(value) => setEditingKeyword({ ...editingKeyword, content_status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="drafted">Drafted</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="optimized">Optimized</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={editingKeyword.notes || ""}
                    onChange={(e) => setEditingKeyword({ ...editingKeyword, notes: e.target.value })}
                    placeholder="Additional notes or strategy details"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsKeywordDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveKeyword}>
                    {editingKeyword.id ? "Update Keyword" : "Create Keyword"}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Cluster Dialog */}
        <Dialog open={isClusterDialogOpen} onOpenChange={setIsClusterDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCluster?.id ? "Edit Cluster" : "Create New Topic Cluster"}</DialogTitle>
              <DialogDescription>
                Organize content into topical authority clusters
              </DialogDescription>
            </DialogHeader>
            {editingCluster && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cluster_name">Cluster Name *</Label>
                  <Input
                    id="cluster_name"
                    value={editingCluster.cluster_name}
                    onChange={(e) => setEditingCluster({ ...editingCluster, cluster_name: e.target.value })}
                    placeholder="e.g., Cryptocurrency Recovery"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pillar_keyword">Pillar Keyword *</Label>
                  <Input
                    id="pillar_keyword"
                    value={editingCluster.pillar_keyword}
                    onChange={(e) => setEditingCluster({ ...editingCluster, pillar_keyword: e.target.value })}
                    placeholder="e.g., crypto recovery"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editingCluster.description}
                    onChange={(e) => setEditingCluster({ ...editingCluster, description: e.target.value })}
                    placeholder="Describe the topic cluster and its purpose"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="content_type">Content Type</Label>
                    <Select
                      value={editingCluster.content_type}
                      onValueChange={(value) => setEditingCluster({ ...editingCluster, content_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blog">Blog</SelectItem>
                        <SelectItem value="resource">Resource</SelectItem>
                        <SelectItem value="service_page">Service Page</SelectItem>
                        <SelectItem value="homepage_block">Homepage Block</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cluster_priority">Priority (1-10)</Label>
                    <Input
                      id="cluster_priority"
                      type="number"
                      min="1"
                      max="10"
                      value={editingCluster.priority}
                      onChange={(e) => setEditingCluster({ ...editingCluster, priority: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsClusterDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveCluster}>
                    {editingCluster.id ? "Update Cluster" : "Create Cluster"}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}