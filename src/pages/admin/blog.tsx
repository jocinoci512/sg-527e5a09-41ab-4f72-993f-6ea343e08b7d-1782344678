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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bell, Plus, Edit, Trash2, Eye, Save, X, Home, CheckCircle, Clock, Archive, AlertTriangle, Rocket } from "lucide-react";
import { blogService } from "@/services/blogService";
import { publishingService } from "@/services/publishingService";
import { useToast } from "@/hooks/use-toast";

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [publishingPost, setPublishingPost] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, [statusFilter]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [postsData, categoriesData] = await Promise.all([
        blogService.getPosts({ status: statusFilter }),
        blogService.getCategories()
      ]);
      setPosts(postsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading blog data:", error);
      toast({
        title: "Error Loading Data",
        description: "Could not load blog posts and categories",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOneClickPublish = async (post: any) => {
    setPublishingPost(post.id);
    try {
      const validation = publishingService.validateBlogPost(post);
      
      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        toast({
          title: "Validation Failed",
          description: `Cannot publish: ${validation.errors.join(", ")}`,
          variant: "destructive"
        });
        return;
      }

      await publishingService.publishPost(post.id, "Support@cipherstraces.com");
      toast({
        title: "✅ Published Successfully!",
        description: `"${post.title}" is now live on your website`
      });
      loadData();
    } catch (error: any) {
      console.error("Error publishing post:", error);
      toast({
        title: "Publish Failed",
        description: error.message || "Could not publish blog post",
        variant: "destructive"
      });
    } finally {
      setPublishingPost(null);
      setValidationErrors([]);
    }
  };

  const handleUnpublish = async (postId: string) => {
    try {
      await publishingService.unpublishPost(postId, "Support@cipherstraces.com");
      toast({ title: "Unpublished", description: "Blog post has been unpublished" });
      loadData();
    } catch (error) {
      console.error("Error unpublishing:", error);
      toast({ title: "Error", description: "Could not unpublish post", variant: "destructive" });
    }
  };

  const handleArchive = async (postId: string) => {
    try {
      await publishingService.archivePost(postId, "Support@cipherstraces.com");
      toast({ title: "Archived", description: "Blog post has been archived" });
      loadData();
    } catch (error) {
      console.error("Error archiving:", error);
      toast({ title: "Error", description: "Could not archive post", variant: "destructive" });
    }
  };

  const handleMoveToReview = async (postId: string) => {
    try {
      await publishingService.moveToReview(postId, "Support@cipherstraces.com");
      toast({ title: "Moved to Review", description: "Blog post is ready for review" });
      loadData();
    } catch (error) {
      console.error("Error moving to review:", error);
      toast({ title: "Error", description: "Could not move to review", variant: "destructive" });
    }
  };

  const getReviewStatusBadge = (reviewStatus: string) => {
    const variants: Record<string, any> = {
      draft: { variant: "secondary", label: "DRAFT", icon: Edit },
      review: { variant: "outline", label: "IN REVIEW", icon: Eye },
      scheduled: { variant: "default", label: "SCHEDULED", icon: Clock },
      published: { variant: "default", label: "PUBLISHED", icon: CheckCircle },
      archived: { variant: "secondary", label: "ARCHIVED", icon: Archive }
    };
    const config = variants[reviewStatus] || { variant: "secondary", label: reviewStatus.toUpperCase(), icon: Edit };
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const handleCreateNew = () => {
    setEditingPost({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featured_image: "",
      category_id: categories[0]?.id || "",
      author_id: "550e8400-e29b-41d4-a716-446655440000", // Default author
      status: "draft",
      meta_title: "",
      meta_description: "",
      tags: []
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      // Generate slug from title if empty
      if (!editingPost.slug) {
        editingPost.slug = editingPost.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }

      if (editingPost.id) {
        await blogService.updatePost(editingPost.id, editingPost);
        toast({ title: "Post Updated", description: "Blog post has been updated successfully" });
      } else {
        await blogService.createPost(editingPost);
        toast({ title: "Post Created", description: "New blog post has been created successfully" });
      }
      
      setIsDialogOpen(false);
      setEditingPost(null);
      loadData();
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Save Failed",
        description: "Could not save blog post",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    
    try {
      await blogService.deletePost(postId);
      toast({ title: "Post Deleted", description: "Blog post has been deleted successfully" });
      loadData();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Delete Failed",
        description: "Could not delete blog post",
        variant: "destructive"
      });
    }
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
            <Link href="/admin/blog" className="text-sm font-medium text-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/admin/seo-content" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
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
            <h1 className="text-3xl font-bold text-foreground font-heading">Blog Management</h1>
            <p className="text-muted-foreground mt-2">Create, edit, and publish blog posts with one-click publishing</p>
          </div>
          <Button onClick={handleCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Post
          </Button>
        </div>

        {validationErrors.length > 0 && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <p className="font-semibold mb-2">Validation Errors:</p>
              <ul className="list-disc list-inside space-y-1">
                {validationErrors.map((error, idx) => (
                  <li key={idx} className="text-sm">{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filter Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Posts List with One-Click Publishing */}
        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading posts...</div>
          ) : posts.length === 0 ? (
            <Card>
              <CardContent className="pt-12 pb-12 text-center text-muted-foreground">
                No blog posts yet. Click "Create New Post" to get started.
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-xl font-heading">{post.title}</h3>
                        {getReviewStatusBadge(post.review_status || "draft")}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Category: {post.category?.name || "Uncategorized"}</span>
                        <span>•</span>
                        <span>Views: {post.views || 0}</span>
                        <span>•</span>
                        <span>
                          {post.published_at
                            ? new Date(post.published_at).toLocaleDateString()
                            : "Not published"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      {post.status !== "published" ? (
                        <Button
                          size="sm"
                          onClick={() => handleOneClickPublish(post)}
                          disabled={publishingPost === post.id}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Rocket className="mr-2 h-4 w-4" />
                          {publishingPost === post.id ? "Publishing..." : "Publish Now"}
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUnpublish(post.id)}
                        >
                          Unpublish
                        </Button>
                      )}
                      {post.review_status === "draft" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoveToReview(post.id)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Move to Review
                        </Button>
                      )}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(post)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleArchive(post.id)}
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost?.id ? "Edit Blog Post" : "Create New Blog Post"}
              </DialogTitle>
              <DialogDescription>
                Fill in the blog post details below
              </DialogDescription>
            </DialogHeader>

            {editingPost && (
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                      placeholder="Enter post title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={editingPost.slug}
                      onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                      placeholder="auto-generated-from-title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={editingPost.category_id}
                      onValueChange={(value) => setEditingPost({ ...editingPost, category_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={editingPost.excerpt}
                      onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                      placeholder="Brief description for listing pages"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      value={editingPost.content}
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                      placeholder="Write your blog post content here..."
                      rows={12}
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="featured_image">Featured Image URL</Label>
                    <Input
                      id="featured_image"
                      value={editingPost.featured_image}
                      onChange={(e) => setEditingPost({ ...editingPost, featured_image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meta_title">SEO Title</Label>
                    <Input
                      id="meta_title"
                      value={editingPost.meta_title}
                      onChange={(e) => setEditingPost({ ...editingPost, meta_title: e.target.value })}
                      placeholder="SEO optimized title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meta_description">SEO Description</Label>
                    <Input
                      id="meta_description"
                      value={editingPost.meta_description}
                      onChange={(e) => setEditingPost({ ...editingPost, meta_description: e.target.value })}
                      placeholder="SEO meta description"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    {editingPost.id ? "Update Post" : "Create Post"}
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