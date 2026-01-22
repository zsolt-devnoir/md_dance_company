import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  projectType: z.string().min(1),
  message: z.string().min(10),
});

const resendApiKey = process.env.RESEND_API_KEY;
const contactToEmail = process.env.CONTACT_TO_EMAIL;
const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    if (!resend || !contactToEmail || !contactFromEmail) {
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 500 },
      );
    }

    const subject = `New contact form message from ${data.name}`;
    const text = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company || "-"}`,
      `Project Type: ${data.projectType}`,
      "",
      data.message,
    ].join("\n");

    await resend.emails.send({
      from: contactFromEmail,
      to: contactToEmail,
      replyTo: data.email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data.", details: error.flatten() },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Unable to send message." },
      { status: 500 },
    );
  }
}
