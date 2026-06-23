import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Shield, Search, FileText, Globe, Lock, CheckCircle, ArrowRight } from "lucide-react";

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
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Helping Victims Fight Back Against Financial Fraud
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Professional blockchain tracing, scam investigations, fraud intelligence, and recovery consultation services.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8 py-6">
                <Link href="/case-review">
                  Start Free Case Review
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
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
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
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
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
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
                  <CardTitle className="text-lg">{service.title}</CardTitle>
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
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
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
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose Cipher Trace
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Trusted by victims, businesses, and law enforcement agencies worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50">
                <reason.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            Ready to Start Your Case Review?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Get a free initial assessment from our expert fraud investigation team. We are here to help you understand your options and take the first step toward justice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/case-review">
                Start Free Case Review
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
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