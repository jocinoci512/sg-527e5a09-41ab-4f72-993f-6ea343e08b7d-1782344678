import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Shield, FileText, Clock, Lock, CheckCircle, PlayCircle, AlertCircle, Edit, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { caseService } from "@/services/caseService";
import { useToast } from "@/hooks/use-toast";
import { VideoEmbed } from "@/components/VideoEmbed";
import { emailService } from "@/services/emailService";

// Validation functions
const validateEmail = (email: string): string | null => {
  if (!email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
};

const validatePhone = (phone: string): string | null => {
  if (!phone) return "Phone number is required";
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!phoneRegex.test(phone)) return "Please enter a valid phone number";
  if (phone.replace(/\D/g, "").length < 10) return "Phone number must be at least 10 digits";
  return null;
};

const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim() === "") return `${fieldName} is required`;
  return null;
};

const validateAmount = (amount: string): string | null => {
  if (!amount) return "Amount is required";
  const cleanAmount = amount.replace(/[^0-9.-]+/g, "");
  const numAmount = parseFloat(cleanAmount);
  if (isNaN(numAmount) || numAmount <= 0) return "Please enter a valid amount greater than 0";
  return null;
};

const validateUrl = (url: string): string | null => {
  if (!url) return null; // Optional field
  try {
    new URL(url);
    return null;
  } catch {
    return "Please enter a valid URL (e.g., https://example.com)";
  }
};

export default function CaseReview() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    scamType: "",
    amountLost: "",
    cryptocurrency: "",
    walletAddress: "",
    scammerWebsite: "",
    incidentDescription: "",
  });

  // Validation errors state
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  // Touched fields state (for showing validation only after user interacts)
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Handle field changes with real-time validation
  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [field]: true }));

    // Validate field
    let error: string | null = null;
    switch (field) {
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "fullName":
        error = validateRequired(value, "Full name");
        break;
      case "country":
        error = validateRequired(value, "Country");
        break;
      case "scamType":
        error = validateRequired(value, "Fraud type");
        break;
      case "amountLost":
        error = validateAmount(value);
        break;
      case "scammerWebsite":
        error = validateUrl(value);
        break;
      case "incidentDescription":
        error = validateRequired(value, "Incident description");
        if (!error && value.length < 50) {
          error = "Please provide at least 50 characters of detail";
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Validate all required fields for step 1
  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string | null> = {
      fullName: validateRequired(formData.fullName, "Full name"),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      country: validateRequired(formData.country, "Country"),
      scamType: validateRequired(formData.scamType, "Fraud type"),
      amountLost: validateAmount(formData.amountLost),
      incidentDescription: validateRequired(formData.incidentDescription, "Incident description"),
    };

    // Check description length
    if (!newErrors.incidentDescription && formData.incidentDescription.length < 50) {
      newErrors.incidentDescription = "Please provide at least 50 characters of detail";
    }

    // Check optional URL if provided
    if (formData.scammerWebsite) {
      newErrors.scammerWebsite = validateUrl(formData.scammerWebsite);
    }

    setErrors(newErrors);

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Check if any errors exist
    return !Object.values(newErrors).some(error => error !== null);
  };

  // Handle proceed to review
  const handleProceedToReview = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast({
        title: "Validation Error",
        description: "Please fix the errors below before proceeding",
        variant: "destructive"
      });
    }
  };

  // Handle final submission
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    try {
      const amountNumber = parseFloat(formData.amountLost.replace(/[^0-9.-]+/g, "")) || 0;
      
      const caseData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        scam_type: formData.scamType,
        amount_lost: amountNumber,
        cryptocurrency_used: formData.cryptocurrency || null,
        wallet_address: formData.walletAddress || null,
        scammer_website: formData.scammerWebsite || null,
        incident_description: formData.incidentDescription,
        status: "submitted" as const,  // Fixed: use 'submitted' instead of 'pending'
      };

      console.log("Submitting case:", caseData);

      const submittedCase = await caseService.submitCaseReview(caseData);
      
      console.log("Case submitted successfully:", submittedCase);
      
      setIsSubmitted(true);
      setCurrentStep(3);
      
      toast({
        title: "✅ Case Review Submitted!",
        description: "Our team will contact you within 24-48 hours.",
      });

      // Send admin notification email to support@cipherstraces.com
      const emailData = {
        caseId: submittedCase.case_reference_id || submittedCase.id,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        scamType: formData.scamType,
        amountLost: amountNumber,
        cryptocurrency: formData.cryptocurrency || undefined,
        walletAddress: formData.walletAddress || undefined,
        scammerWebsite: formData.scammerWebsite || undefined,
        incidentDescription: formData.incidentDescription,
        submittedAt: new Date().toISOString(),
      };

      try {
        // Send admin notification
        await emailService.sendCaseSubmissionEmail(emailData);
        
        // Send visitor confirmation
        await emailService.sendCaseConfirmationEmail(emailData);
        
        console.log("Email notifications sent successfully");
      } catch (emailError) {
        console.error("Email notification failed (non-blocking):", emailError);
        // Don't block the user flow if email fails
      }
    } catch (error: any) {
      console.error("Case submission error:", error);
      
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again or contact us directly",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  // Success screen
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

            {/* Progress Indicator */}
            <div className="mt-10 flex items-center justify-center gap-2">
              <div className="flex items-center gap-2">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  currentStep === 1 ? "bg-white text-primary border-white" : "bg-primary/20 text-white border-white/50"
                } font-bold`}>
                  {currentStep > 1 ? <CheckCircle className="h-5 w-5" /> : "1"}
                </div>
                <span className={`text-sm font-medium ${currentStep === 1 ? "text-white" : "text-white/70"}`}>
                  Information
                </span>
              </div>
              <div className="w-12 h-0.5 bg-white/30" />
              <div className="flex items-center gap-2">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  currentStep === 2 ? "bg-white text-primary border-white" : currentStep > 2 ? "bg-primary/20 text-white border-white/50" : "bg-primary/10 text-white/50 border-white/30"
                } font-bold`}>
                  {currentStep > 2 ? <CheckCircle className="h-5 w-5" /> : "2"}
                </div>
                <span className={`text-sm font-medium ${currentStep === 2 ? "text-white" : "text-white/70"}`}>
                  Review
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Video Section */}
      {currentStep === 1 && (
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
      )}

      {/* Form Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          
          {/* Step 1: Information Collection */}
          {currentStep === 1 && (
            <>
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
                  <CardTitle className="text-2xl font-heading">Step 1: Case Information</CardTitle>
                  <CardDescription>
                    Please provide as much detail as possible. All fields marked with * are required.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input 
                          id="fullName" 
                          value={formData.fullName}
                          onChange={(e) => handleFieldChange("fullName", e.target.value)}
                          placeholder="John Doe"
                          className={errors.fullName && touched.fullName ? "border-red-500" : ""}
                        />
                        {errors.fullName && touched.fullName && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleFieldChange("email", e.target.value)}
                          placeholder="john@example.com"
                          className={errors.email && touched.email ? "border-red-500" : ""}
                        />
                        {errors.email && touched.email && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleFieldChange("phone", e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className={errors.phone && touched.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && touched.phone && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Input 
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleFieldChange("country", e.target.value)}
                          placeholder="United States"
                          className={errors.country && touched.country ? "border-red-500" : ""}
                        />
                        {errors.country && touched.country && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.country}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scamType">Type of Fraud *</Label>
                      <Select 
                        value={formData.scamType}
                        onValueChange={(value) => handleFieldChange("scamType", value)}
                      >
                        <SelectTrigger className={errors.scamType && touched.scamType ? "border-red-500" : ""}>
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
                      {errors.scamType && touched.scamType && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.scamType}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="amountLost">Estimated Amount Lost *</Label>
                        <Input 
                          id="amountLost"
                          value={formData.amountLost}
                          onChange={(e) => handleFieldChange("amountLost", e.target.value)}
                          placeholder="$50,000"
                          className={errors.amountLost && touched.amountLost ? "border-red-500" : ""}
                        />
                        {errors.amountLost && touched.amountLost && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.amountLost}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cryptocurrency">Cryptocurrency Used (optional)</Label>
                        <Input 
                          id="cryptocurrency"
                          value={formData.cryptocurrency}
                          onChange={(e) => handleFieldChange("cryptocurrency", e.target.value)}
                          placeholder="Bitcoin, Ethereum, USDT, etc."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="walletAddress">Wallet Address(es) (optional)</Label>
                      <Input 
                        id="walletAddress"
                        value={formData.walletAddress}
                        onChange={(e) => handleFieldChange("walletAddress", e.target.value)}
                        placeholder="Enter wallet addresses separated by commas"
                        className="font-mono text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scammerWebsite">Scammer Website or Platform URL (optional)</Label>
                      <Input 
                        id="scammerWebsite"
                        type="url"
                        value={formData.scammerWebsite}
                        onChange={(e) => handleFieldChange("scammerWebsite", e.target.value)}
                        placeholder="https://example-scam-site.com"
                        className={errors.scammerWebsite && touched.scammerWebsite ? "border-red-500" : ""}
                      />
                      {errors.scammerWebsite && touched.scammerWebsite && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.scammerWebsite}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="incidentDescription">Detailed Description of Incident *</Label>
                        <span className={`text-xs ${
                          formData.incidentDescription.length < 50 
                            ? "text-muted-foreground" 
                            : formData.incidentDescription.length >= 50 && formData.incidentDescription.length < 100
                              ? "text-orange-500"
                              : "text-green-600"
                        }`}>
                          {formData.incidentDescription.length} / 50 minimum
                        </span>
                      </div>
                      <Textarea 
                        id="incidentDescription"
                        value={formData.incidentDescription}
                        onChange={(e) => handleFieldChange("incidentDescription", e.target.value)}
                        rows={8}
                        placeholder="Please provide a detailed description of what happened, including dates, how you were contacted, amounts transferred, and any other relevant information that will help us understand your case."
                        className={`resize-none ${errors.incidentDescription && touched.incidentDescription ? "border-red-500" : ""}`}
                      />
                      {errors.incidentDescription && touched.incidentDescription && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.incidentDescription}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Tip: Include dates, contact methods, transaction details, and any communications with the scammer
                      </p>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg border-2 border-border">
                      <div className="flex items-start gap-3">
                        <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-muted-foreground">
                          <p className="font-semibold text-foreground mb-1">Privacy & Confidentiality</p>
                          <p>
                            All information submitted is protected under strict confidentiality agreements. Your case details will only be shared with authorized investigation personnel.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button 
                        type="button"
                        size="lg" 
                        onClick={handleProceedToReview}
                        className="flex-1 text-lg py-6 font-semibold"
                      >
                        Proceed to Review
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Step 2: Review & Confirm */}
          {currentStep === 2 && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">Step 2: Review Your Information</CardTitle>
                <CardDescription>
                  Please review your case details carefully before submitting. Click "Edit" to make changes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="text-lg font-semibold font-heading">Personal Information</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentStep(1)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                      <p className="font-medium">{formData.fullName}</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <p className="font-medium">{formData.phone}</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Country</p>
                      <p className="font-medium">{formData.country}</p>
                    </div>
                  </div>
                </div>

                {/* Case Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="text-lg font-semibold font-heading">Case Details</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentStep(1)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Fraud Type</p>
                      <Badge variant="outline" className="mt-1">
                        {formData.scamType.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                      </Badge>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Amount Lost</p>
                      <p className="font-medium text-red-600 text-lg">{formData.amountLost}</p>
                    </div>
                    {formData.cryptocurrency && (
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Cryptocurrency</p>
                        <p className="font-medium">{formData.cryptocurrency}</p>
                      </div>
                    )}
                    {formData.walletAddress && (
                      <div className="bg-muted/30 p-4 rounded-lg md:col-span-2">
                        <p className="text-sm text-muted-foreground mb-1">Wallet Address</p>
                        <p className="font-mono text-sm break-all">{formData.walletAddress}</p>
                      </div>
                    )}
                    {formData.scammerWebsite && (
                      <div className="bg-muted/30 p-4 rounded-lg md:col-span-2">
                        <p className="text-sm text-muted-foreground mb-1">Scammer Website</p>
                        <a 
                          href={formData.scammerWebsite} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline break-all"
                        >
                          {formData.scammerWebsite}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Incident Description */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="text-lg font-semibold font-heading">Incident Description</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentStep(1)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{formData.incidentDescription}</p>
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    By submitting this case review, you confirm that all information provided is accurate and complete to the best of your knowledge.
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    type="button"
                    size="lg" 
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="text-lg py-6 font-semibold"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Edit
                  </Button>
                  <Button 
                    type="button"
                    size="lg" 
                    onClick={handleFinalSubmit}
                    disabled={isSubmitting}
                    className="flex-1 text-lg py-6 font-semibold"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Case Review"}
                    <CheckCircle className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

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