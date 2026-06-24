import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Save, Type, Layout as LayoutIcon } from "lucide-react";
import { contentService } from "@/services/contentService";
import { useToast } from "@/hooks/use-toast";

export default function AdminContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const contentSections = [
    {
      page: "homepage",
      label: "Homepage",
      sections: [
        { key: "hero_headline", label: "Hero Headline", type: "text" },
        { key: "hero_subheadline", label: "Hero Subheadline", type: "textarea" },
        { key: "hero_cta_primary", label: "Primary CTA Button", type: "text" },
        { key: "hero_cta_secondary", label: "Secondary CTA Button", type: "text" },
        { key: "about_headline", label: "About Section Headline", type: "text" },
        { key: "about_description", label: "About Section Description", type: "textarea" },
        { key: "services_headline", label: "Services Headline", type: "text" },
        { key: "services_description", label: "Services Description", type: "textarea" }
      ]
    },
    {
      page: "about",
      label: "About Page",
      sections: [
        { key: "about_hero_headline", label: "Hero Headline", type: "text" },
        { key: "about_hero_description", label: "Hero Description", type: "textarea" },
        { key: "mission_headline", label: "Mission Headline", type: "text" },
        { key: "mission_text", label: "Mission Text", type: "textarea" },
        { key: "vision_headline", label: "Vision Headline", type: "text" },
        { key: "vision_text", label: "Vision Text", type: "textarea" }
      ]
    },
    {
      page: "services",
      label: "Services Page",
      sections: [
        { key: "services_hero_headline", label: "Hero Headline", type: "text" },
        { key: "services_hero_description", label: "Hero Description", type: "textarea" },
        { key: "services_cta", label: "CTA Button Text", type: "text" }
      ]
    },
    {
      page: "contact",
      label: "Contact Page",
      sections: [
        { key: "contact_hero_headline", label: "Hero Headline", type: "text" },
        { key: "contact_hero_description", label: "Hero Description", type: "textarea" },
        { key: "contact_form_title", label: "Form Title", type: "text" },
        { key: "contact_form_description", label: "Form Description", type: "textarea" }
      ]
    },
    {
      page: "footer",
      label: "Footer",
      sections: [
        { key: "footer_company_description", label: "Company Description", type: "textarea" },
        { key: "footer_email", label: "Email Address", type: "text" },
        { key: "footer_phone", label: "Phone Number", type: "text" },
        { key: "footer_whatsapp", label: "WhatsApp Number", type: "text" }
      ]
    }
  ];

  useEffect(() => {
    loadAllContent();
  }, []);

  const loadAllContent = async () => {
    try {
      setLoading(true);
      const data = await contentService.getAllContent();
      const mapped = data.reduce((acc: any, item: any) => {
        acc[item.section_key] = item;
        return acc;
      }, {});
      setSections(mapped);
    } catch (error) {
      console.error("Error loading content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (page: string) => {
    try {
      setSaving(true);
      const pageConfig = contentSections.find(p => p.page === page);
      if (!pageConfig) return;

      for (const section of pageConfig.sections) {
        const sectionData = sections[section.key];
        const payload = {
          section_key: section.key,
          section_label: section.label,
          page_name: page,
          content_value: sectionData?.content_value || ""
        };

        if (sectionData?.id) {
          await contentService.updateContent(section.key, payload);
        } else {
          await contentService.createContent(payload);
        }
      }

      toast({
        title: "Content Saved",
        description: `${pageConfig.label} content has been updated`,
      });

      await loadAllContent();
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Save Failed",
        description: "Could not save content changes",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (sectionKey: string, value: string) => {
    setSections(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        content_value: value,
        section_key: sectionKey
      }
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-muted-foreground">Loading content...</div>
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
            <Link href="/admin/content" className="text-sm font-medium text-foreground hover:text-foreground transition-colors">
              Content
            </Link>
            <Link href="/admin/seo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
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
          <h1 className="text-3xl font-bold text-foreground font-heading">Content Management</h1>
          <p className="text-muted-foreground mt-2">
            Edit website copy, headlines, and CTAs without touching code
          </p>
        </div>

        <Tabs defaultValue="homepage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
            {contentSections.map(page => (
              <TabsTrigger key={page.page} value={page.page}>
                {page.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {contentSections.map(pageConfig => (
            <TabsContent key={pageConfig.page} value={pageConfig.page} className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Type className="h-5 w-5" />
                        {pageConfig.label} Content
                      </CardTitle>
                      <CardDescription>Edit copy and text for this page</CardDescription>
                    </div>
                    <Button onClick={() => handleSave(pageConfig.page)} disabled={saving}>
                      <Save className="mr-2 h-4 w-4" />
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {pageConfig.sections.map(section => (
                    <div key={section.key} className="space-y-2">
                      <Label htmlFor={section.key}>{section.label}</Label>
                      {section.type === "textarea" ? (
                        <Textarea
                          id={section.key}
                          value={sections[section.key]?.content_value || ""}
                          onChange={(e) => updateField(section.key, e.target.value)}
                          placeholder={`Enter ${section.label.toLowerCase()}`}
                          rows={4}
                        />
                      ) : (
                        <Input
                          id={section.key}
                          value={sections[section.key]?.content_value || ""}
                          onChange={(e) => updateField(section.key, e.target.value)}
                          placeholder={`Enter ${section.label.toLowerCase()}`}
                        />
                      )}
                      <p className="text-xs text-muted-foreground">
                        Current length: {(sections[section.key]?.content_value || "").length} characters
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutIcon className="h-5 w-5" />
              Content Safety Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>✓ All changes are saved to the database and take effect immediately</p>
            <p>✓ Keep headlines concise and action-oriented</p>
            <p>✓ Descriptions should be clear and benefit-focused</p>
            <p>✓ Test content changes on mobile devices</p>
            <p>✓ Maintain consistent tone across all pages</p>
            <p>⚠️ Changes cannot be undone - save carefully</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}