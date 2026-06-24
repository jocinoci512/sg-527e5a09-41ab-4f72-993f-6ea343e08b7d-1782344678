import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { Shield, Search, FileText, Scale, ArrowRight, CheckCircle } from "lucide-react";

export default function CryptoFraud() {
  const benefits = [
    "Expert blockchain forensic analysis across 15+ networks",
    "Professional investigation reports for law enforcement",
    "Transaction pattern analysis and fund flow tracing",
    "Perpetrator identification through digital footprints",
    "Recovery strategy consultation based on evidence",
    "Coordination with exchanges and regulatory authorities"
  ];

  const process = [
    {
      icon: FileText,
      title: "Case Submission",
      description: "Submit detailed information about the fraud incident including wallet addresses, transaction records, and communication evidence."
    },
    {
      icon: Search,
      title: "Forensic Analysis",
      description: "Our team performs comprehensive blockchain tracing, analyzing transaction patterns and identifying fund movements across networks."
    },
    {
      icon: Shield,
      title: "Evidence Collection",
      description: "We compile a thorough evidence package documenting the fraud trail, perpetrator identifiers, and blockchain forensics."
    },
    {
      icon: Scale,
      title: "Report & Consultation",
      description: "Receive a professional investigation report suitable for law enforcement submission plus strategic recovery guidance."
    }
  ];

  const faqs = [
    {
      question: "How long does a cryptocurrency fraud investigation take?",
      answer: "Investigation timelines vary based on case complexity, blockchain networks involved, and evidence availability. Initial analysis typically takes 3-5 business days, with comprehensive investigations completed within 2-3 weeks."
    },
    {
      question: "Can you trace cryptocurrency transactions across multiple blockchains?",
      answer: "Yes, our team has expertise in tracing transactions across 15+ blockchain networks including Bitcoin, Ethereum, Binance Smart Chain, Tron, and various altcoins. We use specialized forensic tools to follow fund flows even when converted between cryptocurrencies."
    },
    {
      question: "What information do I need to provide?",
      answer: "Provide wallet addresses involved, transaction hashes (TXIDs), communication records with the scammer, timestamps, amounts sent, and any documentation of the fraudulent scheme. The more evidence you provide, the more thorough our investigation can be."
    },
    {
      question: "Will my investigation report be accepted by law enforcement?",
      answer: "Our reports are prepared to professional forensic standards and formatted for law enforcement submission. While we cannot guarantee acceptance or action by authorities, our documentation meets investigative requirements and has been used in numerous cases worldwide."
    },
    {
      question: "What if the scammer used a mixing service or privacy coin?",
      answer: "While mixing services and privacy coins add complexity, our forensic techniques can often identify patterns, entry/exit points, and associated addresses. We analyze on-chain data, timing patterns, and cross-reference with known fraud databases to trace funds despite obfuscation attempts."
    }
  ];

  return (
    <Layout>
      <SEO 
        title="Cryptocurrency Fraud Investigation Services - Expert Blockchain Tracing | Cipher Trace"
        description="Professional cryptocurrency fraud investigation and blockchain forensic tracing services. Expert analysis across 15+ networks to trace stolen crypto and identify scammers."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              Cryptocurrency Fraud Investigation
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Expert blockchain forensic tracing and cryptocurrency scam investigation services. Trace stolen funds, identify perpetrators, and support recovery efforts.
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
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading mb-6">
              Service Overview
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Cryptocurrency fraud has become increasingly sophisticated, with scammers exploiting the pseudonymous nature of blockchain transactions to steal billions of dollars from victims worldwide. Our cryptocurrency fraud investigation service combines advanced blockchain forensics with professional investigative techniques to trace stolen funds and identify perpetrators.
              </p>
              <p>
                We analyze transaction patterns across multiple blockchain networks, identify wallet clusters, trace fund flows through exchanges and mixing services, and compile comprehensive evidence packages suitable for law enforcement submission and recovery efforts.
              </p>
              <p>
                Whether you've been victimized by an investment scam, fake exchange, rug pull, phishing attack, or romance scam involving cryptocurrency, our team has the expertise and tools to investigate the blockchain trail and support your pursuit of justice and recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Investigation Benefits
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive blockchain intelligence and professional fraud investigation
            </p>
          </div>
          
          <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-background border-2 border-border">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Investigation Process
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Systematic approach to cryptocurrency fraud investigation
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <Card key={index} className="border-2 text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-2xl">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex justify-center mb-3">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-heading text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Common questions about cryptocurrency fraud investigations
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Card className="border-2 bg-muted/30">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Related Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/blog/how-blockchain-tracing-works" className="block p-4 rounded-lg bg-background hover:bg-accent transition-colors">
                  <h3 className="font-semibold text-foreground mb-1">How Blockchain Tracing Works: A Technical Guide</h3>
                  <p className="text-sm text-muted-foreground">Understanding the forensic techniques used to trace cryptocurrency transactions.</p>
                </Link>
                <Link href="/blog/common-crypto-scams" className="block p-4 rounded-lg bg-background hover:bg-accent transition-colors">
                  <h3 className="font-semibold text-foreground mb-1">10 Most Common Cryptocurrency Scams in 2026</h3>
                  <p className="text-sm text-muted-foreground">Learn about prevalent fraud schemes targeting crypto investors.</p>
                </Link>
                <Link href="/blog/working-with-law-enforcement" className="block p-4 rounded-lg bg-background hover:bg-accent transition-colors">
                  <h3 className="font-semibold text-foreground mb-1">Working with Law Enforcement on Crypto Fraud Cases</h3>
                  <p className="text-sm text-muted-foreground">What to expect when reporting cryptocurrency theft to authorities.</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading mb-6">
            Ready to Start Your Investigation?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Get a free case review and learn how our cryptocurrency fraud investigation services can help you trace stolen funds and identify perpetrators.
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