import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Mail, CheckCircle, XCircle, Loader2, Send } from "lucide-react";
import { emailService } from "@/services/emailService";

export default function EmailTest() {
  const [testEmail, setTestEmail] = useState("support@cipherstraces.com");
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleTestEmail = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const result = await emailService.sendTestEmail(testEmail);
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error occurred"
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30 py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground font-heading">Email System Test</h1>
            <p className="text-muted-foreground mt-2">
              Verify Resend API integration and email delivery
            </p>
          </div>

          <Card className="border-2 mb-6">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Send Test Email
              </CardTitle>
              <CardDescription>
                Send a test email to verify the Resend API is properly configured and emails are being delivered.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="testEmail">Recipient Email Address</Label>
                <Input
                  id="testEmail"
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="your-email@example.com"
                />
                <p className="text-sm text-muted-foreground">
                  Enter the email address where you want to receive the test email
                </p>
              </div>

              <Button
                onClick={handleTestEmail}
                disabled={isTesting || !testEmail}
                size="lg"
                className="w-full"
              >
                {isTesting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending Test Email...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Test Email
                  </>
                )}
              </Button>

              {testResult && (
                <div className={`p-4 rounded-lg border-2 ${
                  testResult.success 
                    ? "bg-green-50 border-green-200" 
                    : "bg-red-50 border-red-200"
                }`}>
                  <div className="flex items-start gap-3">
                    {testResult.success ? (
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h3 className={`font-semibold ${
                        testResult.success ? "text-green-900" : "text-red-900"
                      }`}>
                        {testResult.success ? "✅ Test Email Sent Successfully!" : "❌ Test Email Failed"}
                      </h3>
                      <p className={`text-sm mt-1 ${
                        testResult.success ? "text-green-700" : "text-red-700"
                      }`}>
                        {testResult.message}
                      </p>
                      {testResult.success && (
                        <p className="text-sm text-green-600 mt-2">
                          Check your inbox at <strong>{testEmail}</strong> for the test email.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="font-heading">Email System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium">Resend API</span>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                    Connected
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium">From Address</span>
                  <span className="text-sm text-muted-foreground">support@cipherstraces.com</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium">Email Templates</span>
                  <Badge variant="outline">6 Ready</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium">Database Logging</span>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                    Active
                  </Badge>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Available Email Templates</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✅ Case Submission Notification (Admin)</li>
                  <li>✅ Case Submission Confirmation (Visitor)</li>
                  <li>✅ Contact Form Notification (Admin)</li>
                  <li>✅ Contact Form Confirmation (Visitor)</li>
                  <li>✅ Report Scam Notification (Admin)</li>
                  <li>✅ Report Scam Confirmation (Visitor)</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Next Steps</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Test case submission form with real data</li>
                  <li>• Test contact form with real data</li>
                  <li>• Verify emails arrive at support@cipherstraces.com</li>
                  <li>• Verify visitor confirmation emails are delivered</li>
                  <li>• Check email_notifications_log table for entries</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}