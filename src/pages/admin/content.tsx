import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  MessageSquare,
  Settings,
  LogOut,
  BookOpen,
  HelpCircle,
  Star,
  Activity
} from "lucide-react";

export default function AdminContent() {
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground font-heading">Content Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage blog posts, FAQs, testimonials, and activity logs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:border-primary transition-colors cursor-pointer" onClick={() => window.location.href = '/admin/blog'}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Blog Management
                </CardTitle>
              </div>
              <CardDescription>
                Create, edit, and publish blog posts for the website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Published Posts</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Draft Posts</span>
                  <span className="font-semibold">5</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/admin/blog">Manage Blog</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-colors cursor-pointer" onClick={() => window.location.href = '/admin/faqs'}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  FAQ Management
                </CardTitle>
              </div>
              <CardDescription>
                Add, edit, and organize frequently asked questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total FAQs</span>
                  <span className="font-semibold">52</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Categories</span>
                  <span className="font-semibold">6</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/admin/faqs">Manage FAQs</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-colors cursor-pointer" onClick={() => window.location.href = '/admin/testimonials'}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <Star className="h-6 w-6 text-primary" />
                  Testimonials
                </CardTitle>
              </div>
              <CardDescription>
                Manage client testimonials and success stories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Published</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pending Approval</span>
                  <span className="font-semibold">3</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/admin/testimonials">Manage Testimonials</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-colors cursor-pointer" onClick={() => window.location.href = '/admin/logs'}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <Activity className="h-6 w-6 text-primary" />
                  Activity Logs
                </CardTitle>
              </div>
              <CardDescription>
                View admin actions and system activity history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Today's Actions</span>
                  <span className="font-semibold">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Week</span>
                  <span className="font-semibold">127</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/admin/logs">View Logs</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}