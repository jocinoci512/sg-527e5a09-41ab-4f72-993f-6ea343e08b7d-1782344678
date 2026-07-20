import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Globe, AlertTriangle, Shield, Search, ArrowRight, XCircle, TrendingUp } from "lucide-react";

export default function ForexScams() {
  return (
    <Layout>
      <SEO 
        title="Forex Scam Investigation - Fake Broker & Trading Platform Fraud | Cipher Trace"
        description="Professional investigation of forex scams, fake brokers, unregulated trading platforms, and foreign exchange investment fraud. Expert fraud detection and recovery support."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              Forex Scam Investigation
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Professional investigation of forex broker fraud, fake trading platforms, unregulated operations, and foreign exchange investment scams targeting retail traders.
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
              Common Forex Scam Types
            </h2>
            <div className="space-y-6">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Fake Forex Brokers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Fraudulent companies posing as legitimate forex brokers, collecting deposits from traders but preventing withdrawals. Often show manipulated trading interfaces with fake profits.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Signal Seller Scams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Individuals or services selling forex trading signals promising guaranteed profits. Signals are unreliable or deliberately misleading, resulting in trader losses.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Robot/EA Scams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Fraudulent automated trading systems (Expert Advisors) promising consistent profits with little risk. Systems either don't work as advertised or cause significant losses.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Account Management Fraud
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Scammers offering to manage forex trading accounts for a fee or profit share. Either steal funds directly or make deliberately poor trades causing account losses.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Red Flags & Warning Signs
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Unregulated Broker</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Broker is not regulated by major financial authorities (FCA, ASIC, CySEC, NFA). Claims regulation in obscure offshore jurisdictions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Withdrawal Problems</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Difficulties processing withdrawals, constant requests for additional verification, or unexpected fees blocking fund access.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Guaranteed Profits</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Promises of guaranteed returns or risk-free trading. All forex trading carries substantial risk - no legitimate broker guarantees profits.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">High Pressure Tactics</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Aggressive sales calls, limited-time offers, or pressure to deposit larger amounts immediately without proper consideration.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Suspicious Trading Conditions</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Unusual spreads, requotes, slippage patterns, or trading restrictions suggesting platform manipulation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Bonus Traps</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Attractive deposit bonuses with impossible trading volume requirements or terms making withdrawal practically impossible.
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
                <CardTitle className="font-heading text-center">Broker Verification</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Comprehensive investigation of forex broker legitimacy including registration verification, regulatory status, and ownership identification.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Transaction Analysis</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Detailed analysis of payment processing, fund destinations, and money flow patterns to identify fraud and support recovery efforts.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Platform Analysis</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Technical investigation of trading platform authenticity, server locations, and manipulation indicators.
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
                <CardTitle className="font-heading text-center">Recovery Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Strategic guidance on chargeback options, regulatory complaints, law enforcement reporting, and professional recovery consultation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-yellow-50 dark:bg-yellow-900/10 border-y-2 border-yellow-200 dark:border-yellow-800">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4 font-heading">
                Protect Yourself
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <strong>Verify regulation:</strong> Only trade with brokers regulated by major financial authorities. Verify licensing directly with the regulator.
                </p>
                <p>
                  <strong>Research thoroughly:</strong> Check online reviews, regulatory warnings, and scam databases before depositing funds.
                </p>
                <p>
                  <strong>Start small:</strong> Test withdrawal process with small amounts before depositing larger sums.
                </p>
                <p>
                  <strong>Be skeptical:</strong> If returns seem too good to be true or pressure tactics are used, walk away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading mb-6">
            Victim of a Forex Scam?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Our investigation team specializes in forex fraud cases. Submit a free case review and we'll assess your situation within 24-48 hours.
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