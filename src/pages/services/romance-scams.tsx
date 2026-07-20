import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Heart, AlertTriangle, Shield, Search, ArrowRight, XCircle } from "lucide-react";

export default function RomanceScams() {
  return (
    <Layout>
      <SEO 
        title="Romance Scam Investigation - Dating App Fraud & Crypto Theft Recovery | Cipher Trace"
        description="Professional investigation of romance scams involving cryptocurrency theft. Expert fraud detection, blockchain tracing, and recovery support for dating app fraud victims."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              Romance Scam Investigation
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Professional investigation of romance fraud involving cryptocurrency theft, fake relationships, and financial manipulation through dating platforms and social media.
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
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading mb-8">
              Understanding Romance Scams
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Romance scams involve fraudsters creating fake identities on dating platforms, social media, or messaging apps to build emotional relationships with victims. Once trust is established, scammers manipulate victims into sending money or cryptocurrency under various pretenses.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                These scams often involve fake investment opportunities, emergency situations, or promises of meeting in person that never materialize. The emotional manipulation makes victims particularly vulnerable, and losses can be substantial.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Common Romance Scam Patterns
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <XCircle className="h-6 w-6 text-red-500" />
                  Cryptocurrency Investment Scams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Scammer introduces victim to fake cryptocurrency trading platforms or investment opportunities, showing fabricated profits to encourage larger deposits. Withdrawal becomes impossible when victim tries to cash out.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <XCircle className="h-6 w-6 text-red-500" />
                  Emergency Money Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fraudster claims sudden emergency (medical, legal, family crisis) requiring immediate financial assistance. Promises repayment that never comes and requests often escalate over time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <XCircle className="h-6 w-6 text-red-500" />
                  Travel/Meeting Scams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Promises to visit victim but repeatedly requests money for travel expenses, visas, or other fees. Meeting never happens despite continued payments.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <XCircle className="h-6 w-6 text-red-500" />
                  Business/Partnership Proposals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Scammer proposes business ventures or investment partnerships requiring victim's financial participation. Funds disappear into fraudulent schemes or fake businesses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Warning Signs
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Too Perfect</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Profile seems too good to be true with model-quality photos. Often claims to be overseas working in oil, military, or medical fields.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Rapid Progression</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Declares love or strong feelings very quickly, often within days or weeks of first contact.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Avoids Meeting</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Refuses video calls or always has excuses preventing in-person meetings despite making plans.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Financial Requests</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Asks for money, gift cards, or cryptocurrency regardless of stated reason. Legitimate romantic interests don't ask for financial help from strangers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Investment Opportunities</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Introduces cryptocurrency trading platforms or investment opportunities promising guaranteed high returns.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Dramatic Stories</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Creates elaborate stories about personal tragedies, work situations, or family emergencies requiring financial assistance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Our Investigation Services
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="border-2">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Scammer Identification</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Investigation of scammer identity using social media analysis, image verification, and open-source intelligence to identify perpetrators behind fake profiles.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Blockchain Tracing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Comprehensive cryptocurrency transaction tracing following stolen funds through blockchain networks to identify final destinations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Evidence Documentation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Systematic collection and preservation of all communications, transactions, and evidence for law enforcement reporting.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <AlertTriangle className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Recovery Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Strategic guidance on recovery options, law enforcement engagement, and professional consultation for recovery efforts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading mb-6">
            Victim of a Romance Scam?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            You're not alone. Our investigation team specializes in romance fraud cases and can help trace stolen funds and support your recovery efforts.
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