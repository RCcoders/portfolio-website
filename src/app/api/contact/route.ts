import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message content is required.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Resend API key is not configured on server.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const destinationEmail = process.env.CONTACT_DESTINATION_EMAIL || 'chawlaraghav62@gmail.com';

    const sanitize = (str: string) =>
      str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const cleanName = sanitize(name.trim());
    const cleanEmail = sanitize(email.trim());
    const cleanSubject = sanitize(subject ? subject.trim() : 'New Portfolio Inquiry');
    const cleanMessage = sanitize(message.trim());

    const result = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [destinationEmail],
      replyTo: cleanEmail,
      subject: `[Portfolio] ${cleanSubject} — from ${cleanName}`,
      html: `
        <div style="font-family: 'Courier New', Courier, monospace; background-color: #0d0d0d; color: #e5e5e5; padding: 30px; border-radius: 8px; border: 1px solid #262626; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff3333; margin-top: 0; letter-spacing: 0.1em; text-transform: uppercase; font-size: 18px;">
            [NEW PORTFOLIO MESSAGE]
          </h2>
          <div style="height: 1px; background-color: #262626; margin: 20px 0;"></div>
          
          <p style="margin: 8px 0; font-size: 13px;"><strong style="color: #888;">SENDER:</strong> ${cleanName}</p>
          <p style="margin: 8px 0; font-size: 13px;"><strong style="color: #888;">REPLY-TO:</strong> <a href="mailto:${cleanEmail}" style="color: #ff3333; text-decoration: none;">${cleanEmail}</a></p>
          <p style="margin: 8px 0; font-size: 13px;"><strong style="color: #888;">SUBJECT:</strong> ${cleanSubject}</p>
          
          <div style="height: 1px; background-color: #262626; margin: 20px 0;"></div>
          
          <p style="color: #888; font-size: 12px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em;">[MESSAGE CONTENT]</p>
          <div style="background-color: #141414; padding: 18px; border-radius: 6px; border: 1px solid #1f1f1f; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #fff;">${cleanMessage}</div>
          
          <div style="height: 1px; background-color: #262626; margin: 25px 0 15px;"></div>
          <p style="font-size: 10px; color: #555; text-transform: uppercase; letter-spacing: 0.1em; margin: 0;">
            Sent automatically via Resend API from Portfolio Contact Form
          </p>
        </div>
      `,
    });

    if (result.error) {
      console.error('Resend send error:', result.error);
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: result.data?.id });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to process email request';
    console.error('Contact API error:', error);
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
