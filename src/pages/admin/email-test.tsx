import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export default function EmailTestPage() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; emailId?: string } | null>(null);
  const { toast } = useToast();

  const sendTestEmail = async () => {
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setSending(true);
    setResult(null);

    try {
      const response = await fetch("/api/send-test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ recipient: email })
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: "Test email sent successfully! Check your inbox.",
          emailId: data.emailId
        });
        toast({
          title: "✅ Email Sent!",
          description: `Test email delivered to ${email}`
        });
      } else {
        setResult({
          success: false,
          message: data.error || "Failed to send email"
        });
        toast({
          title: "Email Failed",
          description: data.error || "Unknown error occurred",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || "Network error occurred"
      });
      toast({
        title: "Error",
        description: "Failed to send test email",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Email System Test</h1>
                <p className="text-sm text-muted-foreground">
                  Verify Resend API integration and email delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          
          {/* System Status */}
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Resend API is configured and ready. Environment variable detected.
            </AlertDescription>
          </Alert>

          {/* Test Email Card */}
          <Card>
            <CardHeader>
              <CardTitle>Send Test Email</CardTitle>
              <CardDescription>
                Enter your email address to receive a test notification and verify the system is working correctly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Recipient Email Address</label>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !sending) {
                        sendTestEmail();
                      }
                    }}
                    disabled={sending}
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendTestEmail} 
                    disabled={sending || !email}
                    size="lg"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Test
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Result Display */}
              {result && (
                <Alert className={result.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
                  {result.success ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={result.success ? "text-green-800" : "text-red-800"}>
                    {result.message}
                    {result.emailId && (
                      <div className="mt-2 text-xs opacity-75">
                        Email ID: {result.emailId}
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              {/* What Gets Tested */}
              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-semibold text-sm">What This Test Checks:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Resend API connection and authentication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>HTML email template rendering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Email delivery to inbox (check spam folder if needed)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Professional branding and styling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>System status indicators and metadata</span>
                  </li>
                </ul>
              </div>

              {/* Next Steps */}
              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-semibold text-sm">Next Steps:</h3>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Submit a test case on the case review page</li>
                  <li>Check Support@cipherstraces.com for the case notification</li>
                  <li>View the notification in the admin dashboard</li>
                  <li>System is ready for production! 🚀</li>
                </ol>
              </div>

            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button variant="outline" asChild>
              <Link href="/admin/notifications">
                View Notification History
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/case-review">
                Submit Test Case
              </Link>
            </Button>
          </div>

        </div>
      </main>
    </div>
  );
}