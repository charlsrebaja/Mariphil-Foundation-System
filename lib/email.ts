import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

type EmailOptions = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL || "noreply@mariphilfoundation.org",
    subject,
    text: text || "",
    html: html || text || "",
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
