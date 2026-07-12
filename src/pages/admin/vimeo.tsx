import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Video, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Home, 
  Upload, 
  Play, 
  Clock, 
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Copy,
  BarChart3
} from "lucide-react";
import { vimeoService } from "@/services/vimeoService";
import { useToast } from "@/hooks/use-toast";

export default function AdminVimeo() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    vimeo_url: "",
    title: "",
    description: "",
    category: "",
    tags: ""
  });

  useEffect(() => {
    loadVideos();
  }, [categoryFilter]);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const filters = categoryFilter !== "all" ? { category: categoryFilter } : {};
      const data = await vimeoService.getVideos(filters);
      setVideos(data);
    } catch (error) {
      console.error("Error loading videos:", error);
      toast({
        title: "Error",
        description: "Could not load video library",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddVideo = () => {
    setEditingVideo(null);
    setFormData({
      vimeo_url: "",
      title: "",
      description: "",
      category: "",
      tags: ""
    });
    setIsDialogOpen(true);
  };

  const handleEditVideo = (video: any) => {
    setEditingVideo(video);
    setFormData({
      vimeo_url: video.embed_url,
      title: video.title,
      description: video.description || "",
      category: video.category || "",
      tags: video.tags ? video.tags.join(", ") : ""
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (!formData.vimeo_url || !formData.title) {
        toast({
          title: "Validation Error",
          description: "Vimeo URL and title are required",
          variant: "destructive"
        });
        return;
      }

      const vimeoId = vimeoService.extractVimeoIdFromUrl(formData.vimeo_url);
      if (!vimeoId) {
        toast({
          title: "Invalid URL",
          description: "Please enter a valid Vimeo video URL",
          variant: "destructive"
        });
        return;
      }

      if (editingVideo) {
        await vimeoService.updateVideo(editingVideo.id, {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          tags: formData.tags ? formData.tags.split(",").map(t => t.trim()) : []
        });
        toast({ title: "Success", description: "Video updated successfully" });
      } else {
        await vimeoService.addVideo({
          vimeo_video_id: vimeoId,
          title: formData.title,
          description: formData.description,
          embed_url: vimeoService.generateEmbedUrl(vimeoId),
          thumbnail_url: vimeoService.generateThumbnailUrl(vimeoId),
          category: formData.category,
          tags: formData.tags ? formData.tags.split(",").map(t => t.trim()) : []
        });
        toast({ title: "Success", description: "Video added to library" });
      }

      setIsDialogOpen(false);
      loadVideos();
    } catch (error: any) {
      console.error("Error saving video:", error);
      toast({
        title: "Error",
        description: error.message || "Could not save video",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (videoId: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    try {
      await vimeoService.deleteVideo(videoId);
      toast({ title: "Success", description: "Video deleted" });
      loadVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
      toast({
        title: "Error",
        description: "Could not delete video",
        variant: "destructive"
      });
    }
  };

  const copyEmbedCode = (embedUrl: string) => {
    const code = `<iframe src="${embedUrl}" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    navigator.clipboard.writeText(code);
    toast({ title: "Copied!", description: "Embed code copied to clipboard" });
  };

  const totalVideos = videos.length;
  const totalViews = videos.reduce((sum, v) => sum + (v.views || 0), 0);
  const categories = [...new Set(videos.map(v => v.category).filter(Boolean))];

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
            <Link href="/admin/vimeo" className="text-sm font-medium text-foreground">
              Video Library
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
              <Video className="h-8 w-8 text-primary" />
              Vimeo Video Library
            </h1>
            <p className="text-muted-foreground mt-2">Manage and organize case review videos</p>
          </div>
          <Button onClick={handleAddVideo}>
            <Plus className="mr-2 h-4 w-4" />
            Add Video
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVideos}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Videos</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {videos.filter(v => v.status === "active").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Label>Filter by Category:</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Video Grid */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading videos...</div>
        ) : videos.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No videos in your library yet</p>
              <Button onClick={handleAddVideo}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Video
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative aspect-video bg-muted">
                  {video.thumbnail_url ? (
                    <Image
                      src={video.thumbnail_url}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Play className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href={video.embed_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-white/90 flex items-center gap-2"
                    >
                      <Play className="h-4 w-4" />
                      Watch on Vimeo
                    </a>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-2">{video.title}</CardTitle>
                    <Badge variant={video.status === "active" ? "default" : "secondary"}>
                      {video.status}
                    </Badge>
                  </div>
                  {video.description && (
                    <CardDescription className="line-clamp-2">
                      {video.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {video.views || 0} views
                    </div>
                    {video.duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                      </div>
                    )}
                  </div>
                  {video.category && (
                    <Badge variant="outline" className="mb-4">{video.category}</Badge>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditVideo(video)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyEmbedCode(video.embed_url)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(video.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingVideo ? "Edit Video" : "Add Video to Library"}
            </DialogTitle>
            <DialogDescription>
              Enter the Vimeo video URL and details
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>How to add videos:</strong> Upload your video to Vimeo first, then paste the URL here (e.g., https://vimeo.com/123456789)
              </AlertDescription>
            </Alert>

            <div>
              <Label htmlFor="vimeo_url">Vimeo Video URL *</Label>
              <Input
                id="vimeo_url"
                placeholder="https://vimeo.com/123456789"
                value={formData.vimeo_url}
                onChange={(e) => setFormData({ ...formData, vimeo_url: e.target.value })}
                disabled={!!editingVideo}
              />
            </div>

            <div>
              <Label htmlFor="title">Video Title *</Label>
              <Input
                id="title"
                placeholder="Case Review: Successful Bitcoin Recovery"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                placeholder="Brief description of the video content..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="Case Studies, Tutorials, Client Testimonials, etc."
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                placeholder="bitcoin, scam recovery, blockchain tracing"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingVideo ? "Update Video" : "Add Video"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}