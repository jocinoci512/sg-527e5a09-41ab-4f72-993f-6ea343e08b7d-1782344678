import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Shield, FileText, Clock, Lock, CheckCircle, PlayCircle } from "lucide-react";
import Link from "next/link";
import { caseService } from "@/services/caseService";
import { useToast } from "@/hooks/use-toast";
import { VideoEmbed } from "@/components/VideoEmbed";
import { emailService } from "@/services/emailService";

export default function CaseReview() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const educationalVideos = [
    {
      vimeoId: "996807223",
      title: "How Our Investigation Process Works",
      description: "Learn about our professional fraud investigation methodology and blockchain tracing capabilities."
    },
    {
      vimeoId: "996807160",
      title: "What to Expect During Case Review",
      description: "Our team explains the case review process and what information helps us assess your situation effectively."
    },
    {
      vimeoId: "996807100",
      title: "Understanding Evidence Collection",
      description: "Essential guidance on gathering and preserving evidence for cryptocurrency fraud investigations."
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      const amountString = formData.get("amountLost") as string;
      const amountNumber = parseFloat(amountString.replace(/[^0-9.-]+/g, "")) || 0;
      
      const caseData = {
        full_name: formData.get("fullName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        country: formData.get("country") as string,
        scam_type: formData.get("scamType") as string,
        amount_lost: amountNumber,
        cryptocurrency_used: formData.get("cryptocurrency") as string || null,
        wallet_address: formData.get("walletAddress") as string || null,
        scammer_website: formData.get("scammerWebsite") as string || null,
        incident_description: formData.get("incidentDescription") as string,
        status: "pending" as const,
      };

      console.log("Attempting to submit case with data:", caseData);

      const submittedCase = await caseService.submitCaseReview(caseData);
      
      console.log("Case submitted successfully:", submittedCase);
      
      setIsSubmitted(true);
      toast({
        title: "Case Review Submitted",
        description: "Our team will contact you within 24-48 hours.",
      });

      // Send email notification with the case ID from the database response
      try {
        console.log("Attempting to send email notification...");
        await emailService.logEmailNotification({
          notification_type: "case_submission",
          recipient_email: "Support@cipherstraces.com",
          subject: `New Case Submission: ${caseData.scam_type} - ${caseData.full_name}`,
          template_name: "case_submission",
          case_id: submittedCase.id,
          status: "sent",
          metadata: {
            scam_type: caseData.scam_type,
            amount_lost: caseData.amount_lost,
            submitted_at: new Date().toISOString()
          }
        });
        console.log("Email notification sent successfully");
      } catch (emailError: any) {
        console.error("Email notification failed (non-blocking):", emailError);
        // Don't fail the submission if email fails
      }
    } catch (error: any) {
      console.error("CASE SUBMISSION ERROR - Full details:", error);
      console.error("Error message:", error.message);
      console.error("Error details:", error.details || error);
      console.error("Error hint:", error.hint);
      console.error("Error code:", error.code);
      
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your case. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <SEO 
          title="Case Review Submitted | Cipher Trace"
          description="Your case review has been submitted successfully. Our team will contact you shortly."
        />
        
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">
            <div className="mb-8">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-heading mb-6">
              Case Review Submitted
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for submitting your case information. Our investigation team will review your submission and contact you within 24-48 hours to discuss next steps.
            </p>
            <div className="space-y-4 text-left bg-muted/30 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold text-foreground font-heading">What happens next?</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">1</div>
                  <span>Our team reviews your case details and supporting documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">2</div>
                  <span>We conduct preliminary research and assess investigation options</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">3</div>
                  <span>A senior investigator will contact you to discuss findings and recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">4</div>
                  <span>We outline available investigation services and provide transparent pricing</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/">Return to Homepage</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://wa.me/16462440064" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title="Free Case Review | Cipher Trace - Cryptocurrency Fraud Investigation"
        description="Submit your fraud case for professional review. Our blockchain investigation team will analyze your situation and provide expert guidance on recovery options."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              Start Your Free Case Review
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Provide details about your situation and our investigation team will review your case within 24-48 hours. All information is handled with strict confidentiality.
            </p>
          </div>
        </div>
      </section>

      {/* NEW: Educational Video Section */}
      <section className="py-16 lg:py-24 bg-muted/30 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
              <PlayCircle className="h-4 w-4" />
              <span className="text-sm">Watch Before You Submit</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Understanding the Investigation Process
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Learn what to expect and how to prepare for your case review
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-12">
            {educationalVideos.map((video, index) => (
              <div key={index}>
                <VideoEmbed
                  vimeoId={video.vimeoId}
                  title={video.title}
                  description={video.description}
                />
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-background border-2 border-border rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 font-heading">Why Watch These Videos?</h3>
                <p className="text-muted-foreground text-sm">
                  These videos will help you understand our investigation methodology, what information we need to assess your case effectively, and what to expect during the review process. Being informed helps us work together more efficiently to address your situation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section - Keep existing exactly as is */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="border-2">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="font-heading">Confidential</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All case information is protected under strict confidentiality agreements and handled with professional discretion.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Clock className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="font-heading">Fast Response</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our team reviews all submissions within 24-48 hours and prioritizes urgent cases requiring immediate attention.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <FileText className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="font-heading">No Obligation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Case review is completely free with no obligation. We provide honest assessment of investigation options.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Case Information Form</CardTitle>
              <CardDescription>
                Please provide as much detail as possible to help us understand your situation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input 
                      id="fullName" 
                      name="fullName" 
                      required 
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      required 
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input 
                      id="country" 
                      name="country" 
                      required 
                      placeholder="United States"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scamType">Type of Fraud *</Label>
                  <Select name="scamType" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fraud type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cryptocurrency">Cryptocurrency Scam</SelectItem>
                      <SelectItem value="investment">Investment Scam</SelectItem>
                      <SelectItem value="romance">Romance Scam</SelectItem>
                      <SelectItem value="forex">Forex Scam</SelectItem>
                      <SelectItem value="pig-butchering">Pig Butchering Scam</SelectItem>
                      <SelectItem value="nft">NFT Scam</SelectItem>
                      <SelectItem value="exchange">Exchange Fraud</SelectItem>
                      <SelectItem value="wire">Wire Fraud</SelectItem>
                      <SelectItem value="banking">Banking Fraud</SelectItem>
                      <SelectItem value="social-media">Social Media Scam</SelectItem>
                      <SelectItem value="marketplace">Marketplace Fraud</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="amountLost">Estimated Amount Lost *</Label>
                    <Input 
                      id="amountLost" 
                      name="amountLost" 
                      required 
                      placeholder="$50,000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cryptocurrency">Cryptocurrency Used (if applicable)</Label>
                    <Input 
                      id="cryptocurrency" 
                      name="cryptocurrency" 
                      placeholder="Bitcoin, Ethereum, USDT, etc."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="walletAddress">Wallet Address(es) (if known)</Label>
                  <Input 
                    id="walletAddress" 
                    name="walletAddress" 
                    placeholder="Enter wallet addresses separated by commas"
                    className="font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scammerWebsite">Scammer Website or Platform URL</Label>
                  <Input 
                    id="scammerWebsite" 
                    name="scammerWebsite" 
                    type="url" 
                    placeholder="https://example-scam-site.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incidentDescription">Detailed Description of Incident *</Label>
                  <Textarea 
                    id="incidentDescription" 
                    name="incidentDescription" 
                    required 
                    rows={8}
                    placeholder="Please provide a detailed description of what happened, including dates, how you were contacted, amounts transferred, and any other relevant information that will help us understand your case."
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documents">Supporting Documents</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <Input 
                      id="documents" 
                      name="documents" 
                      type="file" 
                      multiple 
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      className="max-w-xs mx-auto"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload screenshots, transaction records, emails, or other evidence (PDF, JPG, PNG, DOC)
                    </p>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg border-2 border-border">
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-semibold text-foreground mb-1">Privacy & Confidentiality</p>
                      <p>
                        All information submitted is protected under strict confidentiality agreements. Your case details will only be shared with authorized investigation personnel. By submitting this form, you consent to Cipher Trace reviewing your case and contacting you regarding investigation services.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="flex-1 text-lg py-6 font-semibold"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Case Review"}
                  </Button>
                  <Button 
                    type="button" 
                    size="lg" 
                    variant="outline"
                    asChild
                    className="text-lg py-6 font-semibold"
                  >
                    <a href="https://wa.me/16462440064" target="_blank" rel="noopener noreferrer">
                      Contact via WhatsApp
                    </a>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground italic max-w-3xl mx-auto">
              Cipher Trace provides fraud investigation, blockchain tracing, intelligence gathering, scam analysis, and recovery consultation services. Recovery outcomes cannot be guaranteed and vary depending on available evidence, jurisdiction, blockchain activity, third-party cooperation, and individual case circumstances.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}