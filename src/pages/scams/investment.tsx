import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AlertTriangle, TrendingUp, Shield, ArrowRight, XCircle } from "lucide-react";

export default function InvestmentScams() {
  return (
    <Layout>
      <SEO 
        title="Investment Scams - Recognition, Prevention & Recovery | Cipher Trace"
        description="Comprehensive guide to investment fraud including Ponzi schemes, pump and dump, fake funds, and recovery strategies. Expert fraud investigation services."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              Investment Scams
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Understanding investment fraud schemes, how to identify them, and what to do if you've been victimized by investment scams.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
                <Link href="/case-review">
                  Report Investment Fraud
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
              Common Investment Scam Types
            </h2>
            
            <div className="space-y-6">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Ponzi Schemes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Fraudulent investment operations promising high returns with little risk. Early investors are paid with funds from new investors, creating an illusion of profit until the scheme collapses when new investment slows.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Red flags:</strong> Guaranteed high returns, consistent returns regardless of market conditions, complex strategies that aren't clearly explained, difficulty withdrawing funds
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Pyramid Schemes/MLM Fraud
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Business models relying primarily on recruiting new members rather than actual product sales. Participants pay to join and profit by recruiting others, with most participants losing money.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Red flags:</strong> Emphasis on recruitment over products, upfront membership fees, income claims based on recruitment, pressure to buy inventory, complex compensation structures
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Pump and Dump Schemes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Scammers artificially inflate asset prices through false or misleading positive statements, then sell their holdings at inflated prices, leaving other investors with worthless holdings as prices crash.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Red flags:</strong> Unsolicited investment tips, pressure to buy immediately, claims of "insider information", low-volume stocks with sudden activity, coordinated social media promotion
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Fake Investment Funds
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Fraudulent hedge funds, mutual funds, or private equity funds that either don't exist or massively misrepresent their holdings, strategies, and returns to attract investor capital that is then stolen.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Red flags:</strong> Unverifiable past performance, lack of third-party audits, refusal to provide documentation, offshore registration without legitimate reason, unusually consistent returns
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    High-Yield Investment Programs (HYIPs)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Online investment scams promising unsustainable returns (often 1% daily or higher) through vague trading, forex, or cryptocurrency strategies. Almost all are Ponzi schemes that collapse within months.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Red flags:</strong> Extremely high promised returns, anonymous operators, no regulatory compliance, vague business model, pressure for quick deposits, bitcoin-only deposits
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
              Warning Signs of Investment Fraud
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Guaranteed High Returns</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Claims of risk-free investments with guaranteed high returns. All legitimate investments carry risk — guarantees are a major red flag.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Pressure to Act Quickly</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  High-pressure sales tactics creating artificial urgency. Legitimate investment opportunities allow time for due diligence.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Unregistered Investments</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Investments not registered with securities regulators or sellers not properly licensed. Verify registration before investing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Overly Consistent Returns</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Returns that don't fluctuate with market conditions. All legitimate investments experience ups and downs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Secretive/Complex Strategies</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Vague or overly complex investment strategies that can't be clearly explained. Legitimate firms provide transparent information.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Issues With Paperwork</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Errors in account statements, difficulty getting documentation, or requests to keep investments "off the books".
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
                <CardTitle className="font-heading text-center">Do Your Research</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Verify investment opportunities and advisors. Check regulatory databases, research the company and principals, read independent reviews, and never invest based solely on unsolicited offers.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Understand What You're Investing In</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Only invest in opportunities you fully understand. If the strategy seems overly complex or can't be clearly explained, walk away.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Verify Registration</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Check that investments are registered with securities regulators and that sellers are properly licensed. Use official regulatory databases to verify credentials.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <AlertTriangle className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Be Skeptical of High Returns</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Question any investment promising unusually high or guaranteed returns. If it sounds too good to be true, it probably is a scam.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading mb-6">
            Victim of Investment Fraud?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Our investigation team specializes in investment fraud cases. We can help trace funds, identify perpetrators, and support your recovery efforts.
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