import { GetStaticPaths, GetStaticProps } from "next";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Mail, Globe, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useRouter } from "next/router";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  publish_date: string;
  views: number;
  reading_time: number;
  seo_title: string | null;
  seo_description: string | null;
  category: {
    name: string;
    slug: string;
  };
  author: {
    name: string;
    bio: string | null;
    avatar_url: string | null;
    twitter_url: string | null;
    linkedin_url: string | null;
    website_url: string | null;
  };
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: {
    name: string;
  };
  reading_time: number;
}

interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: RelatedPost[];
}

export default function BlogPostPage({ post, relatedPosts }: BlogPostPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post.title;

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`
    };
    
    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
  };

  return (
    <Layout>
      <SEO
        title={post.seo_title || `${post.title} | Cipher Trace Blog`}
        description={post.seo_description || post.excerpt}
        image={post.featured_image || undefined}
      />

      <article className="py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <header className="mb-8">
            <Badge className="mb-4">{post.category.name}</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-heading mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.publish_date}>
                  {new Date(post.publish_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}
                </time>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.reading_time} min read</span>
              </div>
              <span>•</span>
              <span>{post.views} views</span>
            </div>

            {post.excerpt && (
              <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-6 py-2">
                {post.excerpt}
              </p>
            )}
          </header>

          {post.featured_image && (
            <div className="mb-12 rounded-lg overflow-hidden">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="flex items-center justify-between mb-8 pb-8 border-b">
            <div className="flex items-center gap-4">
              {post.author.avatar_url && (
                <img
                  src={post.author.avatar_url}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <p className="font-semibold text-foreground">{post.author.name}</p>
                {post.author.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-1">{post.author.bio}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("facebook")}
                title="Share on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("twitter")}
                title="Share on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("linkedin")}
                title="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("email")}
                title="Share via Email"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-li:text-foreground/90">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <Separator className="my-12" />

          <section className="bg-muted/50 rounded-lg p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-6">
              {post.author.avatar_url && (
                <div className="flex-shrink-0">
                  <img
                    src={post.author.avatar_url}
                    alt={post.author.name}
                    className="w-24 h-24 rounded-full"
                  />
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-foreground mb-2 font-heading">
                  About {post.author.name}
                </h3>
                {post.author.bio && (
                  <p className="text-muted-foreground mb-4">
                    {post.author.bio}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3">
                  {post.author.website_url && (
                    <Button asChild variant="outline" size="sm">
                      <a href={post.author.website_url} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Website
                      </a>
                    </Button>
                  )}
                  {post.author.twitter_url && (
                    <Button asChild variant="outline" size="sm">
                      <a href={post.author.twitter_url} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </a>
                    </Button>
                  )}
                  {post.author.linkedin_url && (
                    <Button asChild variant="outline" size="sm">
                      <a href={post.author.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </section>

          <div className="bg-muted/30 rounded-lg p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">
              Need Professional Investigation Services?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
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

          {relatedPosts.length > 0 && (
            <>
              <Separator className="my-12" />
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-8 font-heading">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((related) => (
                    <Card key={related.id} className="border-2 hover:border-primary transition-colors group">
                      <CardHeader>
                        <Badge variant="outline" className="w-fit mb-2">
                          {related.category.name}
                        </Badge>
                        <CardTitle className="text-lg font-heading group-hover:text-primary transition-colors">
                          <Link href={`/blog/${related.slug}`}>
                            {related.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {related.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{related.reading_time} min read</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("status", "published")
    .order("publish_date", { ascending: false });

  if (error || !posts) {
    return {
      paths: [],
      fallback: "blocking"
    };
  }

  const paths = posts.map((post) => ({
    params: { slug: post.slug }
  }));

  return {
    paths,
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      featured_image,
      publish_date,
      views,
      reading_time,
      seo_title,
      seo_description,
      category:blog_categories(name, slug),
      author:blog_authors(name, bio, avatar_url, twitter_url, linkedin_url, website_url)
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !post) {
    return {
      notFound: true
    };
  }

  await supabase
    .from("blog_posts")
    .update({ views: (post.views || 0) + 1 })
    .eq("id", post.id);

  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select(`
      id,
      title,
      slug,
      excerpt,
      reading_time,
      category:blog_categories(name)
    `)
    .eq("status", "published")
    .neq("id", post.id)
    .limit(4);

  return {
    props: {
      post,
      relatedPosts: relatedPosts || []
    },
    revalidate: 3600
  };
};