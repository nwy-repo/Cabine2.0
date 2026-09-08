import { Router } from "express";
import { updateOrderStatus } from "../store.js";

const router = Router();

// Webhook Wave : Wave notifie ton serveur des évènements de paiement
// (checkout.session.completed, etc.). Vérifie la signature Wave-Signature
// selon la doc officielle avant de faire confiance à la charge utile en
// production : https://docs.wave.com/business/checkout-api#webhooks
router.post("/wave", (req, res) => {
  const event = req.body;
  console.log("Webhook Wave reçu :", event?.type);

  const orderId = event?.data?.client_reference;
  if (orderId && event?.type === "checkout.session.completed") {
    updateOrderStatus(orderId, "paid", { provider: "wave" });
  }

  res.sendStatus(200);
});

// Webhook Orange Money (notif_url transmise à la création du paiement).
router.post("/orange-money", (req, res) => {
  const event = req.body;
  console.log("Webhook Orange Money reçu :", event);

  const orderId = event?.order_id;
  const status = event?.status === "SUCCESS" ? "paid" : "failed";
  if (orderId) {
    updateOrderStatus(orderId, status, { provider: "orange_money" });
  }

  res.sendStatus(200);
});

export default router;
