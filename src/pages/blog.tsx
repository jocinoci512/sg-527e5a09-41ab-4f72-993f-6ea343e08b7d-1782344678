import { GetServerSideProps } from "next";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, Clock, Search, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  publish_date: string;
  reading_time: number;
  views: number;
  category: {
    name: string;
    slug: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  post_count: number;
}

interface BlogPageProps {
  posts: BlogPost[];
  categories: Category[];
  featuredPosts: BlogPost[];
  popularPosts: BlogPost[];
}

export default function Blog({ posts, categories, featuredPosts, popularPosts }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category.slug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <SEO 
        title="Knowledge Center | Cipher Trace - Fraud Investigation & Recovery Insights"
        description="Expert insights on cryptocurrency fraud, blockchain investigation, scam prevention, and digital asset recovery from professional investigators at Cipher Trace."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              Knowledge Center
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Expert analysis, case studies, and educational content from our professional investigation team.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                >
                  All Posts
                  {selectedCategory === "all" && ` (${posts.length})`}
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.slug ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.slug)}
                  >
                    {category.name}
                    {selectedCategory === category.slug && ` (${category.post_count})`}
                  </Button>
                ))}
              </div>
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-8 font-heading">Featured Articles</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="border-2 hover:border-primary transition-colors cursor-pointer group h-full">
                      <CardHeader>
                        <Badge className="w-fit mb-3">{post.category.name}</Badge>
                        <CardTitle className="text-xl font-heading group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.reading_time} min read</span>
                          </div>
                        </div>
                        <Button variant="ghost" className="group-hover:text-primary -ml-4">
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {popularPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-8 font-heading">Most Popular</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="border-2 hover:border-primary transition-colors cursor-pointer group h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{post.category.name}</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{post.reading_time} min</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg font-heading group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                          <span>•</span>
                          <span>{post.views} views</span>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8 font-heading">
              {searchQuery ? `Search Results (${filteredPosts.length})` : 
               selectedCategory !== "all" ? `${categories.find(c => c.slug === selectedCategory)?.name} Articles` : 
               "Latest Articles"}
            </h2>
            {filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="pt-12 pb-12 text-center text-muted-foreground">
                  {searchQuery ? "No articles found matching your search." : "No articles available yet."}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="border-2 hover:border-primary transition-colors cursor-pointer group h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{post.category.name}</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{post.reading_time} min read</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg font-heading group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {post.excerpt}
                        </CardDescription>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-heading">
            Need Professional Investigation Services?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our investigation team is ready to help you with fraud investigation, blockchain tracing, and recovery consultation services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/case-review">Start Free Case Review</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: posts, error: postsError } = await supabase
    .from("blog_posts")
    .select(`
      id,
      title,
      slug,
      excerpt,
      featured_image,
      publish_date,
      reading_time,
      views,
      category:blog_categories(name, slug)
    `)
    .eq("status", "published")
    .order("publish_date", { ascending: false })
    .limit(50);

  const { data: categories, error: categoriesError } = await supabase
    .from("blog_categories")
    .select("id, name, slug")
    .order("name");

  const categoriesWithCount = await Promise.all(
    (categories || []).map(async (cat) => {
      const { count } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true })
        .eq("status", "published")
        .eq("category_id", cat.id);
      
      return {
        ...cat,
        post_count: count || 0
      };
    })
  );

  const { data: featuredPosts } = await supabase
    .from("blog_posts")
    .select(`
      id,
      title,
      slug,
      excerpt,
      featured_image,
      publish_date,
      reading_time,
      views,
      category:blog_categories(name, slug)
    `)
    .eq("status", "published")
    .order("publish_date", { ascending: false })
    .limit(3);

  const { data: popularPosts } = await supabase
    .from("blog_posts")
    .select(`
      id,
      title,
      slug,
      excerpt,
      featured_image,
      publish_date,
      reading_time,
      views,
      category:blog_categories(name, slug)
    `)
    .eq("status", "published")
    .order("views", { ascending: false })
    .limit(6);

  return {
    props: {
      posts: posts || [],
      categories: categoriesWithCount || [],
      featuredPosts: featuredPosts || [],
      popularPosts: popularPosts || []
    }
  };
};