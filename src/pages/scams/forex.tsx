import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AlertTriangle, TrendingUp, Shield, ArrowRight, XCircle } from "lucide-react";

export default function ForexScams() {
  return (
    <Layout>
      <SEO 
        title="Forex Scams - Recognition, Prevention & Recovery | Cipher Trace"
        description="Comprehensive guide to forex trading scams, fake brokers, signal services fraud, and recovery strategies. Expert investigation services for forex fraud victims."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              Forex Trading Scams
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Understanding forex fraud, fake brokers, signal service scams, and how to protect yourself from foreign exchange market manipulation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
                <Link href="/case-review">
                  Report Forex Scam
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
                  <p className="text-muted-foreground mb-4">
                    Fraudulent brokers that appear legitimate but manipulate trading platforms, prevent withdrawals, or simply steal deposits. Often clone legitimate broker websites with slight URL variations.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Unregulated broker, guaranteed profits, pressure to deposit more, withdrawal difficulties, manipulated prices, fake trading platform
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
                  <p className="text-muted-foreground mb-4">
                    Fraudsters selling forex trading signals, insider information, or automated trading robots that promise consistent profits but deliver worthless advice or manipulated results.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Guaranteed win rates, fake testimonials, pressure to subscribe, high fees, no verified track record, claims of "secret" strategies
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Managed Account Fraud
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Scammers offer to manage your forex account for high returns. They may show fake profits initially, then disappear with funds or prevent withdrawals through various excuses.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Unrealistic return promises, no proper licensing, requests for account control, fake performance records, pressure to deposit more
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Ponzi/HYIP Schemes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Investment programs claiming to trade forex profitably and pay high daily returns. Actually pay early investors with new investor money until scheme collapses.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Daily guaranteed returns, recruitment bonuses, anonymous operators, offshore registration, requires cryptocurrency deposits, withdrawal delays
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Clone Firm Scams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Scammers impersonate legitimate, regulated forex brokers using similar names, logos, and website designs. They steal client deposits while victims believe they're dealing with the real firm.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Slightly different website URL, unsolicited contact, pressure to deposit quickly, can't verify through official regulator database, different contact details
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
              Red Flags in Forex Trading
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
                  Broker not regulated by legitimate financial authorities (FCA, ASIC, CySEC, NFA, etc.). Offshore registration in jurisdictions with weak oversight.
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
                  Claims of guaranteed returns, risk-free trading, or promises that you can't lose. All forex trading carries significant risk.
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
                  Difficulty withdrawing funds, unexpected fees, requires additional deposits to unlock withdrawals, delayed processing with various excuses.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Aggressive Marketing</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Unsolicited calls or messages, high-pressure sales tactics, urgency to deposit immediately, promises of limited-time opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Price Manipulation</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Prices on the platform differ from market rates, slippage always works against you, stop losses triggered at unexpected levels, trades rejected.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Fake Reviews</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Only positive reviews, testimonials that seem scripted, no negative feedback anywhere, reviews posted in clusters, generic praise without specifics.
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
              How to Protect Yourself
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Verify Regulation</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Only use brokers regulated by legitimate financial authorities. Check regulator databases directly. Verify license numbers. Be wary of offshore brokers with weak regulation.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Research Thoroughly</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Check independent reviews on multiple platforms. Look for complaint patterns. Verify the broker's trading history. Test with small amounts first before larger deposits.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <AlertTriangle className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Be Skeptical of Promises</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                No legitimate broker guarantees profits. Forex trading is inherently risky. Be wary of "too good to be true" returns. Question unrealistic win rates or profit claims.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Understand the Risks</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Educate yourself about forex trading before investing. Understand leverage risks. Only trade with money you can afford to lose. Don't rely solely on others' advice.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading mb-6">
            Victim of Forex Fraud?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Our investigation team specializes in forex fraud cases. We can help trace funds, identify fraudulent brokers, and support your recovery efforts.
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