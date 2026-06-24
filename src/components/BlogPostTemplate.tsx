import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { blogService } from "@/services/blogService";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  author_id: string;
  category_id: string;
  published_at: string;
  views: number;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  author?: {
    id: string;
    name: string;
    avatar_url?: string;
    bio?: string;
  };
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image?: string;
  published_at: string;
}

interface BlogPostTemplateProps {
  post: BlogPost;
  relatedPosts?: RelatedPost[];
}

export function BlogPostTemplate({ post, relatedPosts = [] }: BlogPostTemplateProps) {
  // Increment view count when post is viewed
  useEffect(() => {
    if (post.id) {
      blogService.incrementViews(post.id);
    }
  }, [post.id]);

  // Calculate reading time
  const readingTime = Math.ceil((post.content?.length || 0) / 1000);

  // Share URLs
  const shareUrl = `https://cipherstraces.com/blog/${post.slug}`;
  const shareTitle = encodeURIComponent(post.title);
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;

  return (
    <Layout>
      <SEO
        title={post.meta_title || `${post.title} | Cipher Trace Blog`}
        description={post.meta_description || post.excerpt || post.title}
        image={post.featured_image}
      />

      {/* Article Header */}
      <article className="py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-primary hover:underline mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          {/* Category Badge */}
          {post.category && (
            <Link href={`/blog/category/${post.category.slug}`}>
              <Badge variant="outline" className="mb-4">
                {post.category.name}
              </Badge>
            </Link>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-heading mb-6">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.avatar_url && (
                  <Image
                    src={post.author.avatar_url}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author.name}
                </span>
              </div>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {readingTime} min read
            </span>
          </div>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="mb-12 rounded-lg overflow-hidden">
              <Image
                src={post.featured_image}
                alt={post.title}
                width={1200}
                height={630}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div
              className="text-foreground leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-12">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator className="mb-12" />

          {/* Share Section */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Share this article
            </h3>
            <div className="flex gap-3">
              <Button asChild variant="outline" size="sm">
                <a href={facebookShare} target="_blank" rel="noopener noreferrer">
                  <Facebook className="mr-2 h-4 w-4" />
                  Facebook
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href={twitterShare} target="_blank" rel="noopener noreferrer">
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href={linkedinShare} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>

          {/* Author Bio */}
          {post.author?.bio && (
            <>
              <Separator className="mb-12" />
              <Card className="mb-12">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {post.author.avatar_url && (
                      <Image
                        src={post.author.avatar_url}
                        alt={post.author.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg mb-2">About {post.author.name}</h3>
                      <p className="text-muted-foreground text-sm">{post.author.bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <>
              <Separator className="mb-12" />
              <div>
                <h3 className="text-2xl font-bold mb-6 font-heading">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <Link key={related.id} href={`/blog/${related.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        {related.featured_image && (
                          <div className="aspect-video relative overflow-hidden">
                            <Image
                              src={related.featured_image}
                              alt={related.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <CardContent className="pt-4">
                          <h4 className="font-semibold mb-2 line-clamp-2 font-heading">
                            {related.title}
                          </h4>
                          {related.excerpt && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {related.excerpt}
                            </p>
                          )}
                          <div className="mt-3 text-xs text-muted-foreground">
                            {new Date(related.published_at).toLocaleDateString()}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </article>
    </Layout>
  );
}