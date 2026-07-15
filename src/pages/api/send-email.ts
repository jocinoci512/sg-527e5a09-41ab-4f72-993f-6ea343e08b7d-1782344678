import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { to, subject, html, replyTo } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({ 
        success: false,
        error: "Missing required fields: to, subject, html" 
      });
    }

    const emailData: any = {
      from: "Cipher Trace <support@cipherstraces.com>",
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    };

    if (replyTo) {
      emailData.replyTo = replyTo;
    }

    const data = await resend.emails.send(emailData);

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Resend API error:", error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || "Failed to send email" 
    });
  }
}