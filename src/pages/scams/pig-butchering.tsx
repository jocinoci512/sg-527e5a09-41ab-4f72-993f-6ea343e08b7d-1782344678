import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { AlertTriangle, ShieldAlert, Eye, CheckCircle, ArrowRight } from "lucide-react";

export default function PigButchering() {
  const warningSignsData = [
    "Unsolicited contact via WhatsApp, Telegram, or dating apps",
    "Quick progression to discussing investment opportunities",
    "Fake cryptocurrency trading platforms with impressive-looking interfaces",
    "Initial small profits to build trust before requesting larger deposits",
    "Unable to withdraw funds or increasing fees to access your money",
    "Pressure to invest more to 'unlock' your account or reach minimum withdrawal",
    "Platform shows profits but funds never actually arrive when withdrawn"
  ];

  const preventionTipsData = [
    "Never invest based on advice from someone you've only met online",
    "Research any investment platform thoroughly - check regulatory databases",
    "Be skeptical of guaranteed returns or 'insider knowledge'",
    "Test withdrawals with small amounts before making larger investments",
    "Verify platform legitimacy independently, not through links they provide",
    "Be wary of platforms that only accept cryptocurrency deposits",
    "Don't send cryptocurrency to strangers regardless of the relationship"
  ];

  return (
    <Layout>
      <SEO 
        title="Pig Butchering Scams: How They Work & Investigation Services | Cipher Trace"
        description="Learn about pig butchering scams - sophisticated long-term fraud schemes involving fake crypto platforms. Professional investigation services available."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              Pig Butchering Scams
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Understanding sophisticated long-term cryptocurrency fraud and how professional investigation can help victims trace stolen funds.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading mb-6">
              What Are Pig Butchering Scams?
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Pig butchering scams (also known as "Sha Zhu Pan" in Chinese) are sophisticated, long-term fraud schemes where criminals build trust with victims over weeks or months before manipulating them into investing in fake cryptocurrency trading platforms. The term comes from the practice of "fattening up" the victim before the final theft - just as a pig is fattened before slaughter.
              </p>
              <p>
                These scams typically begin with seemingly accidental contact via messaging apps, dating platforms, or social media. The scammer builds a relationship, eventually introducing the victim to a "lucrative" cryptocurrency investment opportunity they're personally profiting from. The victim is directed to a professional-looking trading platform that appears legitimate but is entirely controlled by the criminals.
              </p>
              <p>
                Initially, the platform shows impressive returns and may even allow small withdrawals to build credibility. Once the victim deposits substantial amounts, they discover they cannot withdraw their funds. The platform may demand additional "taxes," "verification fees," or "unlock charges" before releasing the money - all of which are simply additional theft.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <ShieldAlert className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              How the Scam Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Understanding the typical stages of pig butchering fraud
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl">
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">1</div>
                    Initial Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The scammer initiates contact through "wrong number" messages on WhatsApp, Telegram, dating apps, or social media. They appear friendly, attractive, and successful, often claiming to be entrepreneurs or cryptocurrency traders.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">2</div>
                    Building Trust
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Over weeks or months, the scammer builds a relationship through daily conversations, sharing photos of their lifestyle, and creating emotional connection. For romance-based approaches, they may develop romantic feelings with the victim.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">3</div>
                    Investment Introduction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The scammer casually mentions their success with cryptocurrency trading, often showing screenshots of profits. They offer to teach the victim or suggest they can both profit together. The platform appears professional with real-time charts and data.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">4</div>
                    Small Deposits & Profits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The victim makes initial small deposits and sees immediate profits on the platform interface. They may successfully withdraw small amounts to verify the platform's legitimacy, further building trust in the scheme.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">5</div>
                    Larger Investments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Convinced of the opportunity's legitimacy, the victim invests larger amounts. The platform continues showing impressive returns, encouraging even greater deposits. The scammer may suggest borrowing money or liquidating assets to maximize profits.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">6</div>
                    The Trap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    When the victim attempts to withdraw substantial funds, the platform blocks withdrawals. The scammer demands additional payments for "taxes," "verification," "unlock fees," or "margin calls." Each payment leads to new demands, and the victim realizes they've been defrauded.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <AlertTriangle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Warning Signs
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Red flags that indicate you may be dealing with a pig butchering scam
            </p>
          </div>
          
          <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-1 gap-4">
              {warningSignsData.map((sign, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border-2 border-yellow-200 dark:border-yellow-800">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{sign}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Prevention Tips
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Protect yourself from becoming a victim
            </p>
          </div>
          
          <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-1 gap-4">
              {preventionTipsData.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-background border-2 border-border">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading mb-6 text-center">
              Investigation Options
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground mb-8">
              <p>
                If you've been victimized by a pig butchering scam, professional investigation services can help trace your stolen cryptocurrency and identify the perpetrators. While pig butchering schemes are sophisticated, blockchain transaction analysis can reveal critical evidence about where your funds went and who controlled the fraudulent platform.
              </p>
              <p>
                Our investigation team specializes in tracing cryptocurrency through complex transaction patterns, identifying wallet clusters associated with criminal operations, and providing comprehensive evidence packages suitable for law enforcement submission. Time-sensitive action is critical as funds may be moved to exchanges or converted to other assets.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-12">
              <Card className="border-2 text-center">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Blockchain Tracing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Follow your cryptocurrency deposits through the blockchain to identify destination wallets and exchanges.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 text-center">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Platform Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Investigate the fake trading platform's infrastructure, hosting, and connections to other fraud operations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 text-center">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Evidence Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Compile comprehensive evidence packages including blockchain forensics and communication records.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="text-lg px-8 py-6 font-semibold">
                <Link href="/case-review">
                  Start Free Case Review
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Frequently Asked Questions
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Can pig butchering scam victims recover their cryptocurrency?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Recovery outcomes vary significantly based on how quickly action is taken, where funds were moved, and cooperation from cryptocurrency exchanges. While recovery is never guaranteed, blockchain tracing can identify fund locations and provide evidence for law enforcement action and potential recovery efforts through exchanges or legal proceedings.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Should I pay the platform's "tax" or "unlock fee" to get my money back?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                No. These additional fee demands are part of the scam. Paying them will not result in receiving your funds - instead, the criminals will either disappear or create new fee demands. Once you realize you're dealing with a fraudulent platform, stop all payments immediately and seek professional investigation services.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-lg font-semibold">
                How can I verify if a cryptocurrency platform is legitimate?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Legitimate cryptocurrency exchanges are regulated and registered with financial authorities in their operating jurisdictions. Check regulatory databases (like FinCEN in the US or FCA in the UK), verify the platform's legal entity, read independent reviews from multiple sources, and test small withdrawals before depositing substantial amounts. Be extremely cautious of platforms recommended by people you've only met online.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-lg font-semibold">
                What should I do immediately after realizing I've been scammed?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Stop all communication with the scammer and make no additional payments. Document everything: save all messages, screenshots of the platform, transaction records, wallet addresses, and communication history. Report the fraud to local law enforcement and relevant financial authorities. Contact a professional blockchain investigation service immediately, as rapid action improves the chances of tracing funds and supporting recovery efforts.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading mb-6">
            Need Help With a Pig Butchering Scam?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Our investigation team specializes in pig butchering scam cases. We can trace your cryptocurrency, identify the fraudulent platform's operators, and provide evidence to support your recovery efforts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
              <Link href="/case-review">
                Start Free Case Review
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 text-white border-white/20 hover:bg-white/20 font-semibold">
              <Link href="/services/crypto-fraud">
                Crypto Fraud Investigation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}