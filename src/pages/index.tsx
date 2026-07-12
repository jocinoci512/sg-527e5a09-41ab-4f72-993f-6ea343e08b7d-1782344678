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
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-8">
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
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-2xl">
                  <Link href="/case-review">
                    <Shield className="mr-2 h-5 w-5" />
                    Start Free Case Review
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6">
                  <Link href="/contact">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Speak With An Expert
                  </Link>
                </Button>
              </div>

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

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronRight className="h-8 w-8 text-white/60 rotate-90" />
          </div>
        </section>

        {/* About Section */}
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
                  Cipher Trace is a leading fraud investigation and blockchain intelligence firm specializing in cryptocurrency scams, digital asset tracing, and recovery consultation services.
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
                        Our team consists of certified fraud examiners, blockchain analysts, and cybersecurity professionals with decades of combined experience.
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
                        We serve clients worldwide, working with international law enforcement, financial institutions, and legal professionals across multiple jurisdictions.
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
                        All investigations are conducted with the highest level of confidentiality and security, protecting client privacy at every step.
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

        {/* Services Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">
                  <Target className="mr-2 h-4 w-4" />
                  Our Services
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                  Comprehensive Fraud Investigation Services
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  From cryptocurrency scams to complex fraud schemes, we provide expert investigation and recovery consultation services.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Shield,
                    title: "Cryptocurrency Fraud Investigation",
                    description: "Expert investigation of Bitcoin, Ethereum, and altcoin scams with blockchain tracing",
                    link: "/services/crypto-fraud"
                  },
                  {
                    icon: Search,
                    title: "Blockchain Transaction Tracing",
                    description: "Advanced on-chain analysis to track stolen digital assets across multiple blockchains",
                    link: "/services"
                  },
                  {
                    icon: Target,
                    title: "Digital Asset Recovery Consultation",
                    description: "Professional guidance on recovery options and legal pathways for fraud victims",
                    link: "/services"
                  },
                  {
                    icon: Lock,
                    title: "Romance Scam Investigation",
                    description: "Specialized investigation of dating fraud and pig butchering schemes",
                    link: "/scams/pig-butchering"
                  },
                  {
                    icon: BarChart3,
                    title: "Investment Fraud Analysis",
                    description: "Thorough investigation of fake trading platforms and Ponzi schemes",
                    link: "/services"
                  },
                  {
                    icon: Globe,
                    title: "International Fraud Cases",
                    description: "Cross-border investigation support with law enforcement coordination",
                    link: "/services"
                  }
                ].map((service, index) => (
                  <Card key={index} className="hover:shadow-xl transition-shadow border-2 hover:border-primary/50">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="link" className="px-0">
                        <Link href={service.link}>
                          Learn More
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

        {/* Investigation Process Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">
                  <FileCheck className="mr-2 h-4 w-4" />
                  Our Process
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                  Professional Investigation Process
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  A systematic approach to fraud investigation and digital asset tracing
                </p>
              </div>

              <div className="grid md:grid-cols-5 gap-6">
                {[
                  { number: "01", title: "Case Review", description: "Free initial consultation and case evaluation", icon: FileCheck },
                  { number: "02", title: "Evidence Analysis", description: "Comprehensive review of transaction records and documentation", icon: Search },
                  { number: "03", title: "Blockchain Tracing", description: "Advanced on-chain investigation and tracking", icon: Target },
                  { number: "04", title: "Intelligence Gathering", description: "OSINT and digital forensics investigation", icon: Zap },
                  { number: "05", title: "Recovery Consultation", description: "Strategic guidance and legal pathway options", icon: CheckCircle }
                ].map((step) => (
                  <Card key={step.number} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        {step.number}
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {step.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">
                  <Award className="mr-2 h-4 w-4" />
                  Why Choose Cipher Trace
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                  Trusted by Fraud Victims Worldwide
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { icon: Shield, title: "Experienced Investigators", description: "Certified fraud examiners with decades of combined experience in financial crime investigation" },
                  { icon: Globe, title: "Global Case Support", description: "International reach with law enforcement and legal professional partnerships worldwide" },
                  { icon: Lock, title: "Confidential Handling", description: "Strict confidentiality protocols protecting client privacy and sensitive case information" },
                  { icon: FileCheck, title: "Professional Reporting", description: "Detailed investigation reports suitable for legal proceedings and law enforcement" },
                  { icon: Clock, title: "Rapid Response", description: "Quick case initiation and timeline-conscious investigation approach" },
                  { icon: Users, title: "Victim-Focused Approach", description: "Compassionate support throughout the investigation process with clear communication" }
                ].map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="mb-2">{feature.title}</CardTitle>
                          <CardDescription className="text-base">
                            {feature.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Scam Types Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">
                  <Shield className="mr-2 h-4 w-4" />
                  Scam Types We Investigate
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                  Common Financial Fraud Schemes
                </h2>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  "Cryptocurrency Scams",
                  "Investment Fraud",
                  "Romance Scams",
                  "Forex Scams",
                  "Pig Butchering Schemes",
                  "NFT Fraud",
                  "Fake Trading Platforms",
                  "Wire Fraud",
                  "Banking Fraud",
                  "Social Media Scams",
                  "Marketplace Fraud",
                  "Digital Asset Theft"
                ].map((scam, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow hover:border-primary/50 border-2">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <p className="font-medium">{scam}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button asChild size="lg">
                  <Link href="/scams">
                    View All Scam Types
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
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

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Frequently Asked Questions
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                  Common Questions About Our Services
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    What types of cryptocurrency scams do you investigate?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We investigate all types of cryptocurrency fraud including Bitcoin scams, investment fraud, romance scams (pig butchering), NFT scams, fake trading platforms, ICO fraud, and digital asset theft.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    How does blockchain tracing work?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Blockchain tracing involves analyzing on-chain transactions to track the movement of stolen or fraudulent digital assets across multiple wallets and exchanges, providing evidence for recovery efforts and legal proceedings.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    Can you guarantee recovery of my stolen cryptocurrency?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    No. Cipher Trace provides fraud investigation, blockchain tracing, intelligence gathering, scam analysis, and recovery consultation services. Recovery outcomes cannot be guaranteed and vary depending on available evidence, jurisdiction, blockchain activity, third-party cooperation, and individual case circumstances.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    How long does an investigation typically take?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Investigation timelines vary based on case complexity, blockchain activity, and evidence availability. Simple cases may conclude in weeks, while complex international fraud schemes can take several months.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    Do you work with law enforcement?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, we work closely with law enforcement agencies worldwide, providing professional investigation reports and blockchain intelligence suitable for legal proceedings and criminal investigations.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="text-center mt-12">
                <Button asChild size="lg">
                  <Link href="/faq">
                    View All FAQs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold font-heading">
                Start Your Free Case Review Today
              </h2>
              <p className="text-xl text-white/90">
                Contact our expert investigation team for a confidential consultation about your fraud case
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
                  <Link href="/case-review">
                    <Shield className="mr-2 h-5 w-5" />
                    Start Free Case Review
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6">
                  <Link href="/contact">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Contact Us
                  </Link>
                </Button>
              </div>
              <div className="pt-8 text-sm text-white/70">
                <p>
                  Email: Support@cipherstraces.com | Phone: +1 (646) 244-0064
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}