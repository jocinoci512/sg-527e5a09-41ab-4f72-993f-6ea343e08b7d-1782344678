import { supabase } from "@/integrations/supabase/client";

// Email service using Resend API via server endpoint
// API key is securely stored in .env.local and never exposed to client

interface EmailNotificationData {
  notification_type: "case_submission" | "contact_lead" | "report_scam" | "newsletter" | "test";
  recipient_email: string;
  subject: string;
  template_name: string;
  case_id?: string;
  lead_id?: string;
  status: "sent" | "failed" | "pending";
  metadata?: Record<string, any>;
}

interface CaseEmailData {
  caseId: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  scamType: string;
  amountLost: number;
  cryptocurrency?: string;
  walletAddress?: string;
  scammerWebsite?: string;
  incidentDescription: string;
  submittedAt: string;
}

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  submittedAt: string;
}

interface ReportScamEmailData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  fraudType: string;
  dateOccurred: string;
  amountLost: number;
  cryptocurrency?: string;
  platformName?: string;
  scammerDetails?: string;
  incidentDescription: string;
  submittedAt: string;
}

export const emailService = {
  /**
   * Send case submission notification email to support@cipherstraces.com
   */
  async sendCaseSubmissionEmail(data: CaseEmailData): Promise<boolean> {
    try {
      const html = this.templates.caseSubmission(data);
      
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "support@cipherstraces.com",
          subject: `🚨 New Case Submission: ${data.scamType} - ${data.fullName}`,
          html,
          replyTo: data.email,
        }),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to send email");
      }

      // Log successful email
      await this.logEmailNotification({
        notification_type: "case_submission",
        recipient_email: "support@cipherstraces.com",
        subject: `New Case Submission: ${data.scamType} - ${data.fullName}`,
        template_name: "case_submission",
        case_id: data.caseId,
        status: "sent",
        metadata: {
          scam_type: data.scamType,
          amount_lost: data.amountLost,
          submitted_at: data.submittedAt,
        }
      });

      return true;
    } catch (error) {
      console.error("Failed to send case submission email:", error);
      
      // Log failed email
      await this.logEmailNotification({
        notification_type: "case_submission",
        recipient_email: "support@cipherstraces.com",
        subject: `New Case Submission: ${data.scamType} - ${data.fullName}`,
        template_name: "case_submission",
        case_id: data.caseId,
        status: "failed",
        metadata: {
          error: error instanceof Error ? error.message : "Unknown error",
        }
      });

      return false;
    }
  },

  /**
   * Send confirmation email to the visitor who submitted a case
   */
  async sendCaseConfirmationEmail(data: CaseEmailData): Promise<boolean> {
    try {
      const html = this.templates.caseConfirmation(data);
      
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: data.email,
          subject: `✅ Case Submission Received - Reference: ${data.caseId}`,
          html,
        }),
      });

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error("Failed to send case confirmation email:", error);
      return false;
    }
  },

  /**
   * Send contact form notification to support
   */
  async sendContactFormEmail(data: ContactEmailData): Promise<boolean> {
    try {
      const html = this.templates.contactForm(data);
      
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "support@cipherstraces.com",
          subject: `💬 New Contact Form: ${data.subject || "General Inquiry"} - ${data.name}`,
          html,
          replyTo: data.email,
        }),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to send email");
      }

      // Log email
      await this.logEmailNotification({
        notification_type: "contact_lead",
        recipient_email: "support@cipherstraces.com",
        subject: `New Contact Form: ${data.subject || "General Inquiry"}`,
        template_name: "contact_form",
        status: "sent",
        metadata: { name: data.name, email: data.email }
      });

      return true;
    } catch (error) {
      console.error("Failed to send contact form email:", error);
      return false;
    }
  },

  /**
   * Send confirmation email to contact form submitter
   */
  async sendContactConfirmationEmail(data: ContactEmailData): Promise<boolean> {
    try {
      const html = this.templates.contactConfirmation(data);
      
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: data.email,
          subject: "✅ We've Received Your Message - Cipher Trace",
          html,
        }),
      });

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error("Failed to send contact confirmation email:", error);
      return false;
    }
  },

  /**
   * Send report scam notification to support
   */
  async sendReportScamEmail(data: ReportScamEmailData): Promise<boolean> {
    try {
      const html = this.templates.reportScam(data);
      
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "support@cipherstraces.com",
          subject: `⚠️ New Scam Report: ${data.fraudType} - ${data.fullName}`,
          html,
          replyTo: data.email,
        }),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to send email");
      }

      // Log email
      await this.logEmailNotification({
        notification_type: "report_scam",
        recipient_email: "support@cipherstraces.com",
        subject: `New Scam Report: ${data.fraudType}`,
        template_name: "report_scam",
        status: "sent",
        metadata: { fraud_type: data.fraudType, amount_lost: data.amountLost }
      });

      return true;
    } catch (error) {
      console.error("Failed to send report scam email:", error);
      return false;
    }
  },

  /**
   * Send confirmation email to scam reporter
   */
  async sendReportScamConfirmationEmail(data: ReportScamEmailData): Promise<boolean> {
    try {
      const html = this.templates.reportScamConfirmation(data);
      
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: data.email,
          subject: "✅ Scam Report Received - Cipher Trace",
          html,
        }),
      });

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error("Failed to send report scam confirmation email:", error);
      return false;
    }
  },

  /**
   * Send test email to verify Resend configuration
   */
  async sendTestEmail(recipientEmail: string): Promise<{ success: boolean; message: string }> {
    try {
      const html = this.templates.testEmail();
      
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipientEmail,
          subject: "🧪 Cipher Trace - Email System Test",
          html,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        return { 
          success: true, 
          message: `Test email sent successfully to ${recipientEmail}` 
        };
      } else {
        return { 
          success: false, 
          message: result.error || "Failed to send test email" 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : "Unknown error" 
      };
    }
  },

  /**
   * Log email notification in database
   */
  async logEmailNotification(data: EmailNotificationData) {
    try {
      const { error } = await supabase
        .from("email_notifications_log")
        .insert([{
          notification_type: data.notification_type,
          recipient_email: data.recipient_email,
          subject: data.subject,
          template_name: data.template_name,
          case_id: data.case_id || null,
          lead_id: data.lead_id || null,
          status: data.status,
          metadata: data.metadata || {}
        }]);

      if (error) throw error;
    } catch (error) {
      console.error("Failed to log email notification:", error);
    }
  },

  /**
   * Get email notification history
   */
  async getEmailNotifications() {
    const { data, error } = await supabase
      .from("email_notifications_log")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get notification statistics
   */
  async getNotificationStats() {
    const { data, error } = await supabase
      .from("email_notifications_log")
      .select("status, created_at");

    if (error) throw error;

    const stats = {
      total: data?.length || 0,
      sent: data?.filter(n => n.status === "sent").length || 0,
      failed: data?.filter(n => n.status === "failed").length || 0,
      pending: data?.filter(n => n.status === "pending").length || 0,
      today: data?.filter(n => {
        const today = new Date();
        const notifDate = new Date(n.created_at);
        return notifDate.toDateString() === today.toDateString();
      }).length || 0,
    };

    return stats;
  },

  /**
   * Email templates with professional HTML formatting
   */
  templates: {
    caseSubmission: (data: CaseEmailData) => {
      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Case Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Case Submission</h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 14px;">Case Review Form</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #1e3a8a; margin: 0 0 20px 0; font-size: 20px;">📋 Case Details</h2>
              
              <table width="100%" cellpadding="10" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 6px; margin-bottom: 20px;">
                <tr>
                  <td style="font-weight: bold; color: #475569; width: 180px;">Case Reference ID:</td>
                  <td style="color: #0f172a;">${data.caseId}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #475569;">Scam Type:</td>
                  <td style="color: #0f172a;">${data.scamType}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #475569;">Amount Lost:</td>
                  <td style="color: #dc2626; font-weight: bold;">$${data.amountLost.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #475569;">Submission Date:</td>
                  <td style="color: #0f172a;">${new Date(data.submittedAt).toLocaleString()}</td>
                </tr>
              </table>

              <h2 style="color: #1e3a8a; margin: 30px 0 20px 0; font-size: 20px;">👤 Contact Information</h2>
              
              <table width="100%" cellpadding="10" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 6px; margin-bottom: 20px;">
                <tr>
                  <td style="font-weight: bold; color: #475569; width: 180px;">Full Name:</td>
                  <td style="color: #0f172a;">${data.fullName}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #475569;">Email:</td>
                  <td style="color: #0f172a;"><a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #475569;">Phone:</td>
                  <td style="color: #0f172a;"><a href="tel:${data.phone}" style="color: #3b82f6; text-decoration: none;">${data.phone}</a></td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #475569;">Country:</td>
                  <td style="color: #0f172a;">${data.country}</td>
                </tr>
              </table>

              ${data.cryptocurrency || data.walletAddress || data.scammerWebsite ? `
              <h2 style="color: #1e3a8a; margin: 30px 0 20px 0; font-size: 20px;">🔗 Blockchain Information</h2>
              
              <table width="100%" cellpadding="10" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 6px; margin-bottom: 20px;">
                ${data.cryptocurrency ? `
                <tr>
                  <td style="font-weight: bold; color: #475569; width: 180px;">Cryptocurrency:</td>
                  <td style="color: #0f172a;">${data.cryptocurrency}</td>
                </tr>
                ` : ''}
                ${data.walletAddress ? `
                <tr>
                  <td style="font-weight: bold; color: #475569;">Wallet Address:</td>
                  <td style="color: #0f172a; word-break: break-all; font-family: monospace; font-size: 12px;">${data.walletAddress}</td>
                </tr>
                ` : ''}
                ${data.scammerWebsite ? `
                <tr>
                  <td style="font-weight: bold; color: #475569;">Scammer Website:</td>
                  <td style="color: #0f172a; word-break: break-all;"><a href="${data.scammerWebsite}" style="color: #3b82f6; text-decoration: none;">${data.scammerWebsite}</a></td>
                </tr>
                ` : ''}
              </table>
              ` : ''}

              <h2 style="color: #1e3a8a; margin: 30px 0 20px 0; font-size: 20px;">📝 Incident Description</h2>
              
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6; margin-bottom: 20px;">
                <p style="color: #0f172a; margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.incidentDescription}</p>
              </div>

              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 6px; margin-top: 30px;">
                <p style="margin: 0; color: #92400e; font-size: 14px;"><strong>⚠️ Action Required:</strong> Review this case in the admin dashboard and contact the client within 24-48 hours.</p>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="https://cipherstraces.com/admin/cases" style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">View in Admin Dashboard</a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0; font-size: 12px;">Cipher Trace - Professional Fraud Investigation & Blockchain Intelligence</p>
              <p style="color: #64748b; margin: 5px 0 0 0; font-size: 12px;">
                <a href="https://cipherstraces.com" style="color: #3b82f6; text-decoration: none;">cipherstraces.com</a> | 
                <a href="mailto:support@cipherstraces.com" style="color: #3b82f6; text-decoration: none;">support@cipherstraces.com</a> | 
                <a href="tel:+16462440064" style="color: #3b82f6; text-decoration: none;">+1 (646) 244-0064</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;
    },

    caseConfirmation: (data: CaseEmailData) => {
      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Case Submission Confirmed</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Case Submission Received</h1>
              <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 14px;">We've successfully received your case review submission</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="color: #0f172a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Dear <strong>${data.fullName}</strong>,</p>
              
              <p style="color: #0f172a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for submitting your case to Cipher Trace. We've received your information and our investigation team is reviewing your submission.
              </p>

              <div style="background-color: #eff6ff; border-left: 4px solid: #3b82f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <h3 style="color: #1e3a8a; margin: 0 0 15px 0; font-size: 18px;">📋 Your Case Reference</h3>
                <p style="color: #0f172a; margin: 0; font-size: 24px; font-weight: bold; font-family: monospace;">${data.caseId}</p>
                <p style="color: #64748b; margin: 10px 0 0 0; font-size: 14px;">Please save this reference number for future correspondence</p>
              </div>

              <h3 style="color: #1e3a8a; margin: 30px 0 15px 0; font-size: 18px;">📞 What Happens Next?</h3>
              
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0;">
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                    <div style="display: inline-block; background-color: #3b82f6; color: #ffffff; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; margin-right: 15px; font-weight: bold;">1</div>
                    <strong style="color: #0f172a;">Case Review</strong>
                    <p style="color: #64748b; margin: 5px 0 0 45px; font-size: 14px;">Our team will carefully review your submission within 24-48 hours</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                    <div style="display: inline-block; background-color: #3b82f6; color: #ffffff; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; margin-right: 15px; font-weight: bold;">2</div>
                    <strong style="color: #0f172a;">Initial Contact</strong>
                    <p style="color: #64748b; margin: 5px 0 0 45px; font-size: 14px;">A senior investigator will contact you to discuss your case</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0;">
                    <div style="display: inline-block; background-color: #3b82f6; color: #ffffff; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; margin-right: 15px; font-weight: bold;">3</div>
                    <strong style="color: #0f172a;">Investigation Plan</strong>
                    <p style="color: #64748b; margin: 5px 0 0 45px; font-size: 14px;">We'll outline our investigation approach and next steps</p>
                  </td>
                </tr>
              </table>

              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 30px 0;">
                <p style="margin: 0; color: #92400e; font-size: 14px;"><strong>⏰ Response Time:</strong> You can expect to hear from us within 24-48 hours during business days.</p>
              </div>

              <h3 style="color: #1e3a8a; margin: 30px 0 15px 0; font-size: 18px;">💬 Need Immediate Assistance?</h3>
              
              <p style="color: #0f172a; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
                If your situation is urgent, you can reach us directly:
              </p>

              <table width="100%" cellpadding="10" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 6px; margin: 20px 0;">
                <tr>
                  <td style="color: #0f172a;">
                    <strong>📧 Email:</strong> <a href="mailto:support@cipherstraces.com" style="color: #3b82f6; text-decoration: none;">support@cipherstraces.com</a>
                  </td>
                </tr>
                <tr>
                  <td style="color: #0f172a;">
                    <strong>📱 Phone/WhatsApp:</strong> <a href="tel:+16462440064" style="color: #3b82f6; text-decoration: none;">+1 (646) 244-0064</a>
                  </td>
                </tr>
              </table>

              <p style="color: #0f172a; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                Thank you for trusting Cipher Trace with your case. We're committed to helping you pursue justice.
              </p>

              <p style="color: #64748b; font-size: 14px; margin: 20px 0 0 0;">
                Best regards,<br>
                <strong style="color: #0f172a;">The Cipher Trace Investigation Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0; font-size: 12px;">Cipher Trace - Professional Fraud Investigation & Blockchain Intelligence</p>
              <p style="color: #64748b; margin: 5px 0 0 0; font-size: 12px;">
                <a href="https://cipherstraces.com" style="color: #3b82f6; text-decoration: none;">cipherstraces.com</a> | 
                <a href="mailto:support@cipherstraces.com" style="color: #3b82f6; text-decoration: none;">support@cipherstraces.com</a> | 
                <a href="tel:+16462440064" style="color: #3b82f6; text-decoration: none;">+1 (646) 244-0064</a>
              </p>
              <p style="color: #94a3b8; margin: 15px 0 0 0; font-size: 11px; font-style: italic;">
                Cipher Trace provides fraud investigation, blockchain tracing, intelligence gathering, scam analysis, and recovery consultation services. 
                Recovery outcomes cannot be guaranteed and vary depending on available evidence, jurisdiction, blockchain activity, third-party cooperation, and individual case circumstances.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;
    },

    contactForm: (data: ContactEmailData) => {
      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">💬 New Contact Form Submission</h1>
              <p style="color: #e9d5ff; margin: 10px 0 0 0; font-size: 14px;">${data.subject || "General Inquiry"}</p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #7c3aed; margin: 0 0 20px 0; font-size: 20px;">Contact Information</h2>
              
              <table width="100%" cellpadding="10" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 6px; margin-bottom: 20px;">
                <tr>
                  <td style="font-weight: bold; color: #475569; width: 150px;">Name:</td>
                  <td style="color: #0f172a;">${data.name}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #475569;">Email:</td>
                  <td style="color: #0f172a;"><a href="mailto:${data.email}" style="color: #7c3aed; text-decoration: none;">${data.email}</a></td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="font-weight: bold; color: #475569;">Phone:</td>
                  <td style="color: #0f172a;"><a href="tel:${data.phone}" style="color: #7c3aed; text-decoration: none;">${data.phone}</a></td>
                </tr>
                ` : ''}
                <tr>
                  <td style="font-weight: bold; color: #475569;">Date:</td>
                  <td style="color: #0f172a;">${new Date(data.submittedAt).toLocaleString()}</td>
                </tr>
              </table>

              <h2 style="color: #7c3aed; margin: 30px 0 20px 0; font-size: 20px;">Message</h2>
              
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #7c3aed; margin-bottom: 20px;">
                <p style="color: #0f172a; margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="https://cipherstraces.com/admin/leads" style="background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%); color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">View in Admin Dashboard</a>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0; font-size: 12px;">Cipher Trace - Professional Fraud Investigation & Blockchain Intelligence</p>
              <p style="color: #64748b; margin: 5px 0 0 0; font-size: 12px;">
                <a href="https://cipherstraces.com" style="color: #7c3aed; text-decoration: none;">cipherstraces.com</a> | 
                <a href="mailto:support@cipherstraces.com" style="color: #7c3aed; text-decoration: none;">support@cipherstraces.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;
    },

    contactConfirmation: (data: ContactEmailData) => {
      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Message Received</h1>
              <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 14px;">We've received your message and will respond soon</p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 30px;">
              <p style="color: #0f172a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Dear <strong>${data.name}</strong>,</p>
              
              <p style="color: #0f172a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for contacting Cipher Trace. We've received your message and our team will review it shortly.
              </p>

              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 30px 0;">
                <p style="margin: 0; color: #92400e; font-size: 14px;"><strong>⏰ Response Time:</strong> You can expect to hear from us within 24 hours during business days.</p>
              </div>

              <p style="color: #0f172a; font-size: 16px; line-height: 1.6; margin: 30px 0;">
                In the meantime, if you have an urgent matter, feel free to call us at <a href="tel:+16462440064" style="color: #3b82f6; text-decoration: none;">+1 (646) 244-0064</a>.
              </p>

              <p style="color: #64748b; font-size: 14px; margin: 20px 0 0 0;">
                Best regards,<br>
                <strong style="color: #0f172a;">The Cipher Trace Team</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0; font-size: 12px;">Cipher Trace - Professional Fraud Investigation & Blockchain Intelligence</p>
              <p style="color: #64748b; margin: 5px 0 0 0; font-size: 12px;">
                <a href="https://cipherstraces.com" style="color: #3b82f6; text-decoration: none;">cipherstraces.com</a> | 
                <a href="mailto:support@cipherstraces.com" style="color: #3b82f6; text-decoration: none;">support@cipherstraces.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;
    },

    reportScam: (data: ReportScamEmailData) => {
      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Scam Report</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #dc2626 0%, #f87171 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">⚠️ New Scam Report</h1>
              <p style="color: #fee2e2; margin: 10px 0 0 0; font-size: 14px;">${data.fraudType}</p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #dc2626; margin: 0 0 20px 0; font-size: 20px;">Report Details</h2>
              
              <table width="100%" cellpadding="10" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 6px; margin-bottom: 20px;">
                <tr>
                  <td style="font-weight: bold; color: #475569; width: 180px;">Fraud Type:</td>
                  <td style="color: #0f172a;">${data.fraudType}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #475569;">Date Occurred:</td>
                  <td style="color: #0f172a;">${data.dateOccurred}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #475569;">Amount Lost:</td>
                  <td style="color: #dc2626; font-weight: bold;">$${data.amountLost.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #475569;">Submission Date:</td>
                  <td style="color: #0f172a;">${new Date(data.submittedAt).toLocaleString()}</td>
                </tr>
              </table>

              <h2 style="color: #dc2626; margin: 30px 0 20px 0; font-size: 20px;">Contact Information</h2>
              
              <table width="100%" cellpadding="10" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 6px; margin-bottom: 20px;">
                <tr>
                  <td style="font-weight: bold; color: #475569; width: 180px;">Name:</td>
                  <td style="color: #0f172a;">${data.fullName}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #475569;">Email:</td>
                  <td style="color: #0f172a;"><a href="mailto:${data.email}" style="color: #dc2626; text-decoration: none;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #475569;">Phone:</td>
                  <td style="color: #0f172a;"><a href="tel:${data.phone}" style="color: #dc2626; text-decoration: none;">${data.phone}</a></td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #475569;">Country:</td>
                  <td style="color: #0f172a;">${data.country}</td>
                </tr>
              </table>

              ${data.cryptocurrency || data.platformName || data.scammerDetails ? `
              <h2 style="color: #dc2626; margin: 30px 0 20px 0; font-size: 20px;">Additional Information</h2>
              
              <table width="100%" cellpadding="10" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 6px; margin-bottom: 20px;">
                ${data.cryptocurrency ? `
                <tr>
                  <td style="font-weight: bold; color: #475569; width: 180px;">Cryptocurrency:</td>
                  <td style="color: #0f172a;">${data.cryptocurrency}</td>
                </tr>
                ` : ''}
                ${data.platformName ? `
                <tr>
                  <td style="font-weight: bold; color: #475569;">Platform Name:</td>
                  <td style="color: #0f172a;">${data.platformName}</td>
                </tr>
                ` : ''}
                ${data.scammerDetails ? `
                <tr>
                  <td style="font-weight: bold; color: #475569;">Scammer Details:</td>
                  <td style="color: #0f172a; word-break: break-all;">${data.scammerDetails}</td>
                </tr>
                ` : ''}
              </table>
              ` : ''}

              <h2 style="color: #dc2626; margin: 30px 0 20px 0; font-size: 20px;">Incident Description</h2>
              
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #dc2626; margin-bottom: 20px;">
                <p style="color: #0f172a; margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.incidentDescription}</p>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="https://cipherstraces.com/admin/cases" style="background: linear-gradient(135deg, #dc2626 0%, #f87171 100%); color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">View in Admin Dashboard</a>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0; font-size: 12px;">Cipher Trace - Professional Fraud Investigation & Blockchain Intelligence</p>
              <p style="color: #64748b; margin: 5px 0 0 0; font-size: 12px;">
                <a href="https://cipherstraces.com" style="color: #dc2626; text-decoration: none;">cipherstraces.com</a> | 
                <a href="mailto:support@cipherstraces.com" style="color: #dc2626; text-decoration: none;">support@cipherstraces.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;
    },

    reportScamConfirmation: (data: ReportScamEmailData) => {
      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scam Report Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Scam Report Received</h1>
              <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 14px;">We've received your scam report and will investigate</p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 30px;">
              <p style="color: #0f172a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Dear <strong>${data.fullName}</strong>,</p>
              
              <p style="color: #0f172a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for reporting this scam to Cipher Trace. Your report helps us track fraudulent activity and protect others from similar schemes.
              </p>

              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <h3 style="color: #1e3a8a; margin: 0 0 10px 0; font-size: 16px;">⚠️ Report Type: ${data.fraudType}</h3>
                <p style="color: #64748b; margin: 0; font-size: 14px;">Amount: $${data.amountLost.toLocaleString()}</p>
              </div>

              <h3 style="color: #1e3a8a; margin: 30px 0 15px 0; font-size: 18px;">What Happens Next?</h3>
              
              <p style="color: #0f172a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Our fraud intelligence team will review your report and may contact you for additional information. If you'd like to pursue a full investigation, we can discuss your options.
              </p>

              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 30px 0;">
                <p style="margin: 0; color: #92400e; font-size: 14px;"><strong>⏰ Response Time:</strong> We'll review your report within 24-48 hours and contact you if we need additional details.</p>
              </div>

              <p style="color: #0f172a; font-size: 16px; line-height: 1.6; margin: 30px 0;">
                If you need immediate assistance, contact us at <a href="tel:+16462440064" style="color: #3b82f6; text-decoration: none;">+1 (646) 244-0064</a>.
              </p>

              <p style="color: #64748b; font-size: 14px; margin: 20px 0 0 0;">
                Best regards,<br>
                <strong style="color: #0f172a;">The Cipher Trace Intelligence Team</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0; font-size: 12px;">Cipher Trace - Professional Fraud Investigation & Blockchain Intelligence</p>
              <p style="color: #64748b; margin: 5px 0 0 0; font-size: 12px;">
                <a href="https://cipherstraces.com" style="color: #3b82f6; text-decoration: none;">cipherstraces.com</a> | 
                <a href="mailto:support@cipherstraces.com" style="color: #3b82f6; text-decoration: none;">support@cipherstraces.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;
    },

    testEmail: () => {
      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email System Test</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">🧪</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Email System Test</h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 14px;">Resend API Integration Verification</p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #6366f1; margin: 0 0 20px 0; font-size: 20px;">✅ Email System Working Perfectly!</h2>
              
              <p style="color: #0f172a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                This is a test email to verify that the Cipher Trace email notification system is functioning correctly.
              </p>

              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <h3 style="color: #065f46; margin: 0 0 15px 0; font-size: 16px;">✓ What This Test Confirms:</h3>
                <ul style="color: #064e3b; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
                  <li>Resend API is connected and authenticated</li>
                  <li>Server-side email endpoint is functional</li>
                  <li>Professional HTML email templates are rendering correctly</li>
                  <li>Emails are being delivered successfully</li>
                  <li>From address (support@cipherstraces.com) is properly configured</li>
                </ul>
              </div>

              <p style="color: #0f172a; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0;">
                If you're seeing this email, it means all email systems are operational and ready for production use.
              </p>

              <div style="background-color: #eff6ff; padding: 20px; border-radius: 6px; border: 1px solid #bfdbfe; margin: 20px 0;">
                <p style="color: #1e40af; margin: 0; font-size: 14px; line-height: 1.6;">
                  <strong>Next Steps:</strong><br>
                  • Test case submission form<br>
                  • Test contact form<br>
                  • Verify admin notifications<br>
                  • Confirm visitor confirmation emails
                </p>
              </div>

              <p style="color: #64748b; font-size: 14px; margin: 30px 0 0 0;">
                Test conducted on: ${new Date().toLocaleString()}<br>
                <strong style="color: #0f172a;">Cipher Trace Email System</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0; font-size: 12px;">Cipher Trace - Professional Fraud Investigation & Blockchain Intelligence</p>
              <p style="color: #64748b; margin: 5px 0 0 0; font-size: 12px;">
                <a href="https://cipherstraces.com" style="color: #6366f1; text-decoration: none;">cipherstraces.com</a> | 
                <a href="mailto:support@cipherstraces.com" style="color: #6366f1; text-decoration: none;">support@cipherstraces.com</a> | 
                <a href="tel:+16462440064" style="color: #6366f1; text-decoration: none;">+1 (646) 244-0064</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;
    },
  },
};