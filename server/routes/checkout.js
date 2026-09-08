import { Router } from "express";
import { nanoid } from "nanoid";
import { createWaveCheckoutSession } from "../services/wave.js";
import { createOrangeMoneyPayment } from "../services/orangeMoney.js";
import { saveOrder } from "../store.js";

const router = Router();

router.post("/", async (req, res) => {
  const { operatorId, type, itemName, amount, recipientPhone, payerPhone, method } = req.body || {};

  if (!operatorId || !itemName || !amount || !payerPhone || !method) {
    return res.status(400).json({ error: "Requête de paiement incomplète." });
  }
  if (!["wave", "orange_money"].includes(method)) {
    return res.status(400).json({ error: "Moyen de paiement inconnu." });
  }
  if (Number(amount) <= 0) {
    return res.status(400).json({ error: "Montant invalide." });
  }

  const orderId = nanoid(10);
  const appBaseUrl = process.env.APP_BASE_URL || "http://localhost:5173";
  const successUrl = `${appBaseUrl}/paiement/succes?order=${orderId}`;
  const errorUrl = `${appBaseUrl}/paiement/echec?order=${orderId}`;
  const apiBaseUrl = `${req.protocol}://${req.get("host")}`;
  const notifUrl = `${apiBaseUrl}/api/webhooks/orange-money`;

  const order = {
    id: orderId,
    operatorId,
    type,
    itemName,
    amount: Number(amount),
    recipientPhone,
    payerPhone,
    method,
    status: "pending",
    createdAt: Date.now(),
  };

  try {
    let paymentUrl;

    if (method === "wave") {
      const session = await createWaveCheckoutSession({
        amount: order.amount,
        orderId,
        successUrl,
        errorUrl,
      });
      paymentUrl = session.paymentUrl;
      order.providerSessionId = session.sessionId;
    } else {
      const payment = await createOrangeMoneyPayment({
        amount: order.amount,
        orderId,
        successUrl,
        errorUrl,
        notifUrl,
      });
      paymentUrl = payment.paymentUrl;
      order.providerPayToken = payment.payToken;
    }

    if (!paymentUrl) {
      throw new Error("Le fournisseur de paiement n'a pas renvoyé d'URL de paiement.");
    }

    saveOrder(order);
    res.json({ orderId, paymentUrl });
  } catch (err) {
    console.error("Erreur création session de paiement :", err.response?.data || err.message);
    res.status(502).json({
      error:
        err.message ||
        "Impossible de contacter le fournisseur de paiement. Vérifie la configuration des clés API dans server/.env.",
    });
  }
});

export default router;
