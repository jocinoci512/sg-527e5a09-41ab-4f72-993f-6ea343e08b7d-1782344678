import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Shield, Users, Target, Award, Globe, Lock, CheckCircle, ArrowRight } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We maintain the highest ethical standards in every investigation, ensuring transparent and honest communication with clients."
    },
    {
      icon: Users,
      title: "Victim-Centered",
      description: "Our approach prioritizes the needs and well-being of fraud victims, providing compassionate support throughout the investigation process."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We deliver thorough, professional investigations using cutting-edge forensic technology and proven methodologies."
    },
    {
      icon: Lock,
      title: "Confidentiality",
      description: "Client information is protected with enterprise-grade security protocols and strict confidentiality agreements."
    }
  ];

  const standards = [
    "Professional certification in cybersecurity and financial crime investigation",
    "Adherence to international standards for digital forensics and evidence handling",
    "Transparent fee structures with no hidden charges",
    "Honest communication about case outcomes and recovery prospects",
    "Collaboration with law enforcement and regulatory authorities",
    "Continuous professional development and training"
  ];

  const methodology = [
    {
      title: "Evidence Collection",
      description: "Systematic gathering and documentation of all relevant materials including transaction records, communications, and digital artifacts."
    },
    {
      title: "Blockchain Analysis",
      description: "Advanced forensic tracing of cryptocurrency transactions across multiple blockchains using specialized investigation tools."
    },
    {
      title: "Intelligence Gathering",
      description: "Cross-referencing findings with global fraud databases, known scam patterns, and international intelligence networks."
    },
    {
      title: "Report Compilation",
      description: "Comprehensive documentation of findings formatted for law enforcement, legal proceedings, and recovery efforts."
    }
  ];

  return (
    <Layout>
      <SEO 
        title="About Cipher Trace - Professional Fraud Investigation Team"
        description="Learn about Cipher Trace's mission to help fraud victims through expert blockchain intelligence, cryptocurrency tracing, and recovery consultation services."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              About Cipher Trace
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Professional fraud investigation and blockchain intelligence services dedicated to helping victims fight back against financial crime.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading mb-6">
                Company Overview
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Cipher Trace is a leading fraud investigation and blockchain intelligence firm specializing in cryptocurrency scams, investment fraud, and digital asset theft. Founded by experienced cybersecurity professionals and financial crime investigators, we provide comprehensive investigation services to victims, businesses, attorneys, and law enforcement agencies worldwide.
                </p>
                <p>
                  Our team combines deep expertise in blockchain forensics with advanced investigative techniques to trace stolen funds, identify perpetrators, and support recovery efforts. We understand the devastating impact of financial fraud and are committed to providing professional, compassionate support to every client.
                </p>
                <p>
                  With expertise spanning cryptocurrency tracing, digital forensics, financial intelligence, and cybersecurity, we deliver thorough investigations that meet professional standards and can support legal proceedings, regulatory complaints, and law enforcement actions.
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-8">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-primary">500+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium text-muted-foreground">Cases Investigated</p>
                  </CardContent>
                </Card>
                
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-primary">50+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium text-muted-foreground">Countries Served</p>
                  </CardContent>
                </Card>
                
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-primary">24/7</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium text-muted-foreground">Client Support</p>
                  </CardContent>
                </Card>
                
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-primary">15+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium text-muted-foreground">Blockchain Networks</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Our Mission
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              To empower fraud victims with professional investigation services, comprehensive intelligence, and expert guidance that support recovery efforts and hold perpetrators accountable.
            </p>
          </div>
          
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading mb-6">
              Our Vision
            </h2>
            <p className="text-lg text-muted-foreground">
              To be the globally trusted leader in fraud investigation and blockchain intelligence, setting professional standards for digital asset recovery consultation and financial crime investigation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Core Values
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The principles that guide every investigation and client interaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="border-2 text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="font-heading">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
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
              Ethical Standards
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our commitment to professional excellence and ethical practice
            </p>
          </div>
          
          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              {standards.map((standard, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-background border-2 border-border">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{standard}</p>
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
              Investigation Methodology
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Systematic approach to fraud investigation and blockchain intelligence
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {methodology.map((method, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <CardTitle className="font-heading">{method.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{method.description}</p>
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
              Privacy Commitment
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We understand the sensitive nature of fraud investigations and maintain strict confidentiality protocols to protect client information.
            </p>
          </div>
          
          <div className="mx-auto max-w-3xl">
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    All case information is encrypted and stored securely using enterprise-grade security systems. Access to client data is strictly limited to authorized investigation personnel working directly on your case.
                  </p>
                  <p>
                    We never share client information with third parties except when legally required or when necessary to support law enforcement investigations with explicit client consent. Your privacy and confidentiality are paramount to our investigation process.
                  </p>
                  <p>
                    For complete details about our data handling practices, please review our comprehensive <Link href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Global Reach
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Serving clients worldwide with international fraud investigation capabilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="border-2 text-center">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="font-heading">International Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We investigate cross-border fraud cases across multiple jurisdictions and coordinate with international law enforcement agencies.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="font-heading">Expert Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access to global network of blockchain analysts, legal advisors, and cybersecurity professionals.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="font-heading">24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Round-the-clock client support and consultation services for urgent fraud investigation needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading mb-6">
            Ready to Work With Our Team?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Contact us today for a free case review and learn how our professional investigation services can help you.
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