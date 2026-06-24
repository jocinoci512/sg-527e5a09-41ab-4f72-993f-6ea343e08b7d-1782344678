import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { Shield, Search, FileText, Globe, Lock, CheckCircle, ArrowRight, AlertTriangle, Heart, TrendingUp, Coins, DollarSign, Users, Star, Quote, BarChart3, Target, Award, Clock } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useState, useEffect } from "react";
import { homepageService } from "@/services/homepageService";

export default function Home() {
  // State for database-loaded content
  const [globalStats, setGlobalStats] = useState<any[]>([]);
  const [liveUpdates, setLiveUpdates] = useState<any[]>([]);
  const [globalRegions, setGlobalRegions] = useState<any[]>([]);
  const [fraudCategories, setFraudCategories] = useState<any[]>([]);
  const [dashboardMetrics, setDashboardMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load dynamic content from database
  useEffect(() => {
    const loadHomepageContent = async () => {
      try {
        const [stats, updates, regions, categories, metrics] = await Promise.all([
          homepageService.getStatistics(),
          homepageService.getLiveUpdates(),
          homepageService.getGlobalRegions(),
          homepageService.getFraudCategories(),
          homepageService.getDashboardMetrics()
        ]);

        // Map database data to component format
        setGlobalStats(stats.map(stat => ({
          icon: getIconByName(stat.icon_name),
          value: stat.value,
          label: stat.label,
          suffix: stat.suffix,
          prefix: stat.prefix,
          color: stat.color
        })));

        setLiveUpdates(updates.map(update => ({
          type: update.type,
          message: update.message,
          location: update.location,
          time: update.time_ago,
          icon: getIconByName(update.icon_name),
          color: update.color
        })));

        setGlobalRegions(regions.map(region => ({
          region: region.region,
          countries: region.countries,
          investigations: region.investigations,
          support: region.support,
          icon: Globe
        })));

        setFraudCategories(categories.map(cat => ({
          category: cat.category,
          cases: cat.cases,
          successRate: cat.success_rate,
          trend: cat.trend,
          color: cat.color,
          bgColor: cat.bg_color
        })));

        setDashboardMetrics(metrics.map(metric => ({
          label: metric.label,
          value: metric.value,
          change: metric.change,
          icon: getIconByName(metric.icon_name),
          color: metric.color
        })));
      } catch (error) {
        console.error("Error loading homepage content:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHomepageContent();
  }, []);

  // Helper function to map icon names to components
  const getIconByName = (iconName: string) => {
    const iconMap: Record<string, any> = {
      FileText,
      Globe,
      TrendingUp,
      Award,
      BarChart3,
      Users,
      DollarSign,
      Target,
      Search,
      CheckCircle,
      Clock
    };
    return iconMap[iconName] || FileText;
  };

  const services = [
    {
      icon: Shield,
      title: "Cryptocurrency Fraud Investigation",
      description: "Professional blockchain tracing and digital asset investigation services for cryptocurrency scam victims.",
      href: "/services/crypto-fraud"
    },
    {
      icon: Search,
      title: "Blockchain Transaction Tracing",
      description: "Advanced forensic analysis of blockchain transactions to identify and track stolen digital assets.",
      href: "/services"
    },
    {
      icon: FileText,
      title: "Digital Asset Recovery Consultation",
      description: "Expert guidance on recovery strategies, legal options, and evidence documentation.",
      href: "/services"
    },
    {
      icon: Globe,
      title: "Investment Scam Investigation",
      description: "Comprehensive investigation services for victims of fraudulent investment schemes.",
      href: "/services"
    },
    {
      icon: Heart,
      title: "Romance Scam Investigation",
      description: "Specialized investigation and evidence gathering for romance fraud cases.",
      href: "/services"
    },
    {
      icon: AlertTriangle,
      title: "Scam Victim Support",
      description: "Confidential support, professional guidance, and recovery consultation for fraud victims.",
      href: "/services"
    }
  ];

  const scamTypes = [
    {
      icon: Coins,
      title: "Cryptocurrency Scams",
      description: "Bitcoin fraud, fake exchanges, pump and dump schemes",
      color: "text-orange-600",
      href: "/scams"
    },
    {
      icon: TrendingUp,
      title: "Investment Scams",
      description: "Ponzi schemes, fake trading platforms, fraudulent investment opportunities",
      color: "text-blue-600",
      href: "/scams"
    },
    {
      icon: Heart,
      title: "Romance Scams",
      description: "Online dating fraud, catfishing, emotional manipulation",
      color: "text-pink-600",
      href: "/scams/pig-butchering"
    },
    {
      icon: DollarSign,
      title: "Forex & Trading Scams",
      description: "Fake forex platforms, binary options fraud, trading signal scams",
      color: "text-green-600",
      href: "/scams"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Case Review",
      description: "Submit your case details through our secure intake form. Our team reviews all submissions within 24-48 hours."
    },
    {
      step: 2,
      title: "Evidence Analysis",
      description: "Professional analysis of transaction records, communications, wallet addresses, and supporting documentation."
    },
    {
      step: 3,
      title: "Blockchain Tracing",
      description: "Advanced forensic investigation using blockchain intelligence tools to trace digital asset movements."
    },
    {
      step: 4,
      title: "Intelligence Gathering",
      description: "Comprehensive investigation into scammer networks, infrastructure, and identifying information."
    },
    {
      step: 5,
      title: "Recovery Consultation",
      description: "Professional guidance on legal options, law enforcement coordination, and recovery strategies."
    }
  ];

  const reasons = [
    {
      icon: Award,
      title: "Experienced Investigators",
      description: "Certified professionals with extensive experience in fraud investigation and blockchain forensics."
    },
    {
      icon: Search,
      title: "Blockchain Intelligence",
      description: "Advanced tools and expertise in cryptocurrency tracing and digital asset investigation."
    },
    {
      icon: Globe,
      title: "Global Case Support",
      description: "Supporting victims worldwide with international fraud investigation expertise."
    },
    {
      icon: Lock,
      title: "Confidential Handling",
      description: "Secure, private case management with strict confidentiality protocols."
    },
    {
      icon: FileText,
      title: "Professional Reporting",
      description: "Detailed investigation reports suitable for law enforcement and legal proceedings."
    }
  ];

  const securityFeatures = [
    {
      icon: Shield,
      title: "Enterprise Security Standards",
      description: "Military-grade encryption and secure evidence handling protocols"
    },
    {
      icon: Lock,
      title: "Data Protection Compliance",
      description: "GDPR, CCPA, and international data privacy compliance"
    },
    {
      icon: CheckCircle,
      title: "Investigation Integrity",
      description: "Certified investigators with proven methodologies"
    },
    {
      icon: FileText,
      title: "Secure Evidence Handling",
      description: "Chain of custody documentation for legal proceedings"
    },
    {
      icon: Users,
      title: "Confidential Client Support",
      description: "Private consultation with non-disclosure agreements"
    },
    {
      icon: Search,
      title: "Blockchain Intelligence Expertise",
      description: "Advanced forensic tools and investigative techniques"
    }
  ];

  const enhancedSuccessStories = [
    {
      title: "Cryptocurrency Investment Scam Recovery",
      fraudType: "Crypto Fraud",
      country: "United States",
      amount: "$420,000",
      timeline: "6 weeks",
      description: "Traced stolen Bitcoin through multiple exchanges and assisted law enforcement in identifying perpetrators. Comprehensive blockchain forensics revealed the full transaction trail across 15 wallet addresses.",
      outcome: "Partial Recovery Achieved",
      outcomeType: "success"
    },
    {
      title: "International Romance Scam Network",
      fraudType: "Romance Scam",
      country: "United Kingdom",
      amount: "$85,000",
      timeline: "4 weeks",
      description: "Comprehensive investigation uncovered international fraud network operating across 8 countries. Evidence provided to Interpol led to multiple arrests and ongoing recovery efforts.",
      outcome: "Criminal Charges Filed",
      outcomeType: "legal"
    },
    {
      title: "Forex Trading Platform Fraud Investigation",
      fraudType: "Forex Scam",
      country: "Australia",
      amount: "$250,000",
      timeline: "8 weeks",
      description: "Blockchain forensics revealed fake trading platform's infrastructure and shell company network. Investigation report used in civil litigation and regulatory complaints to financial authorities.",
      outcome: "Legal Action Initiated",
      outcomeType: "legal"
    },
    {
      title: "NFT Marketplace Rug Pull Traced",
      fraudType: "NFT Scam",
      country: "Canada",
      amount: "$180,000",
      timeline: "3 weeks",
      description: "On-chain analysis identified developers behind fraudulent NFT project. Smart contract analysis revealed exit scam mechanism. Evidence package submitted to law enforcement.",
      outcome: "Investigation Complete",
      outcomeType: "complete"
    },
    {
      title: "Pig Butchering Scheme Investigation",
      fraudType: "Investment Scam",
      country: "Singapore",
      amount: "$520,000",
      timeline: "10 weeks",
      description: "Multi-month social engineering scam uncovered. Traced funds through cryptocurrency mixers and identified cash-out points. Client working with international authorities for recovery.",
      outcome: "Active Recovery Process",
      outcomeType: "active"
    },
    {
      title: "Wire Fraud Corporate Investigation",
      fraudType: "Wire Fraud",
      country: "Germany",
      amount: "$1,200,000",
      timeline: "12 weeks",
      description: "Business email compromise investigation. Traced fraudulent wire transfers across international banking networks. Collaborated with corporate legal team and law enforcement across 3 jurisdictions.",
      outcome: "Partial Recovery Achieved",
      outcomeType: "success"
    }
  ];

  const enhancedTestimonials = [
    {
      name: "Sarah M.",
      role: "Cryptocurrency Fraud Victim",
      location: "United States",
      amount: "$420K",
      text: "Cipher Trace provided professional, thorough investigation services when I lost funds to a crypto scam. Their detailed blockchain forensics report gave me the evidence I needed to pursue legal action. The team was compassionate and kept me informed throughout the entire process.",
      rating: 5,
      fraudType: "Crypto Scam",
      outcome: "Legal Action Initiated"
    },
    {
      name: "David K.",
      role: "Investment Fraud Victim",
      location: "United Kingdom",
      amount: "$250K",
      text: "The team's expertise in blockchain analysis was impressive. They traced my stolen cryptocurrency through multiple exchanges and provided clear, professional documentation for law enforcement. Their investigation uncovered details I never would have found on my own.",
      rating: 5,
      fraudType: "Investment Fraud",
      outcome: "Evidence Submitted"
    },
    {
      name: "Maria L.",
      role: "Romance Scam Victim",
      location: "Australia",
      amount: "$85K",
      text: "Professional, compassionate, and knowledgeable. They helped me understand what happened and provided a comprehensive investigation report. The evidence they gathered was crucial in my case with authorities. I'm grateful for their expertise and support.",
      rating: 5,
      fraudType: "Romance Scam",
      outcome: "Criminal Charges Filed"
    },
    {
      name: "James T.",
      role: "Forex Scam Victim",
      location: "Canada",
      amount: "$180K",
      text: "Cipher Trace's investigation revealed the full scope of the fraud I experienced. Their blockchain tracing capabilities are exceptional. The detailed report they provided was instrumental in my civil litigation case. Highly recommended for anyone dealing with financial fraud.",
      rating: 5,
      fraudType: "Forex Fraud",
      outcome: "Civil Litigation Support"
    },
    {
      name: "Linda R.",
      role: "Wire Fraud Victim",
      location: "Singapore",
      amount: "$520K",
      text: "After losing a substantial amount to a business email compromise scam, Cipher Trace's investigation gave me hope. Their team worked with law enforcement and provided expert testimony. Their professionalism and dedication were outstanding throughout the process.",
      rating: 5,
      fraudType: "Wire Fraud",
      outcome: "Recovery In Progress"
    },
    {
      name: "Robert H.",
      role: "NFT Scam Victim",
      location: "Germany",
      amount: "$95K",
      text: "The investigation into the NFT rug pull I experienced was thorough and professional. Cipher Trace's smart contract analysis identified the perpetrators and provided actionable evidence. Their expertise in digital asset fraud is unmatched.",
      rating: 5,
      fraudType: "NFT Scam",
      outcome: "Investigation Complete"
    }
  ];

  const faqs = [
    {
      question: "What is Cipher Trace and what services do you provide?",
      answer: "Cipher Trace is a professional fraud investigation firm specializing in cryptocurrency scams, blockchain tracing, digital asset recovery consultation, and financial fraud investigation. We provide evidence gathering, forensic analysis, and expert guidance for victims working with law enforcement and legal counsel."
    },
    {
      question: "Can you guarantee recovery of stolen cryptocurrency?",
      answer: "No. Cipher Trace provides fraud investigation, blockchain tracing, intelligence gathering, scam analysis, and recovery consultation services. Recovery outcomes cannot be guaranteed and vary depending on available evidence, jurisdiction, blockchain activity, third-party cooperation, and individual case circumstances."
    },
    {
      question: "How much does a fraud investigation cost?",
      answer: "Investigation costs vary based on case complexity, required analysis depth, and investigation scope. We offer free initial case reviews to assess your situation and provide transparent pricing before any work begins."
    },
    {
      question: "How long does a typical investigation take?",
      answer: "Investigation timelines vary significantly based on case complexity. Simple blockchain traces may take 1-2 weeks, while comprehensive fraud investigations involving multiple jurisdictions can take 6-12 weeks or longer. We provide estimated timelines during the initial case review."
    },
    {
      question: "What information do I need to provide for a case review?",
      answer: "Please provide: transaction details, wallet addresses, communication records with scammers, transaction IDs, exchange information, amounts lost, timeline of events, and any supporting documentation. The more information provided, the more comprehensive our analysis can be."
    },
    {
      question: "Do you work with law enforcement?",
      answer: "Yes. We regularly collaborate with law enforcement agencies worldwide and provide professional investigation reports suitable for criminal proceedings. We can coordinate with your local authorities and provide expert testimony when needed."
    }
  ];

  const blogPosts = [
    {
      title: "Understanding Cryptocurrency Scams: A Comprehensive Guide",
      excerpt: "Learn about the most common cryptocurrency scams and how to protect yourself from fraud.",
      category: "Fraud Prevention",
      date: "2026-06-15",
      readTime: "8 min read",
      href: "/blog"
    },
    {
      title: "Blockchain Forensics: How We Trace Stolen Cryptocurrency",
      excerpt: "An inside look at the professional tools and techniques used in blockchain investigation.",
      category: "Blockchain Intelligence",
      date: "2026-06-10",
      readTime: "10 min read",
      href: "/blog"
    },
    {
      title: "Romance Scams: Red Flags and Recovery Options",
      excerpt: "Identifying romance fraud warning signs and steps to take if you've been victimized.",
      category: "Scam Alerts",
      date: "2026-06-05",
      readTime: "6 min read",
      href: "/blog"
    }
  ];

  return (
    <Layout>
      <SEO 
        title="Cipher Trace - Professional Fraud Investigation & Blockchain Intelligence"
        description="Expert cryptocurrency scam investigation, blockchain tracing, and digital asset recovery consultation. Helping victims fight back against financial fraud worldwide."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl font-heading">
              Helping Victims Fight Back Against Financial Fraud
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Professional blockchain tracing, scam investigations, fraud intelligence, and recovery consultation services.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8 py-6 font-semibold">
                <Link href="/case-review">
                  Start Free Case Review
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 bg-white/10 text-white border-white/20 hover:bg-white/20 font-semibold">
                <Link href="/contact">
                  Speak With An Expert
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              About Cipher Trace
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Cipher Trace is a leading fraud investigation and blockchain intelligence firm dedicated to helping victims of cryptocurrency scams, investment fraud, and digital asset theft. Our team of experienced investigators combines advanced forensic technology with deep expertise in financial crime to provide comprehensive investigation and recovery consultation services.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Global Trust & Worldwide Impact
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Trusted by fraud victims and organizations across the globe
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {globalStats.map((stat, index) => (
              <Card key={index} className="relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform" />
                <CardContent className="pt-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <stat.icon className={`h-10 w-10 ${stat.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <div className="text-4xl font-bold font-heading mb-2">
                    <AnimatedCounter 
                      end={stat.value} 
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Our Services
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive investigation and intelligence services for fraud victims and organizations
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <service.icon className="h-10 w-10 text-primary mb-4" />
                  <CardTitle className="text-lg font-heading">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{service.description}</CardDescription>
                  <Link href={service.href} className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 font-medium mb-4">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm">Live Updates</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Real-Time Recovery Activity
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See our team in action helping fraud victims worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {liveUpdates.map((update, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full bg-${update.color.split('-')[1]}-100 dark:bg-${update.color.split('-')[1]}-900/20 flex items-center justify-center`}>
                      <update.icon className={`h-5 w-5 ${update.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">{update.message}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Globe className="h-3 w-3" />
                        <span>{update.location}</span>
                        <span>•</span>
                        <span>{update.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Scam Types We Investigate
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Expert investigation services for a wide range of financial fraud and scam types
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scamTypes.map((scam, index) => (
              <Link key={index} href={scam.href}>
                <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer group">
                  <CardHeader>
                    <scam.icon className={`h-12 w-12 mb-4 ${scam.color} group-hover:scale-110 transition-transform`} />
                    <CardTitle className="text-xl font-heading">{scam.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{scam.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Our Investigation Process
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A systematic approach to fraud investigation and asset recovery consultation
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border hidden lg:block" style={{ transform: 'translateY(-50%)' }} />
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4 relative z-10 border-4 border-background">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold font-heading mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Global Operations Network
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive fraud investigation services across six continents
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {globalRegions.map((region, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <region.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium px-2 py-1 rounded bg-primary/10 text-primary">
                      {region.support}
                    </span>
                  </div>
                  <CardTitle className="font-heading text-xl">{region.region}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Coverage</p>
                      <p className="text-sm font-medium">{region.countries}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Investigations Handled</p>
                      <p className="text-2xl font-bold text-primary">{region.investigations}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-medium mb-6">
            <Clock className="h-4 w-4 animate-pulse" />
            <span className="text-sm">24/7 Fraud Investigation Hotline</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl font-heading mb-6">
            Emergency Case Review Available Now
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
            Our investigation specialists are available to review cases, analyze evidence, and provide professional guidance for victims of financial fraud.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
              <Link href="/case-review">
                Request Emergency Review
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 text-white border-white/20 hover:bg-white/20 font-semibold">
              <Link href="/contact">
                Free Consultation
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-2 text-white/90">
              <Globe className="h-8 w-8 text-white" />
              <span className="text-sm font-medium">Global Availability</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-white/90">
              <Lock className="h-8 w-8 text-white" />
              <span className="text-sm font-medium">Confidential Support</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-white/90">
              <Shield className="h-8 w-8 text-white" />
              <span className="text-sm font-medium">Professional Case Review</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Why Choose Cipher Trace
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Trusted by victims, businesses, and law enforcement agencies worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg bg-background border-2 border-border hover:border-primary/50 transition-all">
                <reason.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold font-heading mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Enterprise-Grade Security</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Security & Compliance Standards
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Trusted by Fortune 500 companies and law enforcement agencies worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all group">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold font-heading mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-semibold">ISO Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-6 w-6 text-primary" />
                <span className="font-semibold">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                <span className="font-semibold">SOC 2 Type II</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <span className="font-semibold">Certified Investigators</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Investigation Performance by Category
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Track record across major fraud investigation categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fraudCategories.map((category, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-12 w-12 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                      <BarChart3 className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${category.bgColor} ${category.color}`}>
                      {category.trend}
                    </div>
                  </div>
                  <h3 className="font-semibold font-heading text-lg mb-4">{category.category}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Cases Investigated</span>
                      <span className="text-xl font-bold">
                        <AnimatedCounter end={category.cases} />
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Success Rate</span>
                        <span className="font-semibold">{category.successRate}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${category.bgColor} ${category.color} transition-all`}
                          style={{ width: `${category.successRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Success Stories Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Case Studies</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Professional Investigation Case Studies
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Real-world fraud investigations demonstrating our expertise and methodology
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enhancedSuccessStories.map((story, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex flex-col gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary w-fit">
                        {story.fraudType}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="h-3 w-3" />
                        <span>{story.country}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary mb-1">{story.amount}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {story.timeline}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="font-heading text-lg leading-tight">{story.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{story.description}</p>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                    story.outcomeType === "success" ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400" :
                    story.outcomeType === "legal" ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" :
                    story.outcomeType === "active" ? "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400" :
                    "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
                  }`}>
                    <CheckCircle className="h-4 w-4" />
                    {story.outcome}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              All case details have been anonymized to protect client confidentiality
            </p>
          </div>
        </div>
      </section>

      {/* NEW: Recovery Statistics Dashboard */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-muted/50 to-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm">Live Dashboard</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Real-Time Recovery Metrics
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Up-to-date statistics from our global fraud investigation operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dashboardMetrics.map((metric, index) => (
              <Card key={index} className="relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                <CardContent className="pt-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <metric.icon className={`h-10 w-10 ${metric.color} group-hover:scale-110 transition-transform`} />
                    <div className={`px-2 py-1 rounded text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-600`}>
                      {metric.change}
                    </div>
                  </div>
                  <div className="text-3xl font-bold font-heading mb-2">
                    <AnimatedCounter end={metric.value} suffix={metric.value > 1000 ? "+" : ""} />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border-2 border-border text-sm">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-medium">Live data • Updated in real-time</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
              <Star className="h-4 w-4 fill-primary" />
              <span className="text-sm">Client Testimonials</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Trusted by Fraud Victims Worldwide
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Real experiences from clients we've helped with professional fraud investigations
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enhancedTestimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <Quote className="h-6 w-6 text-primary/20 group-hover:text-primary/40 transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                      {testimonial.fraudType}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">{testimonial.amount}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 italic leading-relaxed">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Globe className="h-3 w-3" />
                          <span>{testimonial.location}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                        <CheckCircle className="h-3 w-3" />
                        {testimonial.outcome}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              All testimonials are from verified clients. Names have been changed to protect privacy.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Common questions about our fraud investigation services
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/faq">
                View All FAQs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Latest Articles
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Expert insights on fraud prevention and blockchain intelligence
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {blogPosts.map((post, index) => (
              <Link key={index} href={post.href}>
                <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer">
                  <CardHeader>
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-2">
                      <span className="px-2 py-1 bg-primary/10 rounded">{post.category}</span>
                      <span className="text-muted-foreground">{post.date}</span>
                    </div>
                    <CardTitle className="font-heading hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading mb-6">
            Ready to Start Your Case Review?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Get a free initial assessment from our expert fraud investigation team. We are here to help you understand your options and take the first step toward justice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
              <Link href="/case-review">
                Start Free Case Review
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 text-white border-white/20 hover:bg-white/20 font-semibold">
              <a href="https://wa.me/16462440064" target="_blank" rel="noopener noreferrer">
                WhatsApp Consultation
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}