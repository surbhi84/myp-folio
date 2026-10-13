import { NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await req.json();
    const { email, message } = body;

    // Validate required message field
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    if (message.trim().length > 5000) {
      return NextResponse.json(
        { error: "Message must be under 5000 characters." },
        { status: 400 }
      );
    }

    // Validate required email field
    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (trimmedEmail.length > 320 || !emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_TO_EMAIL || "subuhikukreti@gmail.com";
    const senderEmail = trimmedEmail;

    const sanitizedMessage = escapeHtml(message.trim());
    const sanitizedSenderEmail = escapeHtml(senderEmail);

    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: senderEmail,
      subject: `New Portfolio Message from ${senderEmail}`,
      text: `You received a new message from your portfolio contact form:\n\nSender Email: ${senderEmail}\n\nMessage:\n${message.trim()}\n`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; background: #fafafa; border: 1px solid #eaeaea; border-radius: 12px; color: #111;">
          <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; color: #000; border-bottom: 1px solid #eaeaea; padding-bottom: 12px;">
            📬 New Portfolio Message
          </h2>
          <p style="font-size: 14px; margin: 16px 0 8px; color: #555;">
            <strong>Sender Contact:</strong> <span style="color: #000;">${sanitizedSenderEmail}</span>
          </p>
          <div style="margin-top: 16px; padding: 16px; background: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #222;">
${sanitizedMessage}
          </div>
          <p style="font-size: 12px; color: #777; margin-top: 20px;">💡 Tip: You can reply directly to this email to reach <strong>${sanitizedSenderEmail}</strong>.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: unknown) {
    console.error("Contact API handler error:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error occurred.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
