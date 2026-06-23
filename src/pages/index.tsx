import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { Shield, Search, FileText, Globe, Lock, CheckCircle, ArrowRight, AlertTriangle, Heart, TrendingUp, Coins, DollarSign, Users, Star, Quote } from "lucide-react";

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