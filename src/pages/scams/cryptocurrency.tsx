import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AlertTriangle, Shield, ArrowRight } from "lucide-react";

export default function CryptocurrencyScams() {
  return (
    <Layout>
      <SEO 
        title="Cryptocurrency Scams - Types, Prevention & Recovery | Cipher Trace"
        description="Comprehensive guide to cryptocurrency scams including investment fraud, fake exchanges, wallet hacks, and recovery strategies. Expert investigation and blockchain tracing services."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              Cryptocurrency Scams
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Understanding cryptocurrency fraud, how to protect yourself, and recovery options when you've been scammed.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
                <Link href="/case-review">
                  Report a Crypto Scam
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
              Common Cryptocurrency Scam Types
            </h2>
            
            <div className="space-y-6">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading">Fake Investment Platforms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Fraudulent trading platforms that appear legitimate but are designed to steal deposits. They often show fake profits to encourage larger investments before disappearing with all funds.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Guaranteed returns, difficulty withdrawing, unregulated platforms, aggressive marketing
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading">Ponzi/Pyramid Schemes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Fraudulent investment schemes promising high returns from cryptocurrency trading or mining, but actually paying early investors with new investor money until the scheme collapses.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Recruitment bonuses, unsustainable returns, pressure to recruit others, complex compensation structures
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading">Fake ICOs/Token Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Fraudulent Initial Coin Offerings or token launches with no real project behind them. Scammers collect investments then abandon the project with investor funds.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Anonymous team, unrealistic promises, no working product, copied whitepaper, fake partnerships
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading">Phishing & Wallet Hacks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Scammers steal wallet credentials through fake websites, malicious apps, or social engineering to drain cryptocurrency holdings.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Suspicious emails/links, fake wallet apps, requests for seed phrases, unsolicited DMs offering help
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading">Rug Pulls (DeFi Scams)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Developers create a DeFi project, attract investments, then drain liquidity pools or sell all their tokens, causing the token value to collapse to zero.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Anonymous developers, unlocked liquidity, majority token ownership by creators, rapid price pumps
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
              Protection Strategies
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Research Thoroughly
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Verify projects, platforms, and investment opportunities. Check for regulation, real team members, working products, and legitimate audits.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Secure Your Wallets
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Use hardware wallets for large amounts. Never share seed phrases. Enable 2FA. Verify website URLs carefully before connecting wallets.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Be Skeptical
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Question guarantees and unrealistic returns. Verify unsolicited offers. Research before investing. If it seems too good to be true, it probably is.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Start Small
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Test platforms with small amounts first. Verify withdrawal processes work before depositing larger sums. Don't invest more than you can afford to lose.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Verify Sources
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Check project websites, social media, community discussions. Look for red flags like anonymous teams, no code repositories, or fake partnerships.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Use Reputable Platforms
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Stick to established, regulated exchanges and platforms. Verify regulatory compliance. Check reviews and reputation before using new services.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading mb-6">
              What to Do If You've Been Scammed
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">1. Stop All Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Immediately cease contact with the scammer. Do not send additional funds even if they promise to return your money or require "fees" for withdrawal.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">2. Document Everything</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Save all communications, transaction IDs, wallet addresses, websites, screenshots, and any other evidence. This documentation is crucial for investigation and potential recovery.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">3. Report to Authorities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  File reports with your local law enforcement, the FBI's IC3 (if in the US), and relevant financial regulators. Report the scam to the platform or exchange if applicable.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">4. Engage Professional Investigation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Contact a professional blockchain investigation firm like Cipher Trace for comprehensive transaction tracing, forensic analysis, and recovery consultation.
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
              <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">
                Important Disclaimer
              </h3>
              <p className="text-muted-foreground mb-3">
                Cipher Trace provides fraud investigation, blockchain tracing, intelligence gathering, scam analysis, and recovery consultation services.
              </p>
              <p className="text-muted-foreground">
                Recovery outcomes cannot be guaranteed and vary depending on available evidence, jurisdiction, blockchain activity, third-party cooperation, and individual case circumstances.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading mb-6">
            Victim of a Cryptocurrency Scam?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Our blockchain investigation team specializes in cryptocurrency fraud cases. Submit a free case review and we'll assess your situation.
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