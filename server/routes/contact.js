import { Router } from "express";
import { sendContactEmail } from "../services/mailer.js";

const router = Router();

router.post("/", async (req, res) => {
  const { nom, prenom, numero, email, message } = req.body || {};

  if (!nom || !message) {
    return res.status(400).json({ error: "Le nom et le message sont obligatoires." });
  }

  try {
    await sendContactEmail({ nom, prenom, numero, email, message });
    res.json({ ok: true });
  } catch (err) {
    console.error("Erreur envoi email de contact :", err.message);
    res.status(502).json({
      error: err.message || "L'envoi de l'email a échoué. Vérifie la configuration SMTP dans server/.env.",
    });
  }
});

export default router;
