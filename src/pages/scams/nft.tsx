import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AlertTriangle, Image, Shield, ArrowRight, XCircle } from "lucide-react";

export default function NFTScams() {
  return (
    <Layout>
      <SEO 
        title="NFT Scams - Recognition, Prevention & Recovery | Cipher Trace"
        description="Comprehensive guide to NFT scams including fake marketplaces, rug pulls, phishing, and wash trading. Learn protection strategies and recovery options."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              NFT Scams
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Understanding NFT fraud including fake marketplaces, phishing attacks, rug pulls, and how to protect your digital assets.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
                <Link href="/case-review">
                  Report NFT Scam
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
              Common NFT Scam Types
            </h2>
            
            <div className="space-y-6">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Fake NFT Marketplaces
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Fraudulent marketplaces that mimic legitimate platforms like OpenSea or Rarible. When you connect your wallet and approve transactions, scammers drain your assets.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Suspicious URL, too-good-to-be-true prices, pressure to connect wallet immediately, spelling errors, no verified projects
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    NFT Phishing Attacks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Scammers send fake links via Discord, Twitter, or email claiming to be from legitimate NFT projects. Links lead to phishing sites that steal wallet credentials or trick you into signing malicious transactions.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Unsolicited DMs, urgent "mint now" messages, suspicious links, requests for seed phrases, fake Discord servers, look-alike URLs
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    NFT Rug Pulls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Project creators build hype around an NFT collection, collect mint proceeds, then abandon the project, delete social media, and disappear with funds. Roadmap promises are never fulfilled.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Anonymous team, copied artwork, unrealistic roadmap, no utility, rapid sell-off by creators, social media deletion, no community engagement
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Counterfeit NFTs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Scammers copy popular NFT artwork and mint fake versions on marketplaces. Buyers think they're getting legitimate NFTs from established collections but receive worthless copies.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Unverified seller, significantly lower price than floor, different contract address, no creator verification, suspicious mint date, wrong blockchain
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Wash Trading Manipulation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Scammers artificially inflate NFT prices by repeatedly buying and selling between their own wallets, creating fake trading volume and price history to lure real buyers.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Sudden price spikes, same wallets trading repeatedly, low unique holder count, high volume with few actual buyers, suspicious price patterns
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Social Media Impersonation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Scammers create fake social media accounts impersonating legitimate NFT projects or influencers, promoting fake mints, giveaways, or airdrops that steal connected wallets.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning signs:</strong> Fake verification checkmarks, slightly different usernames, unsolicited giveaway DMs, requests to connect wallet, fake announcement posts
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
                  Verify Everything
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Check official project websites and verified social media. Verify contract addresses on blockchain explorers. Confirm seller verification status. Double-check URLs before connecting wallets.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Use Hardware Wallets
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Store valuable NFTs in hardware wallets (Ledger, Trezor). Use separate wallets for minting and holding. Never approve unlimited spending allowances. Review transaction details carefully.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Research Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Investigate team backgrounds. Check roadmap realism. Look for utility beyond speculation. Verify artwork originality. Read contract audits. Check community sentiment and holder distribution.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Be Wary of DMs
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Legitimate projects never DM first. Ignore unsolicited mint links. No real giveaways ask for wallet connections. Don't click links from unknown sources. Verify everything through official channels.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Check Smart Contracts
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Review what you're signing. Use tools like Etherscan to read contracts. Be suspicious of unusual permissions. Never share your seed phrase. Reject unclear transaction requests.
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
                Test new marketplaces with small amounts. Don't FOMO into mints. Research before buying floor. Diversify NFT investments. Only invest what you can afford to lose completely.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading mb-6">
              If You've Been Scammed
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">1. Revoke Approvals Immediately</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Use tools like Revoke.cash or Etherscan to revoke any active token approvals from suspicious contracts. This prevents further theft from your wallet.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">2. Document Everything</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Save transaction hashes, contract addresses, wallet addresses, screenshots, Discord/Twitter conversations, and any communication with scammers. This evidence is crucial for investigation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">3. Report the Scam</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Report to the NFT marketplace, blockchain explorer, Discord/Twitter support, local law enforcement, and the FBI's IC3. Report fake accounts and projects to social media platforms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">4. Engage Professional Investigation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Contact blockchain investigation firms like Cipher Trace for professional asset tracing, forensic analysis, and recovery consultation. We specialize in tracking stolen NFTs across blockchain networks.
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
            Victim of an NFT Scam?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Our blockchain investigation team specializes in NFT fraud cases. We can trace stolen assets, identify scammers, and support your recovery efforts.
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