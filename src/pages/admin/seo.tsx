import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Save, Globe, Search } from "lucide-react";
import { seoService } from "@/services/seoService";
import { useToast } from "@/hooks/use-toast";

export default function AdminSEO() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seoData, setSeoData] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const pages = [
    { slug: "home", label: "Homepage", path: "/" },
    { slug: "about", label: "About Us", path: "/about" },
    { slug: "services", label: "Services", path: "/services" },
    { slug: "scams", label: "Scam Types", path: "/scams" },
    { slug: "case-review", label: "Case Review", path: "/case-review" },
    { slug: "report-scam", label: "Report Scam", path: "/report-scam" },
    { slug: "contact", label: "Contact", path: "/contact" },
    { slug: "blog", label: "Blog", path: "/blog" },
    { slug: "faq", label: "FAQ", path: "/faq" }
  ];

  useEffect(() => {
    loadAllSEO();
  }, []);

  const loadAllSEO = async () => {
    try {
      setLoading(true);
      const data = await seoService.getAllPageSEO();
      const mapped = data.reduce((acc: any, item: any) => {
        acc[item.page_slug] = item;
        return acc;
      }, {});
      setSeoData(mapped);
    } catch (error) {
      console.error("Error loading SEO data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (pageSlug: string) => {
    try {
      setSaving(true);
      const pageData = seoData[pageSlug];
      
      if (pageData?.id) {
        await seoService.updatePageSEO(pageSlug, pageData);
      } else {
        await seoService.createPageSEO({ ...pageData, page_slug: pageSlug });
      }
      
      toast({
        title: "SEO Saved",
        description: `SEO settings updated for ${pages.find(p => p.slug === pageSlug)?.label}`,
      });
      
      await loadAllSEO();
    } catch (error) {
      console.error("Error saving SEO:", error);
      toast({
        title: "Save Failed",
        description: "Could not save SEO settings",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (pageSlug: string, field: string, value: string) => {
    setSeoData(prev => ({
      ...prev,
      [pageSlug]: {
        ...prev[pageSlug],
        [field]: value
      }
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-muted-foreground">Loading SEO settings...</div>
      </div>
    );
  }

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
            <Link href="/admin/seo" className="text-sm font-medium text-foreground hover:text-foreground transition-colors">
              SEO
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
          <h1 className="text-3xl font-bold text-foreground font-heading">SEO Management</h1>
          <p className="text-muted-foreground mt-2">
            Optimize search engine visibility for all pages
          </p>
        </div>

        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
            {pages.slice(0, 5).map(page => (
              <TabsTrigger key={page.slug} value={page.slug}>
                {page.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            {pages.slice(5).map(page => (
              <TabsTrigger key={page.slug} value={page.slug}>
                {page.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {pages.map(page => (
            <TabsContent key={page.slug} value={page.slug} className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        {page.label} SEO
                      </CardTitle>
                      <CardDescription>Path: {page.path}</CardDescription>
                    </div>
                    <Button onClick={() => handleSave(page.slug)} disabled={saving}>
                      <Save className="mr-2 h-4 w-4" />
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Meta Title */}
                  <div className="space-y-2">
                    <Label htmlFor={`${page.slug}-title`}>Meta Title</Label>
                    <Input
                      id={`${page.slug}-title`}
                      value={seoData[page.slug]?.meta_title || ""}
                      onChange={(e) => updateField(page.slug, "meta_title", e.target.value)}
                      placeholder="Enter SEO title (50-60 characters recommended)"
                      maxLength={120}
                    />
                    <p className="text-xs text-muted-foreground">
                      {(seoData[page.slug]?.meta_title || "").length}/60 characters
                    </p>
                  </div>

                  {/* Meta Description */}
                  <div className="space-y-2">
                    <Label htmlFor={`${page.slug}-description`}>Meta Description</Label>
                    <Textarea
                      id={`${page.slug}-description`}
                      value={seoData[page.slug]?.meta_description || ""}
                      onChange={(e) => updateField(page.slug, "meta_description", e.target.value)}
                      placeholder="Enter SEO description (150-160 characters recommended)"
                      rows={3}
                      maxLength={320}
                    />
                    <p className="text-xs text-muted-foreground">
                      {(seoData[page.slug]?.meta_description || "").length}/160 characters
                    </p>
                  </div>

                  {/* Keywords */}
                  <div className="space-y-2">
                    <Label htmlFor={`${page.slug}-keywords`}>Keywords</Label>
                    <Input
                      id={`${page.slug}-keywords`}
                      value={seoData[page.slug]?.meta_keywords || ""}
                      onChange={(e) => updateField(page.slug, "meta_keywords", e.target.value)}
                      placeholder="Enter keywords separated by commas"
                    />
                    <p className="text-xs text-muted-foreground">
                      Comma-separated list of relevant keywords
                    </p>
                  </div>

                  {/* Canonical URL */}
                  <div className="space-y-2">
                    <Label htmlFor={`${page.slug}-canonical`}>Canonical URL</Label>
                    <Input
                      id={`${page.slug}-canonical`}
                      value={seoData[page.slug]?.canonical_url || ""}
                      onChange={(e) => updateField(page.slug, "canonical_url", e.target.value)}
                      placeholder={`https://cipherstraces.com${page.path}`}
                    />
                    <p className="text-xs text-muted-foreground">
                      Full URL for canonical reference (optional)
                    </p>
                  </div>

                  {/* Open Graph Title */}
                  <div className="space-y-2">
                    <Label htmlFor={`${page.slug}-og-title`}>Open Graph Title</Label>
                    <Input
                      id={`${page.slug}-og-title`}
                      value={seoData[page.slug]?.og_title || ""}
                      onChange={(e) => updateField(page.slug, "og_title", e.target.value)}
                      placeholder="Social media share title (defaults to meta title)"
                    />
                  </div>

                  {/* Open Graph Description */}
                  <div className="space-y-2">
                    <Label htmlFor={`${page.slug}-og-description`}>Open Graph Description</Label>
                    <Textarea
                      id={`${page.slug}-og-description`}
                      value={seoData[page.slug]?.og_description || ""}
                      onChange={(e) => updateField(page.slug, "og_description", e.target.value)}
                      placeholder="Social media share description (defaults to meta description)"
                      rows={2}
                    />
                  </div>

                  {/* Open Graph Image */}
                  <div className="space-y-2">
                    <Label htmlFor={`${page.slug}-og-image`}>Open Graph Image URL</Label>
                    <Input
                      id={`${page.slug}-og-image`}
                      value={seoData[page.slug]?.og_image || ""}
                      onChange={(e) => updateField(page.slug, "og_image", e.target.value)}
                      placeholder="https://cipherstraces.com/og-image.png"
                    />
                    <p className="text-xs text-muted-foreground">
                      Image for social media shares (1200x630px recommended)
                    </p>
                  </div>

                  {/* Preview */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Google Search Preview
                    </h3>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">
                        cipherstraces.com › {page.path.replace("/", "")}
                      </div>
                      <div className="text-blue-600 text-xl mb-1 font-medium">
                        {seoData[page.slug]?.meta_title || `${page.label} | Cipher Trace`}
                      </div>
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {seoData[page.slug]?.meta_description || "Enter a meta description to see preview"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}