import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Bitcoin, TrendingUp, Heart, Globe, PiggyBank, Image, ArrowRight, AlertTriangle } from "lucide-react";

export default function Scams() {
  const scamTypes = [
    {
      icon: Bitcoin,
      title: "Cryptocurrency Scams",
      description: "Fake exchanges, wallet phishing, rug pulls, and fraudulent crypto investment schemes designed to steal digital assets.",
      href: "/scams/cryptocurrency"
    },
    {
      icon: TrendingUp,
      title: "Investment Scams",
      description: "Ponzi schemes, pyramid schemes, fake trading platforms, and fraudulent investment opportunities promising unrealistic returns.",
      href: "/scams/investment"
    },
    {
      icon: Heart,
      title: "Romance Scams",
      description: "Online dating fraud where scammers build fake relationships to manipulate victims into sending money or cryptocurrency.",
      href: "/scams/romance"
    },
    {
      icon: Globe,
      title: "Forex Scams",
      description: "Fake forex brokers, unregulated trading platforms, and foreign exchange investment fraud targeting retail traders.",
      href: "/scams/forex"
    },
    {
      icon: PiggyBank,
      title: "Pig Butchering Scams",
      description: "Sophisticated long-term fraud involving fake cryptocurrency trading platforms and manipulated investment interfaces.",
      href: "/scams/pig-butchering"
    },
    {
      icon: Image,
      title: "NFT Scams",
      description: "Counterfeit collections, rug pulls, phishing attacks, and marketplace fraud in the NFT ecosystem.",
      href: "/scams/nft"
    }
  ];

  return (
    <Layout>
      <SEO 
        title="Scam Types - Cryptocurrency, Investment, Romance & Forex Fraud | Cipher Trace"
        description="Learn about common fraud types including cryptocurrency scams, investment fraud, romance scams, forex scams, pig butchering schemes, and NFT fraud."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              Scam Types We Investigate
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Understanding common fraud schemes and how to protect yourself. Professional investigation services available for all fraud types.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Common Fraud Types
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Learn how these scams work and what warning signs to watch for
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {scamTypes.map((scam, index) => (
              <Card key={index} className="border-2 group hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <scam.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="font-heading text-center">{scam.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">{scam.description}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={scam.href}>
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
                  <strong>Be skeptical of unsolicited investment opportunities:</strong> Legitimate investment platforms don't cold-call or message random people with guaranteed returns.
                </p>
                <p>
                  <strong>Verify before you send:</strong> Never send cryptocurrency or money to someone you've only met online, regardless of their story or how genuine they seem.
                </p>
                <p>
                  <strong>Research thoroughly:</strong> Check reviews, verify business registrations, and look for warning signs before investing or engaging with new platforms.
                </p>
                <p>
                  <strong>Trust your instincts:</strong> If something feels wrong or too good to be true, it probably is. Don't let pressure tactics rush you into decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading mb-6">
            Already a Victim?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            If you've been scammed, time is critical. Our investigation team can trace stolen funds, identify perpetrators, and support your recovery efforts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6 font-semibold">
              <Link href="/case-review">
                Start Free Case Review
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 font-semibold">
              <Link href="/services">
                View Our Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}