import { supabase } from "@/integrations/supabase/client";

// Resend API configuration
const RESEND_API_KEY = process.env.NEXT_PUBLIC_RESEND_API_KEY || "";
const RESEND_API_URL = "https://api.resend.com/emails";

export const emailService = {
  /**
   * Send email via Resend API
   */
  async sendEmail(params: {
    to: string;
    subject: string;
    html: string;
    from?: string;
  }): Promise<boolean> {
    try {
      if (!RESEND_API_KEY) {
        console.warn("RESEND_API_KEY not configured. Email will be logged but not sent.");
        return false;
      }

      const response = await fetch(RESEND_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: params.from || "Cipher Trace <notifications@cipherstraces.com>",
          to: [params.to],
          subject: params.subject,
          html: params.html,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Resend API error:", error);
        return false;
      }

      const data = await response.json();
      console.log("Email sent successfully via Resend:", data);
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  },

  /**
   * Log email notification to database and send via Resend
   */
  async logEmailNotification(notification: {
    notification_type: string;
    recipient_email: string;
    subject: string;
    template_name: string;
    case_id?: string;
    lead_id?: string;
    status: "sent" | "failed" | "pending";
    metadata?: any;
  }): Promise<void> {
    try {
      // Generate HTML content based on template
      const htmlContent = this.generateEmailTemplate(
        notification.template_name,
        notification.metadata,
        notification.case_id
      );

      // Send email via Resend
      let emailStatus: "sent" | "failed" = "sent";
      try {
        const sent = await this.sendEmail({
          to: notification.recipient_email,
          subject: notification.subject,
          html: htmlContent,
        });
        emailStatus = sent ? "sent" : "failed";
      } catch (sendError) {
        console.error("Email send failed:", sendError);
        emailStatus = "failed";
      }

      // Log to database
      const { error } = await supabase.from("email_notifications_log").insert({
        notification_type: notification.notification_type,
        recipient_email: notification.recipient_email,
        subject: notification.subject,
        template_name: notification.template_name,
        case_id: notification.case_id || null,
        lead_id: notification.lead_id || null,
        status: emailStatus,
        metadata: notification.metadata || {},
      });

      if (error) {
        console.error("Error logging email notification:", error);
      }
    } catch (error) {
      console.error("Error in logEmailNotification:", error);
    }
  },

  /**
   * Get all email notifications
   */
  async getEmailNotifications(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from("email_notifications_log")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching email notifications:", error);
      return [];
    }
  },

  /**
   * Get notification statistics
   */
  async getNotificationStats(): Promise<{
    total: number;
    sent: number;
    failed: number;
    pending: number;
    today: number;
  }> {
    try {
      const { data, error } = await supabase
        .from("email_notifications_log")
        .select("status, created_at");

      if (error) throw error;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const stats = {
        total: data?.length || 0,
        sent: data?.filter((n) => n.status === "sent").length || 0,
        failed: data?.filter((n) => n.status === "failed").length || 0,
        pending: data?.filter((n) => n.status === "pending").length || 0,
        today:
          data?.filter((n) => new Date(n.created_at) >= today).length || 0,
      };

      return stats;
    } catch (error) {
      console.error("Error fetching notification stats:", error);
      return { total: 0, sent: 0, failed: 0, pending: 0, today: 0 };
    }
  },

  /**
   * Generate HTML email template
   */
  generateEmailTemplate(
    templateName: string,
    metadata: any,
    caseId?: string
  ): string {
    if (templateName === "case_submission") {
      return this.generateCaseSubmissionEmail(metadata, caseId);
    }
    return "<p>No template found</p>";
  },

  /**
   * Generate Case Submission Email HTML
   */
  generateCaseSubmissionEmail(metadata: any, caseId?: string): string {
    const caseUrl = `https://cipherstraces.com/admin/cases${
      caseId ? `?case=${caseId}` : ""
    }`;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Case Submission - Cipher Trace</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 40px 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
        🔔 New Case Submission
      </h1>
      <p style="color: #cbd5e1; margin: 10px 0 0 0; font-size: 14px;">
        Cipher Trace Case Management System
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">
      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px 20px; margin-bottom: 30px; border-radius: 4px;">
        <p style="margin: 0; color: #92400e; font-weight: 600; font-size: 14px;">
          ⚡ Action Required: New fraud case submitted and requires review
        </p>
      </div>

      <h2 style="color: #0F172A; font-size: 20px; font-weight: 700; margin: 0 0 20px 0;">
        Case Details
      </h2>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; width: 40%;">
            Case ID:
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #0F172A; font-weight: 600; font-size: 14px;">
            ${caseId ? caseId.slice(0, 8).toUpperCase() : "N/A"}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            Scam Type:
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #0F172A; font-weight: 600; font-size: 14px;">
            ${metadata.scam_type || "Not specified"}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            Amount Lost:
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #dc2626; font-weight: 700; font-size: 16px;">
            $${metadata.amount_lost?.toLocaleString() || "0"}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            Submitted:
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #0F172A; font-size: 14px;">
            ${new Date(metadata.submitted_at).toLocaleString()}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">
            Status:
          </td>
          <td style="padding: 12px 0;">
            <span style="display: inline-block; background-color: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
              Pending Review
            </span>
          </td>
        </tr>
      </table>

      <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h3 style="color: #0F172A; font-size: 16px; font-weight: 700; margin: 0 0 12px 0;">
          📋 Next Steps
        </h3>
        <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 1.6;">
          <li style="margin-bottom: 8px;">Review case details in admin dashboard</li>
          <li style="margin-bottom: 8px;">Conduct preliminary investigation assessment</li>
          <li style="margin-bottom: 8px;">Contact client within 24-48 hours</li>
          <li style="margin-bottom: 0;">Document all findings and recommendations</li>
        </ul>
      </div>

      <div style="text-align: center; margin-top: 30px;">
        <a href="${caseUrl}" style="display: inline-block; background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          View Case in Dashboard →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px 0;">
        Cipher Trace - Professional Fraud Investigation & Blockchain Intelligence
      </p>
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        Support@cipherstraces.com • +1 (646) 244-0064
      </p>
      <p style="color: #d1d5db; font-size: 11px; margin: 16px 0 0 0;">
        This is an automated notification from the Cipher Trace case management system.
      </p>
    </div>
  </div>
</body>
</html>
    `;
  },
};