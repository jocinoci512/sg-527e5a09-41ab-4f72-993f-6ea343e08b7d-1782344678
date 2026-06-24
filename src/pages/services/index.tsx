import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Shield, Search, TrendingUp, Heart, DollarSign, Image, Globe, ArrowRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Shield,
      title: "Cryptocurrency Fraud Investigation",
      description: "Expert blockchain forensic analysis and cryptocurrency transaction tracing across 15+ networks to identify perpetrators and trace stolen funds.",
      href: "/services/crypto-fraud"
    },
    {
      icon: Search,
      title: "Blockchain Transaction Tracing",
      description: "Advanced on-chain analysis following cryptocurrency movements through exchanges, mixers, and complex transaction patterns.",
      href: "/services/blockchain-tracing"
    },
    {
      icon: DollarSign,
      title: "Digital Asset Recovery Consultation",
      description: "Strategic guidance and professional consultation supporting recovery efforts for stolen cryptocurrency and digital assets.",
      href: "/services/asset-recovery"
    },
    {
      icon: TrendingUp,
      title: "Investment Scam Investigation",
      description: "Comprehensive investigation of fake investment platforms, Ponzi schemes, and fraudulent trading operations.",
      href: "/services/investment-scams"
    },
    {
      icon: Heart,
      title: "Romance Scam Investigation",
      description: "Investigation of romance fraud involving cryptocurrency theft and financial manipulation through dating platforms.",
      href: "/services/romance-scams"
    },
    {
      icon: Globe,
      title: "Forex Scam Investigation",
      description: "Analysis of fraudulent forex brokers, fake trading platforms, and foreign exchange investment scams.",
      href: "/services/forex-scams"
    },
    {
      icon: Image,
      title: "NFT Scam Investigation",
      description: "Investigation of NFT fraud including rug pulls, counterfeit collections, and marketplace scams.",
      href: "/services/nft-scams"
    },
    {
      icon: Shield,
      title: "Wire Fraud Investigation",
      description: "Investigation of wire transfer fraud, business email compromise, and banking scams.",
      href: "/services/wire-fraud"
    }
  ];

  return (
    <Layout>
      <SEO 
        title="Fraud Investigation Services - Blockchain Tracing & Digital Asset Recovery | Cipher Trace"
        description="Professional fraud investigation, blockchain intelligence, and recovery consultation services. Expert cryptocurrency tracing, scam investigation, and forensic analysis."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              Professional Investigation Services
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Expert fraud investigation, blockchain intelligence, and recovery consultation services for victims, businesses, and legal professionals worldwide.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
                <Link href="/case-review">
                  Start Free Case Review
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
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
              Comprehensive investigation capabilities across all fraud types
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} className="border-2 group hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="font-heading text-center">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={service.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading mb-6">
              Why Choose Cipher Trace?
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-12">
              <Card className="border-2 text-left">
                <CardHeader>
                  <CardTitle className="font-heading">Expert Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Certified cybersecurity professionals and financial crime investigators with years of experience in blockchain forensics and fraud investigation.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 text-left">
                <CardHeader>
                  <CardTitle className="font-heading">Advanced Technology</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Industry-leading blockchain analysis tools and proprietary investigation methodologies for comprehensive fraud tracing.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 text-left">
                <CardHeader>
                  <CardTitle className="font-heading">Global Reach</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    International case support across 50+ countries with coordination capabilities for cross-border investigations.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 text-left">
                <CardHeader>
                  <CardTitle className="font-heading">Confidential</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Enterprise-grade security protocols protecting client information throughout the investigation process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading mb-6">
            Get Started Today
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Submit a free case review and our team will assess your situation and provide initial guidance within 24-48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
              <Link href="/case-review">
                Start Free Case Review
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 text-white border-white/20 hover:bg-white/20 font-semibold">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}