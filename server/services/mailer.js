import nodemailer from "nodemailer";

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("Configuration SMTP manquante côté serveur (fichier .env).");
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function sendContactEmail({ nom, prenom, numero, email, message }) {
  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) throw new Error("CONTACT_TO_EMAIL manquant côté serveur (fichier .env).");

  const transporter = getTransporter();

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    replyTo: email || undefined,
    subject: `[Cabine 2.0] Nouveau message de ${prenom || ""} ${nom || ""}`.trim(),
    text: [
      `Nom : ${nom || "-"}`,
      `Prénom : ${prenom || "-"}`,
      `Numéro : ${numero || "-"}`,
      `Email : ${email || "-"}`,
      "",
      "Message :",
      message || "-",
    ].join("\n"),
  });
}
