import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ChevronLeft, ChevronRight, Upload, X, AlertCircle, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function ReportScam() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [caseReferenceId, setCaseReferenceId] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    fullName: "",
    email: "",
    phone: "",
    country: "",
    preferredContactMethod: "email",
    
    // Step 2: Fraud Details
    fraudType: "",
    incidentDate: "",
    amountLost: "",
    currency: "USD",
    platformInvolved: "",
    scammerName: "",
    
    // Step 3: Blockchain Information
    walletAddress: "",
    transactionHash: "",
    exchangeUsed: "",
    cryptocurrencyType: "",
    blockchainDetails: "",
    
    // Step 4: Case Description
    incidentDescription: "",
    timelineOfEvents: "",
    additionalNotes: ""
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf', 
        'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type`,
          variant: "destructive"
        });
        return false;
      }
      
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 10MB limit`,
          variant: "destructive"
        });
        return false;
      }
      
      return true;
    });
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.fullName || !formData.email || !formData.phone || !formData.country) {
          toast({
            title: "Required fields missing",
            description: "Please fill in all required fields in Step 1",
            variant: "destructive"
          });
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          toast({
            title: "Invalid email",
            description: "Please enter a valid email address",
            variant: "destructive"
          });
          return false;
        }
        return true;
        
      case 2:
        if (!formData.fraudType || !formData.incidentDate || !formData.amountLost || !formData.currency) {
          toast({
            title: "Required fields missing",
            description: "Please fill in all required fields in Step 2",
            variant: "destructive"
          });
          return false;
        }
        return true;
        
      case 3:
        // Blockchain step is optional but if one field is filled, encourage others
        return true;
        
      case 4:
        if (!formData.incidentDescription) {
          toast({
            title: "Description required",
            description: "Please provide a detailed description of the incident",
            variant: "destructive"
          });
          return false;
        }
        return true;
        
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // Upload files to Supabase Storage
      const fileUrls: string[] = [];
      
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('case-evidence')
          .upload(filePath, file);

        if (uploadError) throw uploadError;
        
        fileUrls.push(filePath);
        setUploadProgress(((i + 1) / uploadedFiles.length) * 100);
      }

      // Submit case to database
      const { data: caseData, error: caseError } = await supabase
        .from('case_reviews')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          preferred_contact_method: formData.preferredContactMethod,
          scam_type: formData.fraudType,
          incident_date: formData.incidentDate,
          amount_lost: parseFloat(formData.amountLost.replace(/[^0-9.-]+/g, "")) || 0,
          currency: formData.currency,
          platform_involved: formData.platformInvolved,
          scammer_name: formData.scammerName,
          wallet_address: formData.walletAddress,
          transaction_hash: formData.transactionHash,
          exchange_used: formData.exchangeUsed,
          cryptocurrency_used: formData.cryptocurrencyType,
          incident_description: formData.incidentDescription,
          timeline_of_events: formData.timelineOfEvents,
          additional_notes: formData.additionalNotes,
          file_attachments: fileUrls,
          status: 'submitted'
        }])
        .select()
        .single();

      if (caseError) throw caseError;

      setCaseReferenceId(caseData.case_reference_id);
      setSubmissionDate(new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
      
      setCurrentStep(6); // Success screen
      
      toast({
        title: "Case submitted successfully",
        description: `Reference ID: ${caseData.case_reference_id}`,
      });

      // Send email notifications
      const emailData = {
        caseId: caseData.case_reference_id || caseData.id,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        scamType: formData.fraudType,
        amountLost: parseFloat(formData.amountLost.replace(/[^0-9.-]+/g, "")) || 0,
        cryptocurrency: formData.cryptocurrencyType || undefined,
        walletAddress: formData.walletAddress || undefined,
        scammerWebsite: formData.platformInvolved || undefined,
        incidentDescription: formData.incidentDescription,
        submittedAt: new Date().toISOString(),
      };

      try {
        const { emailService } = await import("@/services/emailService");
        
        // Send admin notification to support@cipherstraces.com
        await emailService.sendCaseSubmissionEmail(emailData);
        
        // Send visitor confirmation
        await emailService.sendCaseConfirmationEmail(emailData);
        
        console.log("Email notifications sent successfully");
      } catch (emailError) {
        console.error("Email notification failed (non-blocking):", emailError);
        // Don't block the user flow if email fails
      }
    } catch (error: any) {
      console.error("Error submitting case:", error);
      toast({
        title: "Submission failed",
        description: error.message || "There was an error submitting your case. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success screen
  if (currentStep === 6) {
    const whatsappMessage = encodeURIComponent(
      `Hello, I just submitted a fraud case through Cipher Trace. My Reference ID is ${caseReferenceId}. I would like to follow up regarding my case.`
    );
    const whatsappUrl = `https://wa.me/16462440064?text=${whatsappMessage}`;

    return (
      <Layout>
        <SEO 
          title="Case Submitted Successfully | Cipher Trace"
          description="Your fraud case has been submitted successfully. Our team will review your case shortly."
        />
        
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20 mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-heading mb-4">
                Thank You
              </h1>
              <p className="text-xl text-muted-foreground">
                Your fraud case has been successfully submitted.
              </p>
            </div>

            <Card className="border-2 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">Case Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Reference ID</p>
                    <p className="text-lg font-bold text-primary font-mono">{caseReferenceId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Submission Date</p>
                    <p className="text-lg font-semibold">{submissionDate}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                    Estimated Review Time
                  </p>
                  <p className="text-blue-700 dark:text-blue-300">
                    24-48 hours
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  <h3 className="font-semibold text-foreground">What happens next?</h3>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                      <span>Our investigation team reviews your case details and evidence</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                      <span>A senior investigator will contact you within 24-48 hours</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">3</span>
                      <span>We discuss investigation options and provide transparent pricing</span>
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <p className="text-sm text-center text-muted-foreground">
                Save your reference ID: <span className="font-mono font-semibold text-foreground">{caseReferenceId}</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="flex-1">
                  <Link href="/">Return to Homepage</Link>
                </Button>
                <Button asChild size="lg" variant="default" className="flex-1 bg-green-600 hover:bg-green-700">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Follow Up on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title="Report a Scam | Cipher Trace - Professional Fraud Investigation"
        description="Submit a detailed fraud report for professional investigation. Our blockchain experts will review your case and provide guidance on recovery options."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-16 lg:py-24">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-heading mb-4">
              Report a Fraud Case
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Complete our secure multi-step form to submit your fraud case for professional investigation
            </p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="border-b border-border bg-background sticky top-16 z-30">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-3 text-xs">
            <span className={currentStep >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>Personal</span>
            <span className={currentStep >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>Fraud Details</span>
            <span className={currentStep >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>Blockchain</span>
            <span className={currentStep >= 4 ? "text-primary font-medium" : "text-muted-foreground"}>Description</span>
            <span className={currentStep >= 5 ? "text-primary font-medium" : "text-muted-foreground"}>Evidence</span>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">
                {currentStep === 1 && "Personal Information"}
                {currentStep === 2 && "Fraud Details"}
                {currentStep === 3 && "Blockchain & Transaction Information"}
                {currentStep === 4 && "Case Description"}
                {currentStep === 5 && "Upload Evidence"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Provide your contact information for case follow-up"}
                {currentStep === 2 && "Tell us about the fraud incident"}
                {currentStep === 3 && "Provide blockchain and transaction details (if applicable)"}
                {currentStep === 4 && "Describe what happened in detail"}
                {currentStep === 5 && "Upload supporting documents and evidence"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        placeholder="United States"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredContactMethod">Preferred Contact Method *</Label>
                      <Select
                        value={formData.preferredContactMethod}
                        onValueChange={(value) => handleInputChange('preferredContactMethod', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Fraud Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fraudType">Type of Fraud *</Label>
                    <Select
                      value={formData.fraudType}
                      onValueChange={(value) => handleInputChange('fraudType', value)}
                    >
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

                  <div className="space-y-2">
                    <Label htmlFor="incidentDate">Date Incident Occurred *</Label>
                    <Input
                      id="incidentDate"
                      type="date"
                      value={formData.incidentDate}
                      onChange={(e) => handleInputChange('incidentDate', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="amountLost">Amount Lost *</Label>
                      <Input
                        id="amountLost"
                        value={formData.amountLost}
                        onChange={(e) => handleInputChange('amountLost', e.target.value)}
                        placeholder="50000"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency *</Label>
                      <Select
                        value={formData.currency}
                        onValueChange={(value) => handleInputChange('currency', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="CAD">CAD</SelectItem>
                          <SelectItem value="AUD">AUD</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="platformInvolved">Platform or Website Involved</Label>
                    <Input
                      id="platformInvolved"
                      value={formData.platformInvolved}
                      onChange={(e) => handleInputChange('platformInvolved', e.target.value)}
                      placeholder="example-trading-platform.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scammerName">Scammer Name (Optional)</Label>
                    <Input
                      id="scammerName"
                      value={formData.scammerName}
                      onChange={(e) => handleInputChange('scammerName', e.target.value)}
                      placeholder="If known"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Blockchain Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-900 dark:text-blue-100">
                        <p className="font-medium mb-1">Optional but Helpful</p>
                        <p>Blockchain and transaction information significantly helps our investigation. Provide what you have available.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="walletAddress">Wallet Address</Label>
                    <Input
                      id="walletAddress"
                      value={formData.walletAddress}
                      onChange={(e) => handleInputChange('walletAddress', e.target.value)}
                      placeholder="0x..."
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transactionHash">Transaction Hash/ID</Label>
                    <Input
                      id="transactionHash"
                      value={formData.transactionHash}
                      onChange={(e) => handleInputChange('transactionHash', e.target.value)}
                      placeholder="0x..."
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exchangeUsed">Exchange Used</Label>
                    <Input
                      id="exchangeUsed"
                      value={formData.exchangeUsed}
                      onChange={(e) => handleInputChange('exchangeUsed', e.target.value)}
                      placeholder="Binance, Coinbase, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cryptocurrencyType">Cryptocurrency Type</Label>
                    <Input
                      id="cryptocurrencyType"
                      value={formData.cryptocurrencyType}
                      onChange={(e) => handleInputChange('cryptocurrencyType', e.target.value)}
                      placeholder="Bitcoin, Ethereum, USDT, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blockchainDetails">Additional Blockchain Details</Label>
                    <Textarea
                      id="blockchainDetails"
                      value={formData.blockchainDetails}
                      onChange={(e) => handleInputChange('blockchainDetails', e.target.value)}
                      rows={4}
                      placeholder="Any additional blockchain or transaction information"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Case Description */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="incidentDescription">Detailed Description of Incident *</Label>
                    <Textarea
                      id="incidentDescription"
                      value={formData.incidentDescription}
                      onChange={(e) => handleInputChange('incidentDescription', e.target.value)}
                      rows={8}
                      placeholder="Please provide a comprehensive description of what happened, including how you were contacted, what was promised, amounts transferred, and any other relevant details..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timelineOfEvents">Timeline of Events</Label>
                    <Textarea
                      id="timelineOfEvents"
                      value={formData.timelineOfEvents}
                      onChange={(e) => handleInputChange('timelineOfEvents', e.target.value)}
                      rows={6}
                      placeholder="Provide a chronological timeline of key events (e.g., March 1: Initial contact, March 5: First payment, March 10: Realized it was a scam)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                      rows={4}
                      placeholder="Any additional information you think would be helpful"
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Evidence Upload */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Upload Supporting Evidence</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm font-medium text-foreground mb-2">
                        Drag and drop files here, or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        Supported: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX (Max 10MB per file)
                      </p>
                      <Input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                        onChange={handleFileUpload}
                        className="max-w-xs mx-auto"
                      />
                    </div>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label>Uploaded Files ({uploadedFiles.length})</Label>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border-2 border-border">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium truncate">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="flex-shrink-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {isSubmitting && uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="space-y-2">
                      <Label>Uploading Evidence...</Label>
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="text-xs text-muted-foreground text-center">
                        {Math.round(uploadProgress)}% Complete
                      </p>
                    </div>
                  )}

                  <div className="bg-muted/30 p-4 rounded-lg border-2 border-border">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Recommended Evidence:</strong> Screenshots of conversations, transaction records, wallet addresses, emails, platform URLs, account statements, or any documentation related to the fraud.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-border">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={isSubmitting}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                )}
                
                {currentStep < 5 && (
                  <Button
                    onClick={nextStep}
                    className="ml-auto"
                  >
                    Next Step
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                
                {currentStep === 5 && (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="ml-auto"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Case"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto">
              All case information is protected under strict confidentiality. By submitting this form, you consent to Cipher Trace reviewing your case and contacting you regarding investigation services.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}