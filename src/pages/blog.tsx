import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, Clock, Search, ArrowRight } from "lucide-react";

export default function Blog() {
  const categories = [
    "All Posts",
    "Crypto Recovery",
    "Fraud Prevention",
    "Scam Alerts",
    "Blockchain Intelligence",
    "Cybersecurity",
    "Investigation Reports"
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "How to Identify and Avoid Pig Butchering Scams in 2026",
      excerpt: "Learn the warning signs of pig butchering scams and protect yourself from cryptocurrency investment fraud targeting victims through social media and dating apps.",
      category: "Scam Alerts",
      date: "2026-06-15",
      readTime: "8 min read",
      slug: "identify-avoid-pig-butchering-scams"
    },
    {
      id: 2,
      title: "Blockchain Transaction Tracing: A Complete Guide",
      excerpt: "Understand how blockchain analysis helps investigators track stolen cryptocurrency and identify perpetrators of digital asset fraud across multiple networks.",
      category: "Blockchain Intelligence",
      date: "2026-06-10",
      readTime: "12 min read",
      slug: "blockchain-transaction-tracing-guide"
    },
    {
      id: 3,
      title: "Romance Scam Recovery: Steps to Take After Being Victimized",
      excerpt: "Discover the essential steps victims should take immediately after discovering a romance scam, including evidence preservation and investigation options.",
      category: "Fraud Prevention",
      date: "2026-06-05",
      readTime: "10 min read",
      slug: "romance-scam-recovery-steps"
    }
  ];

  const recentPosts = [
    {
      id: 4,
      title: "NFT Scams: Common Tactics and How to Protect Your Digital Assets",
      category: "Scam Alerts",
      date: "2026-06-01",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "Wire Fraud Investigation: What Law Enforcement Needs to Know",
      category: "Investigation Reports",
      date: "2026-05-28",
      readTime: "9 min read"
    },
    {
      id: 6,
      title: "Cryptocurrency Exchange Fraud: Red Flags and Prevention",
      category: "Crypto Recovery",
      date: "2026-05-25",
      readTime: "6 min read"
    },
    {
      id: 7,
      title: "Social Engineering in Forex Scams: Psychological Tactics Used",
      category: "Fraud Prevention",
      date: "2026-05-20",
      readTime: "11 min read"
    },
    {
      id: 8,
      title: "Banking Fraud Recovery: Legal Options and Investigation Process",
      category: "Investigation Reports",
      date: "2026-05-15",
      readTime: "8 min read"
    },
    {
      id: 9,
      title: "Cybersecurity Best Practices for Cryptocurrency Investors",
      category: "Cybersecurity",
      date: "2026-05-10",
      readTime: "10 min read"
    }
  ];

  return (
    <Layout>
      <SEO 
        title="Blog | Cipher Trace - Fraud Prevention & Recovery Insights"
        description="Expert insights on cryptocurrency fraud, blockchain investigation, scam prevention, and digital asset recovery from professional investigators at Cipher Trace."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              Investigation Insights & Fraud Prevention
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
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === "All Posts" ? "default" : "outline"}
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 font-heading">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="border-2 hover:border-primary transition-colors cursor-pointer group">
                  <CardHeader>
                    <Badge className="w-fit mb-3">{post.category}</Badge>
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
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Button variant="ghost" className="group-hover:text-primary -ml-4">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8 font-heading">Recent Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentPosts.map((post) => (
                <Card key={post.id} className="border-2 hover:border-primary transition-colors cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-heading group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" variant="outline">
              Load More Articles
            </Button>
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