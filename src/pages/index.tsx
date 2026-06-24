import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { Shield, Search, FileText, Globe, Lock, CheckCircle, ArrowRight, AlertTriangle, Heart, TrendingUp, Coins, DollarSign, Users, Star, Quote, BarChart3, Target, Award, Clock } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export default function Home() {
  const services = [
    {
      icon: Shield,
      title: "Cryptocurrency Fraud Investigation",
      description: "Expert analysis of crypto scams, fake exchanges, and digital asset theft with blockchain forensics.",
      href: "/services/crypto-fraud"
    },
    {
      icon: Search,
      title: "Blockchain Transaction Tracing",
      description: "Advanced on-chain analysis to track and identify fraudulent cryptocurrency transactions.",
      href: "/services/blockchain-tracing"
    },
    {
      icon: FileText,
      title: "Digital Asset Recovery Consultation",
      description: "Strategic guidance and professional support for recovering stolen or fraudulently obtained assets.",
      href: "/services/asset-recovery"
    },
    {
      icon: Globe,
      title: "Investment Scam Investigation",
      description: "Comprehensive investigation of fake investment platforms, Ponzi schemes, and financial fraud.",
      href: "/services/investment-scams"
    }
  ];

  const scamTypes = [
    {
      icon: Coins,
      title: "Cryptocurrency Scams",
      description: "Fake exchanges, pump-and-dump schemes, rug pulls, and crypto theft",
      href: "/scams/cryptocurrency",
      color: "text-orange-600"
    },
    {
      icon: TrendingUp,
      title: "Investment Scams",
      description: "Ponzi schemes, fake trading platforms, and fraudulent investment opportunities",
      href: "/scams/investment",
      color: "text-blue-600"
    },
    {
      icon: Heart,
      title: "Romance Scams",
      description: "Online dating fraud, fake profiles, and relationship-based financial manipulation",
      href: "/scams/romance",
      color: "text-pink-600"
    },
    {
      icon: DollarSign,
      title: "Forex Scams",
      description: "Fake forex brokers, signal scams, and currency trading fraud",
      href: "/scams/forex",
      color: "text-green-600"
    },
    {
      icon: Users,
      title: "Pig Butchering Scams",
      description: "Long-term relationship fraud leading to fake investment platforms",
      href: "/scams/pig-butchering",
      color: "text-purple-600"
    },
    {
      icon: AlertTriangle,
      title: "NFT Scams",
      description: "Fake NFT projects, phishing attacks, and digital art fraud",
      href: "/scams/nft",
      color: "text-indigo-600"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Case Review",
      description: "Submit your case details for a thorough initial assessment by our investigation team."
    },
    {
      step: "02",
      title: "Evidence Analysis",
      description: "Our experts analyze all provided documentation, communications, and transaction records."
    },
    {
      step: "03",
      title: "Blockchain Tracing",
      description: "Advanced on-chain forensics to trace cryptocurrency movements and identify endpoints."
    },
    {
      step: "04",
      title: "Intelligence Gathering",
      description: "Cross-reference findings with global fraud databases and intelligence networks."
    },
    {
      step: "05",
      title: "Recovery Consultation",
      description: "Receive a comprehensive report with actionable recommendations for recovery efforts."
    }
  ];

  const reasons = [
    {
      icon: CheckCircle,
      title: "Experienced Investigators",
      description: "Certified professionals with extensive backgrounds in cybersecurity and financial crime."
    },
    {
      icon: CheckCircle,
      title: "Blockchain Intelligence",
      description: "Cutting-edge forensic tools and methodologies for cryptocurrency tracing."
    },
    {
      icon: CheckCircle,
      title: "Global Case Support",
      description: "We handle international fraud cases across multiple jurisdictions."
    },
    {
      icon: CheckCircle,
      title: "Confidential Handling",
      description: "Your case information is protected with enterprise-grade security protocols."
    }
  ];

  const successStories = [
    {
      title: "Cryptocurrency Investment Scam Recovery",
      amount: "$420,000",
      description: "Traced stolen Bitcoin through multiple exchanges and assisted law enforcement in identifying perpetrators. Client received partial recovery through legal proceedings.",
      outcome: "Partial Recovery Achieved"
    },
    {
      title: "Romance Scam Investigation",
      amount: "$85,000",
      description: "Comprehensive investigation uncovered international fraud network. Evidence provided to authorities led to arrests and ongoing recovery efforts.",
      outcome: "Criminal Charges Filed"
    },
    {
      title: "Forex Trading Platform Fraud",
      amount: "$250,000",
      description: "Blockchain forensics revealed fake trading platform's infrastructure. Investigation report used in civil litigation and regulatory complaints.",
      outcome: "Legal Action Initiated"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      location: "United States",
      text: "Cipher Trace provided professional, thorough investigation services when I lost funds to a crypto scam. Their detailed report gave me the evidence I needed to pursue legal action.",
      rating: 5
    },
    {
      name: "David K.",
      location: "United Kingdom",
      text: "The team's expertise in blockchain analysis was impressive. They traced my stolen cryptocurrency and provided clear documentation for law enforcement.",
      rating: 5
    },
    {
      name: "Maria L.",
      location: "Australia",
      text: "Professional, compassionate, and knowledgeable. They helped me understand what happened and provided a path forward after losing money to an investment scam.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Can you guarantee recovery of my lost funds?",
      answer: "No. While we provide expert investigation and recovery consultation services, we cannot guarantee recovery outcomes. Success depends on many factors including available evidence, jurisdiction, blockchain activity, and third-party cooperation. We focus on providing comprehensive investigation reports that can support legal and recovery efforts."
    },
    {
      question: "How long does an investigation take?",
      answer: "Investigation timelines vary based on case complexity. Initial case reviews typically take 3-5 business days. Comprehensive blockchain tracing and intelligence gathering can take 2-4 weeks. We provide regular updates throughout the investigation process."
    },
    {
      question: "What information do I need to provide?",
      answer: "We need transaction records, wallet addresses, communication logs with scammers, screenshots, website URLs, and any other relevant documentation. The more detailed information you provide, the more thorough our investigation can be."
    },
    {
      question: "Do you work with law enforcement?",
      answer: "Yes. We frequently provide investigation reports and evidence packages to law enforcement agencies. Our reports are formatted to meet professional standards and can support criminal investigations and legal proceedings."
    },
    {
      question: "What are your fees?",
      answer: "Our fees vary based on case complexity and required investigation scope. We provide transparent pricing after the initial case review. Contact us for a free consultation to discuss your specific situation."
    },
    {
      question: "Is my information kept confidential?",
      answer: "Absolutely. We maintain strict confidentiality protocols and use enterprise-grade security measures to protect client information. Your case details are only shared with authorized personnel and law enforcement when necessary."
    }
  ];

  const blogPosts = [
    {
      title: "How to Identify Cryptocurrency Investment Scams: 10 Warning Signs",
      category: "Fraud Prevention",
      date: "June 15, 2026",
      excerpt: "Learn the red flags that indicate a crypto investment opportunity might be a scam. Protect yourself from common tactics used by fraudsters.",
      href: "/blog/identify-crypto-scams"
    },
    {
      title: "Blockchain Forensics: How We Trace Stolen Cryptocurrency",
      category: "Blockchain Intelligence",
      date: "June 10, 2026",
      excerpt: "A behind-the-scenes look at the tools and techniques used in professional blockchain transaction tracing and cryptocurrency investigation.",
      href: "/blog/blockchain-forensics-explained"
    },
    {
      title: "Romance Scams and Crypto: A Growing Threat",
      category: "Scam Alerts",
      date: "June 5, 2026",
      excerpt: "Romance scammers increasingly use cryptocurrency to steal from victims. Learn how these scams work and how to protect yourself.",
      href: "/blog/romance-scams-crypto"
    }
  ];

  const globalStats = [
    {
      icon: FileText,
      value: 2847,
      label: "Cases Reviewed",
      suffix: "+",
      color: "text-blue-600"
    },
    {
      icon: Globe,
      value: 127,
      label: "Countries Served",
      suffix: "",
      color: "text-green-600"
    },
    {
      icon: TrendingUp,
      value: 456,
      label: "Active Investigations",
      suffix: "+",
      color: "text-orange-600"
    },
    {
      icon: Award,
      value: 98,
      label: "Client Satisfaction",
      suffix: "%",
      color: "text-purple-600"
    },
    {
      icon: BarChart3,
      value: 12500,
      label: "Blockchain Transactions Traced",
      suffix: "+",
      color: "text-indigo-600"
    },
    {
      icon: Users,
      value: 3200,
      label: "Victims Assisted",
      suffix: "+",
      color: "text-pink-600"
    },
    {
      icon: DollarSign,
      value: 85,
      label: "Funds Identified",
      suffix: "M+",
      prefix: "$",
      color: "text-emerald-600"
    },
    {
      icon: Target,
      value: 94,
      label: "Investigation Success Rate",
      suffix: "%",
      color: "text-cyan-600"
    }
  ];

  const liveUpdates = [
    {
      type: "investigation",
      message: "New cryptocurrency fraud investigation opened",
      location: "United States",
      time: "2 minutes ago",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      type: "tracing",
      message: "Blockchain tracing completed for $420K case",
      location: "United Kingdom",
      time: "15 minutes ago",
      icon: Search,
      color: "text-green-600"
    },
    {
      type: "completed",
      message: "Investment fraud investigation completed",
      location: "Australia",
      time: "1 hour ago",
      icon: CheckCircle,
      color: "text-emerald-600"
    },
    {
      type: "network",
      message: "International scam network identified",
      location: "Multiple Countries",
      time: "3 hours ago",
      icon: Globe,
      color: "text-purple-600"
    },
    {
      type: "consultation",
      message: "Recovery consultation scheduled",
      location: "Canada",
      time: "4 hours ago",
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  const globalRegions = [
    {
      region: "North America",
      countries: "USA, Canada, Mexico",
      investigations: "1,240+",
      support: "24/7 Available",
      icon: Globe
    },
    {
      region: "Europe",
      countries: "UK, Germany, France, Spain",
      investigations: "850+",
      support: "24/7 Available",
      icon: Globe
    },
    {
      region: "Asia-Pacific",
      countries: "Australia, Singapore, Japan, India",
      investigations: "620+",
      support: "24/7 Available",
      icon: Globe
    },
    {
      region: "Latin America",
      countries: "Brazil, Argentina, Chile",
      investigations: "180+",
      support: "24/7 Available",
      icon: Globe
    },
    {
      region: "Middle East",
      countries: "UAE, Saudi Arabia, Israel",
      investigations: "145+",
      support: "24/7 Available",
      icon: Globe
    },
    {
      region: "Africa",
      countries: "South Africa, Nigeria, Kenya",
      investigations: "95+",
      support: "24/7 Available",
      icon: Globe
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

  const fraudCategories = [
    {
      category: "Cryptocurrency Fraud",
      cases: 847,
      successRate: 92,
      trend: "+15%",
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20"
    },
    {
      category: "Investment Fraud",
      cases: 623,
      successRate: 89,
      trend: "+22%",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      category: "Romance Scams",
      cases: 456,
      successRate: 87,
      trend: "+18%",
      color: "text-pink-600",
      bgColor: "bg-pink-100 dark:bg-pink-900/20"
    },
    {
      category: "Forex Scams",
      cases: 389,
      successRate: 91,
      trend: "+12%",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      category: "NFT Scams",
      cases: 234,
      successRate: 85,
      trend: "+28%",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/20"
    },
    {
      category: "Wire Fraud",
      cases: 298,
      successRate: 88,
      trend: "+9%",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
    }
  ];

  const dashboardMetrics = [
    {
      label: "Active Cases",
      value: 456,
      change: "+12%",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      label: "Investigations Completed",
      value: 2847,
      change: "+8%",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      label: "Victims Assisted",
      value: 3200,
      change: "+15%",
      icon: Users,
      color: "text-purple-600"
    },
    {
      label: "Countries Supported",
      value: 127,
      change: "+3",
      icon: Globe,
      color: "text-orange-600"
    },
    {
      label: "Blockchain Transactions Analyzed",
      value: 12500,
      change: "+22%",
      icon: Search,
      color: "text-indigo-600"
    },
    {
      label: "Scam Networks Identified",
      value: 89,
      change: "+18%",
      icon: Target,
      color: "text-pink-600"
    }
  ];

  return (
    <Layout>
      <SEO 
        title="Cipher Trace - Professional Fraud Investigation & Blockchain Intelligence"
        description="Expert cryptocurrency scam investigation, blockchain tracing, and digital asset recovery consultation. Helping victims fight back against financial fraud worldwide."
      />

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

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Success Stories
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Professional case examples demonstrating our investigation capabilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {successStories.map((story, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-primary">{story.amount}</span>
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-heading">{story.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{story.description}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <CheckCircle className="h-4 w-4" />
                    {story.outcome}
                  </div>
                </CardContent>
              </Card>
            ))}
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

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Professional testimonials from fraud investigation clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 italic">&quot;{testimonial.text}&quot;</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
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