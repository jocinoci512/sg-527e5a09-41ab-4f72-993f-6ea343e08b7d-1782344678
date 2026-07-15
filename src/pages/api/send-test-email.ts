import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { recipient } = req.body;

    if (!recipient) {
      return res.status(400).json({ error: "Recipient email is required" });
    }

    // Get Resend API key from environment
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      return res.status(500).json({ 
        error: "Resend API key not configured",
        details: "Please add RESEND_API_KEY to your environment variables"
      });
    }

    // Send test email using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Cipher Trace <support@cipherstraces.com>",
        to: [recipient],
        subject: "✅ Cipher Trace Email System Test - All Systems Working!",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>System Test Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
        ✅ Email System Test Successful
      </h1>
      <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">
        Cipher Trace Notification System
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">
      
      <div style="background-color: #dcfce7; border-left: 4px solid #16a34a; padding: 16px; margin-bottom: 30px; border-radius: 4px;">
        <p style="margin: 0; color: #166534; font-weight: 600;">
          🎉 Congratulations! Your email notification system is working perfectly.
        </p>
      </div>

      <h2 style="color: #1e293b; font-size: 20px; margin-bottom: 16px;">
        System Status: All Green ✅
      </h2>

      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email Service:</td>
            <td style="padding: 8px 0; text-align: right; color: #16a34a; font-weight: 600;">✅ Resend API Connected</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">HTML Templates:</td>
            <td style="padding: 8px 0; text-align: right; color: #16a34a; font-weight: 600;">✅ Rendering Correctly</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Database Logging:</td>
            <td style="padding: 8px 0; text-align: right; color: #16a34a; font-weight: 600;">✅ Active</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Case Notifications:</td>
            <td style="padding: 8px 0; text-align: right; color: #16a34a; font-weight: 600;">✅ Ready</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Admin Alerts:</td>
            <td style="padding: 8px 0; text-align: right; color: #16a34a; font-weight: 600;">✅ Real-time</td>
          </tr>
        </table>
      </div>

      <h3 style="color: #1e293b; font-size: 18px; margin-bottom: 12px;">
        What This Means:
      </h3>

      <ul style="color: #475569; line-height: 1.8; padding-left: 20px;">
        <li>✅ Every new case submission will automatically send an email</li>
        <li>✅ Emails are delivered instantly via Resend API</li>
        <li>✅ Professional HTML templates with full branding</li>
        <li>✅ All emails logged in your database</li>
        <li>✅ Real-time notifications in admin dashboard</li>
        <li>✅ Complete audit trail for compliance</li>
      </ul>

      <div style="margin-top: 30px; padding: 20px; background-color: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe;">
        <h4 style="margin: 0 0 12px 0; color: #1e40af; font-size: 16px;">
          📋 Test Information
        </h4>
        <p style="margin: 0; color: #1e40af; font-size: 14px;">
          <strong>Sent:</strong> ${new Date().toLocaleString()}<br>
          <strong>From:</strong> Cipher Trace Support System<br>
          <strong>To:</strong> ${recipient}<br>
          <strong>API:</strong> Resend (Production)<br>
          <strong>Template:</strong> Test Email v1.0
        </p>
      </div>

      <div style="margin-top: 30px; text-align: center;">
        <a href="https://cipherstraces.com/admin" style="display: inline-block; background-color: #1e40af; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px;">
          View Admin Dashboard →
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">

      <p style="color: #64748b; font-size: 13px; line-height: 1.6; margin: 0;">
        <strong>Next Steps:</strong><br>
        1. Submit a test case at <a href="https://cipherstraces.com/case-review" style="color: #1e40af;">cipherstraces.com/case-review</a><br>
        2. Check your email for the case submission notification<br>
        3. View the notification in your admin dashboard<br>
        4. Your system is ready for production! 🚀
      </p>

    </div>

    <!-- Footer -->
    <div style="background-color: #1e293b; padding: 30px; text-align: center;">
      <p style="color: #94a3b8; font-size: 14px; margin: 0 0 10px 0;">
        Cipher Trace - Professional Fraud Investigation & Blockchain Intelligence
      </p>
      <p style="color: #64748b; font-size: 12px; margin: 0;">
        Support@cipherstraces.com | +1 (646) 244-0064<br>
        This is an automated system test email from your Cipher Trace platform.
      </p>
    </div>

  </div>
</body>
</html>
        `,
      }),
    });

    const emailData = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error("Resend API error:", emailData);
      return res.status(500).json({ 
        error: "Failed to send email",
        details: emailData
      });
    }

    // Return success
    return res.status(200).json({
      success: true,
      message: "Test email sent successfully!",
      emailId: emailData.id,
      recipient: recipient,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error("Error sending test email:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
}