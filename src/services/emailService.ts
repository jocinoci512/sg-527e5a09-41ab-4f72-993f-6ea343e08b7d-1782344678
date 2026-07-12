import { supabase } from "@/integrations/supabase/client";

export const emailService = {
  // ============================================
  // EMAIL NOTIFICATION LOGGING
  // ============================================

  async logEmailNotification(data: {
    notification_type: string;
    recipient_email: string;
    subject: string;
    template_name?: string;
    case_id?: string;
    lead_id?: string;
    status?: string;
    error_message?: string;
    metadata?: any;
  }) {
    const { data: log, error } = await supabase
      .from("email_notifications_log")
      .insert({
        notification_type: data.notification_type,
        recipient_email: data.recipient_email,
        subject: data.subject,
        template_name: data.template_name,
        case_id: data.case_id,
        lead_id: data.lead_id,
        status: data.status || "sent",
        error_message: data.error_message,
        metadata: data.metadata
      } as any)
      .select()
      .single();

    if (error) throw error;
    return log;
  },

  async getNotificationHistory(filters?: {
    notification_type?: string;
    recipient_email?: string;
    limit?: number;
  }) {
    let query = supabase
      .from("email_notifications_log")
      .select("*")
      .order("sent_at", { ascending: false });

    if (filters?.notification_type) {
      query = query.eq("notification_type", filters.notification_type);
    }

    if (filters?.recipient_email) {
      query = query.eq("recipient_email", filters.recipient_email);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  // ============================================
  // EMAIL TEMPLATES
  // ============================================

  generateCaseSubmissionEmailHTML(caseData: any): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Case Submission - Cipher Trace</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: white;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      border-bottom: 3px solid #1e40af;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #1e40af;
    }
    .alert {
      background-color: #fef2f2;
      border-left: 4px solid #dc2626;
      padding: 15px;
      margin-bottom: 20px;
      border-radius: 4px;
    }
    .info-row {
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .info-label {
      font-weight: 600;
      width: 150px;
      color: #6b7280;
    }
    .info-value {
      flex: 1;
      color: #111827;
    }
    .priority-high {
      background-color: #dc2626;
      color: white;
      padding: 4px 12px;
      border-radius: 4px;
      display: inline-block;
      font-size: 12px;
      font-weight: bold;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      font-size: 14px;
      color: #6b7280;
      text-align: center;
    }
    .btn {
      display: inline-block;
      background-color: #1e40af;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      margin-top: 20px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🔍 Cipher Trace</div>
      <p style="margin: 10px 0 0 0; color: #6b7280;">Professional Fraud Investigation</p>
    </div>

    <div class="alert">
      <strong>⚠️ NEW CASE SUBMISSION ALERT</strong>
      <p style="margin: 8px 0 0 0;">A new case review has been submitted and requires immediate attention.</p>
    </div>

    <h2 style="color: #1e40af; margin-bottom: 20px;">Case Details</h2>

    <div class="info-row">
      <div class="info-label">Submission ID:</div>
      <div class="info-value"><strong>${caseData.id}</strong></div>
    </div>

    <div class="info-row">
      <div class="info-label">Full Name:</div>
      <div class="info-value">${caseData.full_name}</div>
    </div>

    <div class="info-row">
      <div class="info-label">Email:</div>
      <div class="info-value"><a href="mailto:${caseData.email}">${caseData.email}</a></div>
    </div>

    <div class="info-row">
      <div class="info-label">Phone:</div>
      <div class="info-value">${caseData.phone || 'Not provided'}</div>
    </div>

    <div class="info-row">
      <div class="info-label">Country:</div>
      <div class="info-value">${caseData.country || 'Not specified'}</div>
    </div>

    <div class="info-row">
      <div class="info-label">Scam Type:</div>
      <div class="info-value"><strong>${caseData.scam_type}</strong></div>
    </div>

    <div class="info-row">
      <div class="info-label">Amount Lost:</div>
      <div class="info-value">
        <span class="priority-high">$${Number(caseData.amount_lost || 0).toLocaleString()}</span>
      </div>
    </div>

    ${caseData.cryptocurrency_used ? `
    <div class="info-row">
      <div class="info-label">Cryptocurrency:</div>
      <div class="info-value">${caseData.cryptocurrency_used}</div>
    </div>
    ` : ''}

    ${caseData.wallet_address ? `
    <div class="info-row">
      <div class="info-label">Wallet Address:</div>
      <div class="info-value"><code style="background: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${caseData.wallet_address}</code></div>
    </div>
    ` : ''}

    ${caseData.scammer_website ? `
    <div class="info-row">
      <div class="info-label">Scammer Website:</div>
      <div class="info-value"><a href="${caseData.scammer_website}" target="_blank">${caseData.scammer_website}</a></div>
    </div>
    ` : ''}

    <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 6px;">
      <h3 style="margin-top: 0; color: #1e40af;">Incident Description:</h3>
      <p style="white-space: pre-wrap; color: #374151;">${caseData.incident_description}</p>
    </div>

    ${caseData.evidence_files || caseData.screenshot_files ? `
    <div style="margin-top: 20px;">
      <h3 style="color: #1e40af;">Attachments:</h3>
      <p style="color: #6b7280;">Files have been uploaded and are available in the admin dashboard.</p>
    </div>
    ` : ''}

    <div style="text-align: center; margin-top: 30px;">
      <a href="https://cipherstraces.com/admin/cases" class="btn">
        View in Admin Dashboard →
      </a>
    </div>

    <div class="footer">
      <p><strong>Cipher Trace</strong> | Professional Fraud Investigation</p>
      <p>Support@cipherstraces.com | +1 (646) 244-0064</p>
      <p style="font-size: 12px; margin-top: 10px;">
        This is an automated notification. Please respond from the admin dashboard.
      </p>
    </div>
  </div>
</body>
</html>
    `;
  },

  generateContactLeadEmailHTML(leadData: any): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Inquiry - Cipher Trace</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: white;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      border-bottom: 3px solid #1e40af;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .info-row {
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .label { font-weight: 600; color: #6b7280; }
    .value { color: #111827; margin-top: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="color: #1e40af; margin: 0;">📧 New Contact Inquiry</h1>
    </div>

    <div class="info-row">
      <div class="label">Name:</div>
      <div class="value">${leadData.name}</div>
    </div>

    <div class="info-row">
      <div class="label">Email:</div>
      <div class="value"><a href="mailto:${leadData.email}">${leadData.email}</a></div>
    </div>

    ${leadData.phone ? `
    <div class="info-row">
      <div class="label">Phone:</div>
      <div class="value">${leadData.phone}</div>
    </div>
    ` : ''}

    <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 6px;">
      <h3 style="margin-top: 0;">Message:</h3>
      <p style="white-space: pre-wrap;">${leadData.message}</p>
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <a href="https://cipherstraces.com/admin/leads" 
         style="display: inline-block; background-color: #1e40af; color: white; 
                padding: 12px 24px; text-decoration: none; border-radius: 6px;">
        View in Dashboard →
      </a>
    </div>
  </div>
</body>
</html>
    `;
  }
};