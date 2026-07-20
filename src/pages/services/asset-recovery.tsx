import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { DollarSign, Shield, FileText, Users, ArrowRight, AlertCircle } from "lucide-react";

export default function AssetRecovery() {
  return (
    <Layout>
      <SEO 
        title="Digital Asset Recovery Consultation - Cryptocurrency Recovery Services | Cipher Trace"
        description="Professional digital asset recovery consultation and strategic guidance for stolen cryptocurrency. Expert support for recovery efforts and legal coordination."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              Digital Asset Recovery Consultation
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Strategic guidance and professional consultation supporting cryptocurrency recovery efforts through investigation, legal coordination, and enforcement engagement.
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

      <section className="py-16 lg:py-24 bg-yellow-50 dark:bg-yellow-900/10 border-y-2 border-yellow-200 dark:border-yellow-800">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-8 w-8 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
                Important Disclaimer
              </h2>
              <p className="text-muted-foreground">
                Cipher Trace provides fraud investigation, blockchain tracing, intelligence gathering, scam analysis, and recovery consultation services. <strong>Recovery outcomes cannot be guaranteed</strong> and vary depending on available evidence, jurisdiction, blockchain activity, third-party cooperation, and individual case circumstances.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading mb-8">
              Recovery Consultation Services
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our digital asset recovery consultation services provide strategic guidance, investigative support, and professional coordination to maximize recovery potential for stolen cryptocurrency and digital assets.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                While recovery outcomes depend on numerous factors beyond our control, we leverage our expertise in blockchain forensics, law enforcement coordination, and legal strategy to provide the best possible support for your recovery efforts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              How We Support Recovery
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="border-2">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Investigation & Tracing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Comprehensive blockchain forensic analysis identifying perpetrators, tracing stolen funds, and documenting the complete transaction chain with detailed evidence collection.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Documentation & Reporting</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Professional investigation reports suitable for law enforcement submission, legal proceedings, and regulatory filings with complete transaction documentation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Law Enforcement Coordination</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Strategic guidance on engaging appropriate law enforcement agencies, preparing submissions, and facilitating international cooperation when required.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Exchange Engagement</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  When stolen funds reach known exchanges, we provide guidance on freeze requests, proper documentation, and coordination with exchange compliance teams.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading mb-8 text-center">
            Recovery Factors
          </h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Blockchain Activity</h3>
                <p className="text-sm text-muted-foreground">
                  Recovery potential is higher when stolen funds remain on-chain and identifiable. Funds sent through mixers, privacy protocols, or converted to privacy coins significantly reduce traceability.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Timing</h3>
                <p className="text-sm text-muted-foreground">
                  Early reporting and investigation provide the best recovery potential. Once funds are dispersed, mixed, or cashed out, recovery becomes substantially more difficult.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Jurisdiction & Cooperation</h3>
                <p className="text-sm text-muted-foreground">
                  Recovery success depends heavily on law enforcement jurisdiction, international cooperation frameworks, and exchange willingness to freeze and return funds.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Evidence Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Strong evidence linking perpetrators to fraud increases recovery potential through legal action, civil litigation, and law enforcement engagement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading mb-6">
            Start Your Recovery Consultation
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Time is critical for recovery efforts. Submit a free case review and our team will assess your situation and provide initial guidance within 24-48 hours.
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