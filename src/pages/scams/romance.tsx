import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AlertTriangle, Heart, Shield, ArrowRight, XCircle } from "lucide-react";

export default function RomanceScams() {
  return (
    <Layout>
      <SEO 
        title="Romance Scams - Recognition, Prevention & Recovery | Cipher Trace"
        description="Comprehensive guide to romance scams, online dating fraud, and crypto romance schemes. Learn warning signs, protection strategies, and recovery options."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              Romance Scams
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Understanding online dating fraud, cryptocurrency romance scams, and how to protect yourself from emotional manipulation and financial loss.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
                <Link href="/case-review">
                  Report Romance Scam
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
              How Romance Scams Work
            </h2>
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  Romance scammers create fake online profiles on dating apps, social media, or professional networks. They build emotional connections over weeks or months, then exploit trust to request money for emergencies, investments, or to facilitate meeting in person. Many now combine romance manipulation with cryptocurrency investment schemes.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Traditional Romance Fraud
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Scammer builds romantic relationship online, creates crisis scenarios (medical emergency, legal trouble, travel complications), and requests money transfers via wire, gift cards, or cryptocurrency.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Professes love quickly, refuses video calls, has repeated emergencies, asks for money, can't meet in person, requests gift cards
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Crypto Romance Scams (Pig Butchering)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Scammer develops romantic relationship, then introduces cryptocurrency investment "opportunity". Victim deposits funds into fake platform that shows increasing profits but withdrawal is impossible.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Introduces crypto investing early, shows "proof" of their profits, pressures increasing deposits, fake platform with impressive returns, withdrawal delays or fees
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Military/Professional Impersonation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Scammer poses as military personnel, doctor, engineer working overseas. Uses stolen photos, creates elaborate backstory, builds trust through daily communication, then requests money for various fabricated needs.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Claims to be stationed abroad, can't video call due to "security", asks for money to complete contracts or return home, requests funds for shipping or legal fees
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Inheritance/Business Scams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Scammer develops relationship, then claims to have significant inheritance, business deal, or gold/diamond shipment that requires your financial help to unlock or secure.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Mentions large sums of money, needs help accessing funds, asks for fees or taxes, provides fake legal documents, pressures quick decisions
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Blackmail/Sextortion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    After establishing relationship and obtaining intimate photos/videos, scammer threatens to share content with victim's contacts unless payment is made. Often combined with fake dating profile creation.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Requests intimate content early, sudden threatening tone, demands cryptocurrency payment, shows screenshots of your social media contacts
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
              Red Flags to Watch For
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Too Good To Be True</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Perfect match with suspiciously similar interests. Professional model photos. Professes strong feelings very quickly. Seems too perfect.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Won't Video Call</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Always has excuses for not video calling. Claims camera is broken. Cites work restrictions. Only sends pre-recorded videos or photos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Overseas Location</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Claims to be working abroad. Military deployment story. Oil rig work. International business. Can't meet in person easily.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Financial Discussions</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Brings up money topics. Mentions financial struggles. Introduces investment opportunities. Asks about your financial situation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Request for Money</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Asks for financial help for emergencies, travel, medical bills, legal fees, business opportunities, or crypto investments.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Communication Patterns</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Inconsistent stories. Avoids specific questions. Scripted messages. Poor grammar despite claimed education. Time zone inconsistencies.
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
              Protection Strategies
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
                <CardTitle className="font-heading text-center">Verify Identity</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Request video calls early. Reverse image search profile photos. Verify social media presence. Be skeptical of perfect matches. Trust your instincts if something feels off.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <AlertTriangle className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Never Send Money</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Never send money to someone you've only met online. No gift cards, wire transfers, or cryptocurrency. Real relationships don't start with financial requests.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Take It Slow</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Be wary of quick declarations of love. Take time to build trust gradually. Meet in person before making commitments. Don't let emotional pressure override logic.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-heading text-center">Discuss With Others</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Share your online relationship with trusted friends or family. Outside perspective can spot red flags. Scammers often isolate victims from support networks.
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
                If You've Been Scammed
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Stop all contact</strong> with the scammer immediately</li>
                <li>• <strong>Don't send more money</strong> even if they promise to return previous amounts</li>
                <li>• <strong>Report to authorities</strong> - FBI IC3, FTC, local police</li>
                <li>• <strong>Report to the platform</strong> where you met</li>
                <li>• <strong>Document everything</strong> - messages, photos, transaction records</li>
                <li>• <strong>Contact your bank</strong> or payment provider immediately</li>
                <li>• <strong>Seek professional help</strong> from investigators like Cipher Trace</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading mb-6">
            Victim of a Romance Scam?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Our investigation team can help trace lost funds, identify scammers, and support your recovery efforts. We understand the emotional and financial impact.
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