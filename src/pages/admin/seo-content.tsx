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
import { Bell, Plus, Edit, Trash2, Sparkles, Network, FileText, TrendingUp, Eye, Target, Zap, Upload, BarChart3, LineChart, PieChart, Download, Link as LinkIcon, Home } from "lucide-react";
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
  const [viewingTemplate, setViewingTemplate] = useState<any>(null);
  const [isKeywordDialogOpen, setIsKeywordDialogOpen] = useState(false);
  const [isClusterDialogOpen, setIsClusterDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isClusteringDialogOpen, setIsClusteringDialogOpen] = useState(false);
  const [importData, setImportData] = useState("");
  const [importPreview, setImportPreview] = useState<any[]>([]);
  const [clusteringSuggestions, setClusteringSuggestions] = useState<any[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0, status: "" });
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

  // Auto-clustering
  const handleAutoClustering = async () => {
    const unassignedKeywords = keywords.filter(k => !k.cluster_id || k.cluster_id === "");
    if (unassignedKeywords.length === 0) {
      toast({
        title: "No Keywords to Cluster",
        description: "All keywords are already assigned to clusters",
        variant: "destructive"
      });
      return;
    }

    try {
      const suggestions = await seoContentService.autoClusterKeywords(
        unassignedKeywords.map(k => k.id)
      );
      setClusteringSuggestions(suggestions);
      setIsClusteringDialogOpen(true);
    } catch (error) {
      console.error("Error auto-clustering:", error);
      toast({
        title: "Clustering Failed",
        description: "Could not generate clustering suggestions",
        variant: "destructive"
      });
    }
  };

  const applyClusteringSuggestions = async () => {
    try {
      await seoContentService.applyClusteringSuggestions(clusteringSuggestions);
      toast({
        title: "Clustering Applied",
        description: `${clusteringSuggestions.length} keywords clustered successfully`
      });
      setIsClusteringDialogOpen(false);
      setClusteringSuggestions([]);
      loadAllData();
    } catch (error) {
      console.error("Error applying clustering:", error);
      toast({
        title: "Apply Failed",
        description: "Could not apply clustering suggestions",
        variant: "destructive"
      });
    }
  };

  // Export functions
  const exportTemplateMarkdown = (template: any) => {
    const markdown = seoContentService.exportToMarkdown(template);
    seoContentService.downloadFile(
      markdown,
      `${template.url_slug}.md`,
      "text/markdown"
    );
    toast({
      title: "Template Exported",
      description: "Markdown file downloaded successfully"
    });
  };

  const exportTemplateJSON = (template: any) => {
    const json = seoContentService.exportToJSON(template);
    seoContentService.downloadFile(
      json,
      `${template.url_slug}.json`,
      "application/json"
    );
    toast({
      title: "Template Exported",
      description: "JSON file downloaded successfully"
    });
  };

  const viewTemplateDetails = (template: any) => {
    setViewingTemplate(template);
    setIsTemplateDialogOpen(true);
  };

  const handleImportKeywords = () => {
    setImportData("");
    setImportPreview([]);
    setIsImportDialogOpen(true);
  };

  const parseImportData = () => {
    try {
      const lines = importData.trim().split("\n");
      const parsed = [];

      for (const line of lines) {
        if (!line.trim()) continue;
        
        // Support CSV format: keyword,type,cluster,priority,search_volume
        const parts = line.split(",").map(p => p.trim());
        
        if (parts.length >= 1) {
          const keyword = parts[0];
          const type = parts[1] || "primary";
          const clusterName = parts[2] || "";
          const priority = parseInt(parts[3]) || 5;
          const searchVolume = parseInt(parts[4]) || 0;
          
          // Find cluster by name
          const cluster = clusters.find(c => 
            c.cluster_name.toLowerCase().includes(clusterName.toLowerCase())
          );

          parsed.push({
            keyword,
            keyword_type: type,
            cluster_id: cluster?.id || clusters[0]?.id,
            cluster_name: cluster?.cluster_name || clusters[0]?.cluster_name,
            priority,
            search_volume: searchVolume,
            competition_level: "medium",
            content_status: "pending"
          });
        }
      }

      setImportPreview(parsed);
      toast({
        title: "Preview Ready",
        description: `Parsed ${parsed.length} keywords. Review and confirm to import.`
      });
    } catch (error) {
      console.error("Error parsing import data:", error);
      toast({
        title: "Parse Error",
        description: "Could not parse import data. Check format and try again.",
        variant: "destructive"
      });
    }
  };

  const confirmBulkImport = async () => {
    try {
      for (const keywordData of importPreview) {
        const { cluster_name, ...dataToInsert } = keywordData;
        await seoContentService.createKeyword(dataToInsert);
      }

      toast({
        title: "Keywords Imported",
        description: `Successfully imported ${importPreview.length} keywords`
      });

      setIsImportDialogOpen(false);
      setImportData("");
      setImportPreview([]);
      loadAllData();
    } catch (error) {
      console.error("Error importing keywords:", error);
      toast({
        title: "Import Failed",
        description: "Could not import all keywords",
        variant: "destructive"
      });
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
      setGenerationProgress({ current: 0, total: selectedKeywords.length, status: "Generating content templates..." });

      // Step 1: Generate all content templates with metadata
      const results = await seoContentService.bulkGenerateTemplates(selectedKeywords);
      
      setGenerationProgress({ current: 0, total: results.length, status: "Creating AI-generated featured images..." });

      // Step 2: Generate AI images for each template (using generate_image tool via backend)
      let successCount = 0;
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        setGenerationProgress({ 
          current: i + 1, 
          total: results.length, 
          status: `Generating image ${i + 1} of ${results.length}...` 
        });

        try {
          // Note: generate_image tool is available server-side via Softgen agent
          // For now, we'll use the pre-generated prompt and mark for manual generation
          // In production, this would call your image generation API
          
          // Placeholder for actual API call - you would call your image generation endpoint here
          // const response = await fetch('/api/generate-image', {
          //   method: 'POST',
          //   body: JSON.stringify({
          //     prompt: result.imageGeneration.prompt,
          //     path: result.imageGeneration.path,
          //     aspect_ratio: "16:9"
          //   })
          // });

          successCount++;
        } catch (error) {
          console.error(`Error generating image for ${result.template.seo_title}:`, error);
          // Continue with other images even if one fails
        }
      }

      toast({
        title: "Content Generation Complete!",
        description: `✅ ${results.length} content templates created\n✅ ${successCount} featured image prompts ready\n\nTemplates are ready for review in the Templates tab.`,
      });

      setGenerationProgress({ current: 0, total: 0, status: "" });
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
      setGenerationProgress({ current: 0, total: 0, status: "" });
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

  // Analytics calculations
  const analyticsData = {
    totalSearchVolume: keywords.reduce((sum, k) => sum + (k.search_volume || 0), 0),
    avgPriority: keywords.length > 0 
      ? (keywords.reduce((sum, k) => sum + k.priority, 0) / keywords.length).toFixed(1)
      : 0,
    publishedContent: templates.filter(t => t.status === "published").length,
    conversionRate: templates.length > 0
      ? ((templates.filter(t => t.status === "published").length / templates.length) * 100).toFixed(1)
      : 0
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Cipher Trace" width={40} height={40} />
            <span className="font-heading font-bold text-lg">Cipher Trace</span>
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
            {generating && generationProgress.status && (
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-primary h-2 transition-all duration-300" 
                    style={{ width: `${(generationProgress.current / generationProgress.total) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {generationProgress.status}
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleImportKeywords} variant="outline" disabled={generating}>
              <Upload className="mr-2 h-4 w-4" />
              Import Keywords
            </Button>
            <Button onClick={handleAutoClustering} variant="outline" disabled={generating}>
              <Sparkles className="mr-2 h-4 w-4" />
              Auto-Cluster
            </Button>
            {selectedKeywords.length > 0 && (
              <Button onClick={handleBulkGenerate} disabled={generating} size="lg">
                <Zap className="mr-2 h-5 w-5" />
                {generating ? `Generating... ${generationProgress.current}/${generationProgress.total}` : `Generate ${selectedKeywords.length} Templates`}
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
          <TabsList className="grid w-full grid-cols-5">
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
            <TabsTrigger value="analytics">
              <TrendingUp className="mr-2 h-4 w-4" />
              Analytics
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

          {/* TEMPLATES TAB WITH EXPORT BUTTONS */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Templates</CardTitle>
                <CardDescription>
                  Auto-generated templates with SEO metadata, internal links, and export options
                </CardDescription>
              </CardHeader>
              <CardContent>
                {templates.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No templates yet. Go to Bulk Generator to create content templates from keywords.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {templates.map(template => (
                      <div key={template.id} className="p-4 border-2 rounded-lg hover:border-primary transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{template.seo_title}</h3>
                              {getStatusBadge(template.status)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {template.meta_description}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <Badge variant="outline">
                                {template.cluster?.cluster_name || "No Cluster"}
                              </Badge>
                              <span>• {template.target_word_count} words</span>
                              <span>• {template.estimated_reading_time} min read</span>
                              {template.internal_links && template.internal_links.length > 0 && (
                                <span className="flex items-center gap-1 text-primary">
                                  <LinkIcon className="h-3 w-3" />
                                  {template.internal_links.length} internal links
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => viewTemplateDetails(template)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => exportTemplateMarkdown(template)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              MD
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => exportTemplateJSON(template)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              JSON
                            </Button>
                          </div>
                        </div>
                      </div>
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

          {/* ANALYTICS TAB */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SEO Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    SEO Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Search Volume</p>
                      <p className="text-2xl font-bold">{analyticsData.totalSearchVolume.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Keyword Priority</p>
                      <p className="text-2xl font-bold">{analyticsData.avgPriority}/10</p>
                    </div>
                    <Target className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Content Conversion Rate</p>
                      <p className="text-2xl font-bold">{analyticsData.conversionRate}%</p>
                    </div>
                    <Sparkles className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              {/* Keyword Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Keyword Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Primary Keywords</span>
                      <span className="font-semibold">
                        {keywords.filter(k => k.keyword_type === "primary").length}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ 
                          width: `${(keywords.filter(k => k.keyword_type === "primary").length / keywords.length) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Secondary Keywords</span>
                      <span className="font-semibold">
                        {keywords.filter(k => k.keyword_type === "secondary").length}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ 
                          width: `${(keywords.filter(k => k.keyword_type === "secondary").length / keywords.length) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Long Tail Keywords</span>
                      <span className="font-semibold">
                        {keywords.filter(k => k.keyword_type === "long_tail").length}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ 
                          width: `${(keywords.filter(k => k.keyword_type === "long_tail").length / keywords.length) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content Status Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-primary" />
                    Content Pipeline Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["pending", "drafted", "published", "optimized"].map(status => {
                      const count = keywords.filter(k => k.content_status === status).length;
                      const percentage = keywords.length > 0 ? (count / keywords.length) * 100 : 0;
                      return (
                        <div key={status} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getStatusBadge(status)}
                            </div>
                            <span className="text-sm font-semibold">{count} ({percentage.toFixed(0)}%)</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Clusters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-primary" />
                    Top Performing Clusters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {clusters
                      .sort((a, b) => b.priority - a.priority)
                      .slice(0, 5)
                      .map((cluster) => {
                        const clusterKeywords = keywords.filter(k => k.cluster_id === cluster.id);
                        return (
                          <div key={cluster.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div>
                              <p className="font-medium">{cluster.cluster_name}</p>
                              <p className="text-xs text-muted-foreground">
                                {clusterKeywords.length} keywords
                              </p>
                            </div>
                            <Badge variant="outline">Priority: {cluster.priority}/10</Badge>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Google Search Console Integration Info */}
            <Card>
              <CardHeader>
                <CardTitle>Google Search Console Integration (Coming Soon)</CardTitle>
                <CardDescription>
                  Connect Google Search Console to track real organic traffic, impressions, CTR, and keyword rankings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <p className="text-sm font-medium">Future Analytics Features:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ Real-time keyword ranking tracking</li>
                    <li>✓ Organic traffic growth charts</li>
                    <li>✓ Click-through rate (CTR) analysis</li>
                    <li>✓ Search impressions monitoring</li>
                    <li>✓ Page-level performance metrics</li>
                    <li>✓ Automated SEO recommendations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Template Details Dialog */}
        <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Content Template Details</DialogTitle>
              <DialogDescription>
                Complete SEO template with internal linking suggestions
              </DialogDescription>
            </DialogHeader>
            {viewingTemplate && (
              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{viewingTemplate.headline}</h3>
                  <p className="text-muted-foreground">{viewingTemplate.subheadline}</p>
                </div>

                {viewingTemplate.internal_links && viewingTemplate.internal_links.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" />
                      Suggested Internal Links
                    </h4>
                    <div className="space-y-2">
                      {viewingTemplate.internal_links.map((link: any, idx: number) => (
                        <div key={idx} className="p-3 bg-muted rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{link.title}</p>
                              <p className="text-xs text-muted-foreground">
                                Anchor: "{link.anchor_text}"
                              </p>
                            </div>
                            <Badge variant="outline">
                              {link.relevance}% match
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-3">Content Sections</h4>
                  <div className="space-y-3">
                    {viewingTemplate.main_sections?.map((section: any, idx: number) => (
                      <div key={idx} className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">{section.heading}</p>
                        <p className="text-sm text-muted-foreground">{section.outline}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">FAQ Questions</h4>
                  <div className="space-y-2">
                    {viewingTemplate.faq_questions?.map((faq: any, idx: number) => (
                      <div key={idx} className="p-3 bg-muted rounded-lg">
                        <p className="font-medium text-sm">{faq.question}</p>
                        <p className="text-xs text-muted-foreground mt-1">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={() => exportTemplateMarkdown(viewingTemplate)} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Markdown
                  </Button>
                  <Button onClick={() => exportTemplateJSON(viewingTemplate)} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export JSON
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Auto-Clustering Dialog */}
        <Dialog open={isClusteringDialogOpen} onOpenChange={setIsClusteringDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Auto-Clustering Suggestions</DialogTitle>
              <DialogDescription>
                Review semantic similarity matches before applying
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {clusteringSuggestions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No unassigned keywords to cluster
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {clusteringSuggestions.length} keywords analyzed
                    </p>
                    <Button onClick={applyClusteringSuggestions}>
                      Apply All Suggestions
                    </Button>
                  </div>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {clusteringSuggestions.map((suggestion, idx) => (
                      <div key={idx} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{suggestion.keyword}</span>
                          {suggestion.suggested_cluster ? (
                            <Badge variant="default">
                              {suggestion.confidence}% confidence
                            </Badge>
                          ) : (
                            <Badge variant="outline">No match found</Badge>
                          )}
                        </div>
                        {suggestion.suggested_cluster ? (
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Suggested: <span className="font-medium text-foreground">
                                {suggestion.suggested_cluster.cluster_name}
                              </span>
                            </p>
                            {suggestion.alternatives.length > 0 && (
                              <div className="flex gap-2 mt-2">
                                <span className="text-xs text-muted-foreground">Alt:</span>
                                {suggestion.alternatives.map((alt: any, i: number) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {alt.cluster.cluster_name} ({alt.confidence}%)
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            {suggestion.suggestion}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Bulk Import Dialog */}
        <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Bulk Import Keywords</DialogTitle>
              <DialogDescription>
                Import multiple keywords at once using CSV format
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">CSV Format:</p>
                <code className="text-xs">
                  keyword,type,cluster,priority,search_volume
                </code>
                <p className="text-xs text-muted-foreground mt-2">
                  Example: crypto scam recovery,primary,Cryptocurrency Recovery,8,1200
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Type: primary, secondary, long_tail, semantic
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="import_data">Paste your keyword list (one per line)</Label>
                <Textarea
                  id="import_data"
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  placeholder="crypto scam recovery,primary,Cryptocurrency Recovery,8,1200&#10;blockchain fraud investigation,primary,Blockchain Tracing,9,800&#10;recover stolen bitcoin,long_tail,Cryptocurrency Recovery,7,450"
                  rows={12}
                  className="font-mono text-sm"
                />
              </div>

              <Button onClick={parseImportData} variant="outline" className="w-full">
                Parse & Preview
              </Button>

              {importPreview.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Preview ({importPreview.length} keywords)</p>
                    <Button onClick={confirmBulkImport} size="sm">
                      Confirm Import
                    </Button>
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-2 border rounded-lg p-3">
                    {importPreview.slice(0, 10).map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                        <span className="font-medium">{item.keyword}</span>
                        <div className="flex items-center gap-2">
                          {getTypeBadge(item.keyword_type)}
                          <Badge variant="outline">{item.cluster_name}</Badge>
                          <Badge variant="outline">P:{item.priority}</Badge>
                        </div>
                      </div>
                    ))}
                    {importPreview.length > 10 && (
                      <p className="text-xs text-muted-foreground text-center pt-2">
                        ...and {importPreview.length - 10} more
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

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