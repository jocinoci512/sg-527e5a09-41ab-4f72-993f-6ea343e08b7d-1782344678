import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { VideoEmbed } from "@/components/VideoEmbed";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Shield,
  TrendingUp,
  Users,
  FileCheck,
  ChevronRight,
  CheckCircle,
  Star,
  Award,
  Globe,
  Clock,
  Lock,
  Search,
  MessageSquare,
  ArrowRight,
  Target,
  Zap,
  BarChart3
} from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <SEO
        title="Cipher Trace | Professional Cryptocurrency Fraud Investigation & Blockchain Tracing Services"
        description="Expert cryptocurrency scam recovery, blockchain intelligence, fraud investigation, and digital asset tracing. Trusted by victims, businesses, attorneys, and law enforcement worldwide. Free case review available."
        image="/og-image.png"
        url="https://cipherstraces.com"
      />
      <Layout>
        {/* Hero Section - Critical Above-the-Fold Content */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-8">
              {/* Priority Logo - Loaded first */}
              <div className="flex justify-center mb-8">
                <Image
                  src="/logo.png"
                  alt="Cipher Trace Logo"
                  width={120}
                  height={120}
                  priority
                  className="drop-shadow-2xl"
                />
              </div>

              <Badge variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm">
                <Award className="mr-2 h-4 w-4" />
                Trusted by Victims, Businesses & Law Enforcement Worldwide
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight">
                Helping Victims Fight Back Against Financial Fraud
              </h1>

              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Professional blockchain tracing, scam investigations, fraud intelligence, and recovery consultation services.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-2xl"
                >
                  <Link href="/case-review">
                    <Shield className="mr-2 h-5 w-5" />
                    Start Free Case Review
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6"
                >
                  <Link href="/contact">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Speak With An Expert
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto">
                {mounted && (
                  <>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">
                        <AnimatedCounter end={500} duration={2000} suffix="+" />
                      </div>
                      <p className="text-sm text-white/80">Cases Handled</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">
                        <AnimatedCounter end={98} duration={2000} suffix="%" />
                      </div>
                      <p className="text-sm text-white/80">Client Satisfaction</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">
                        <AnimatedCounter end={50} duration={2000} suffix="+" />
                      </div>
                      <p className="text-sm text-white/80">Countries Served</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">$<AnimatedCounter end={100} duration={2000} suffix="M+" /></div>
                      <p className="text-sm text-white/80">Assets Traced</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronRight className="h-8 w-8 text-white/60 rotate-90" />
          </div>
        </section>

        {/* About Section - Lazy loaded images below fold */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">
                  <Shield className="mr-2 h-4 w-4" />
                  About Cipher Trace
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                  Professional Blockchain Intelligence & Fraud Investigation
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Cipher Trace is a leading fraud investigation and blockchain intelligence firm specializing in cryptocurrency scams, 
                  digital asset tracing, and recovery consultation services.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Expert Investigation Team</h3>
                      <p className="text-muted-foreground">
                        Our team consists of certified fraud examiners, blockchain analysts, and cybersecurity professionals 
                        with decades of combined experience.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                      <p className="text-muted-foreground">
                        We serve clients worldwide, working with international law enforcement, financial institutions, 
                        and legal professionals across multiple jurisdictions.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Lock className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Confidential & Secure</h3>
                      <p className="text-muted-foreground">
                        All investigations are conducted with the highest level of confidentiality and security, 
                        protecting client privacy at every step.
                      </p>
                    </div>
                  </div>

                  <Button asChild size="lg" className="mt-6">
                    <Link href="/about">
                      Learn More About Us
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                <div className="relative">
                  <Image
                    src="/Screenshot_2026-06-23_182557.png"
                    alt="Cipher Trace Investigation Team"
                    width={600}
                    height={400}
                    loading="lazy"
                    className="rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Preview Section - Lazy loaded */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <Badge variant="outline" className="mb-4">
                    <FileCheck className="mr-2 h-4 w-4" />
                    Latest Insights
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-bold font-heading">
                    Latest Articles & Updates
                  </h2>
                </div>
                <Button asChild variant="outline">
                  <Link href="/blog">
                    View All Articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "How to Identify Cryptocurrency Scams in 2026",
                    excerpt: "Learn the warning signs and red flags of common crypto scams",
                    category: "Fraud Prevention",
                    image: "/Screenshot_2026-06-23_182614.png"
                  },
                  {
                    title: "Blockchain Tracing: A Complete Guide",
                    excerpt: "Understanding blockchain intelligence and transaction tracing",
                    category: "Blockchain Intelligence",
                    image: "/Screenshot_2026-06-23_182954.png"
                  },
                  {
                    title: "Pig Butchering Scams: What You Need to Know",
                    excerpt: "Protecting yourself from romance and investment fraud",
                    category: "Scam Alerts",
                    image: "/Screenshot_2026-06-23_183337.png"
                  }
                ].map((article, index) => (
                  <Card key={index} className="hover:shadow-xl transition-shadow overflow-hidden">
                    <div className="relative h-48 bg-muted">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <Badge variant="outline" className="w-fit mb-2">
                        {article.category}
                      </Badge>
                      <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="link" className="px-0">
                        <Link href="/blog">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}