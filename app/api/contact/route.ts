import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/validation";
import nodemailer from "nodemailer";
import { cookies } from "next/headers";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: process.env.EMAIL_SUBJECT,
  text: "",
};

const RATE_LIMIT_MINUTES = 1;

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const lastSubmission = cookieStore.get("last_submission")?.value;
  const currentTime = Date.now();

  // Check rate limit: if the last submission was within the RATE_LIMIT_MINUTES
  if (lastSubmission) {
    const lastSubmissionTime = parseInt(lastSubmission, 10);
    const timeElapsed = currentTime - lastSubmissionTime;

    if (timeElapsed < RATE_LIMIT_MINUTES * 60 * 1000) {
      return NextResponse.json({
        error: `Please wait ${RATE_LIMIT_MINUTES} minutes before resubmitting the form.`,
      });
    }
  }

  const formData = await request.json();
  const safeData = contactFormSchema.safeParse(formData);

  if (!safeData.success) throw new Error("Invalid data");
  const { name, email, message } = safeData.data;

  mailOptions.text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

  try {
    const data = await transporter.sendMail(mailOptions);
    if (data.accepted) {
      // Set new lastSubmission cookie with the current timestamp
      cookieStore.set("last_submission", currentTime.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: RATE_LIMIT_MINUTES * 60, // Expires after the rate limit duration
        path: "/",
      });

      return NextResponse.json({ success: "Message sent successfully" });
    }
    return NextResponse.json({ error: "Failed to send message" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({
      error: "An error occurred while sending the message",
    });
  }
}
