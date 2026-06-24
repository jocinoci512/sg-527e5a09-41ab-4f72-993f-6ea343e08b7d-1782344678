import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MessageCircle, Clock, MapPin, Send } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { leadService } from "@/services/leadService";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      const leadData = {
        full_name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string || null,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
        status: "new" as const,
      };

      await leadService.submitContactLead(leadData);
      
      setIsSubmitted(true);
      toast({
        title: "Message Sent",
        description: "We'll respond to your inquiry within 24 hours.",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try emailing us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEO 
        title="Contact Us | Cipher Trace - Fraud Investigation Experts"
        description="Get in touch with Cipher Trace for professional fraud investigation services. Available 24/7 for urgent cases. Email, phone, or WhatsApp consultation."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              Contact Cipher Trace
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 sm:text-xl">
              Reach out to our investigation team for professional fraud investigation, blockchain tracing, and recovery consultation services.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6 font-heading">
                Get in Touch
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our investigation team is available to discuss your case and provide expert guidance. We respond to all inquiries within 24 hours and offer priority support for urgent cases.
              </p>

              <div className="space-y-6 mb-8">
                <Card className="border-2">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-heading text-lg">Email</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href="mailto:Support@cipherstraces.com" 
                      className="text-primary hover:underline text-lg font-medium"
                    >
                      Support@cipherstraces.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Professional response within 24 hours
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-heading text-lg">Phone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href="tel:+16462440064" 
                      className="text-primary hover:underline text-lg font-medium"
                    >
                      +1 (646) 244-0064
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Direct line to investigation team
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-heading text-lg">WhatsApp</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href="https://wa.me/16462440064" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-lg font-medium"
                    >
                      +1 (646) 244-0064
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Instant messaging support
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-heading text-lg">Business Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                      <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                      <p>Sunday: Closed</p>
                      <p className="text-sm text-primary font-medium mt-2">Emergency cases: Available 24/7</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-heading text-lg">Service Area</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Global case support with investigators licensed in multiple jurisdictions. We serve clients worldwide.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">
                  Urgent Cases
                </h3>
                <p className="text-muted-foreground mb-4">
                  For time-sensitive fraud investigations where immediate action may prevent further losses or improve recovery chances, contact us immediately via WhatsApp or phone.
                </p>
                <Button asChild>
                  <a href="https://wa.me/16462440064" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contact via WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">Send Us a Message</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                        <Send className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 font-heading">
                        Message Sent Successfully
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for contacting Cipher Trace. We'll respond to your inquiry within 24 hours.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input 
                          id="name" 
                          name="name" 
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

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input 
                          id="subject" 
                          name="subject" 
                          required 
                          placeholder="Brief description of your inquiry"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea 
                          id="message" 
                          name="message" 
                          required 
                          rows={6}
                          placeholder="Please provide details about your inquiry..."
                          className="resize-none"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        disabled={isSubmitting}
                        className="w-full text-lg py-6 font-semibold"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                        <Send className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  For comprehensive case review and investigation services, please use our{" "}
                  <Link href="/case-review" className="text-primary hover:underline font-medium">
                    Case Review Form
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground italic">
            Cipher Trace provides fraud investigation, blockchain tracing, intelligence gathering, scam analysis, and recovery consultation services. Recovery outcomes cannot be guaranteed and vary depending on available evidence, jurisdiction, blockchain activity, third-party cooperation, and individual case circumstances.
          </p>
        </div>
      </section>
    </Layout>
  );
}