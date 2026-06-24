import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye
} from "lucide-react";

export default function AdminBlog() {
  const [showEditor, setShowEditor] = useState(false);

  // Mock data - will be replaced with Supabase queries
  const posts = [
    {
      id: "POST-001",
      title: "How to Identify Pig Butchering Scams",
      slug: "identify-pig-butchering-scams",
      category: "Scam Alerts",
      status: "published",
      author: "Admin",
      date: "2026-06-20",
      views: 1243
    },
    {
      id: "POST-002",
      title: "Blockchain Tracing Methods Explained",
      slug: "blockchain-tracing-methods",
      category: "Blockchain Intelligence",
      status: "published",
      author: "Admin",
      date: "2026-06-18",
      views: 892
    },
    {
      id: "POST-003",
      title: "Crypto Recovery Case Study",
      slug: "crypto-recovery-case-study",
      category: "Crypto Recovery",
      status: "draft",
      author: "Admin",
      date: "2026-06-15",
      views: 0
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Image
              src="/logo.png"
              alt="Cipher Trace"
              width={150}
              height={45}
            />
            <nav className="flex gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/cases">
                  <FileText className="mr-2 h-4 w-4" />
                  Cases
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/leads">
                  <Users className="mr-2 h-4 w-4" />
                  Leads
                </Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link href="/admin/content">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Content
                </Link>
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/login">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {!showEditor ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-heading">Blog Management</h1>
                <p className="text-muted-foreground mt-2">
                  Create and manage blog posts for the website
                </p>
              </div>
              <Button onClick={() => setShowEditor(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Blog Posts ({posts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="p-4 border-2 rounded-lg hover:border-primary transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant={post.status === "published" ? "default" : "secondary"}>
                              {post.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{post.category}</span>
                          </div>
                          <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                          <div className="text-sm text-muted-foreground">
                            {new Date(post.date).toLocaleDateString()} • {post.views} views
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <div className="mb-8">
              <Button variant="outline" onClick={() => setShowEditor(false)} className="mb-4">
                ← Back to Posts
              </Button>
              <h1 className="text-3xl font-bold text-foreground font-heading">Create New Post</h1>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Post Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter post title..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">URL Slug</Label>
                      <Input
                        id="slug"
                        placeholder="post-url-slug"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="crypto-recovery">Crypto Recovery</SelectItem>
                          <SelectItem value="fraud-prevention">Fraud Prevention</SelectItem>
                          <SelectItem value="scam-alerts">Scam Alerts</SelectItem>
                          <SelectItem value="blockchain-intelligence">Blockchain Intelligence</SelectItem>
                          <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                          <SelectItem value="consumer-protection">Consumer Protection</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="publish-date">Publish Date</Label>
                      <Input
                        id="publish-date"
                        type="date"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief summary of the post..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your post content here (supports Markdown)..."
                      rows={15}
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      placeholder="crypto, scam, recovery, blockchain"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit">
                      Publish Post
                    </Button>
                    <Button type="button" variant="outline">
                      Save as Draft
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setShowEditor(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}