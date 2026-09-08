// Intégration Wave Checkout API.
// Doc officielle : https://docs.wave.com/business/checkout-api
//
// IMPORTANT : ce code n'a pas pu être testé contre l'API réelle de Wave
// (ni clé marchande, ni accès réseau à api.wave.com depuis l'environnement
// où ce projet a été généré). Vérifie les noms de champs exacts dans la
// doc Wave à jour avant la mise en production, la forme ci-dessous suit
// la structure documentée au moment de l'écriture.
import axios from "axios";

const WAVE_API_BASE = "https://api.wave.com/v1";

export async function createWaveCheckoutSession({ amount, orderId, successUrl, errorUrl }) {
  const apiKey = process.env.WAVE_API_KEY;
  if (!apiKey) {
    throw new Error("WAVE_API_KEY manquant côté serveur (fichier .env).");
  }

  const response = await axios.post(
    `${WAVE_API_BASE}/checkout/sessions`,
    {
      amount: String(amount),
      currency: "XOF",
      client_reference: orderId,
      success_url: successUrl,
      error_url: errorUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  // Wave renvoie normalement { id, wave_launch_url, checkout_status, ... }
  return {
    sessionId: response.data.id,
    paymentUrl: response.data.wave_launch_url,
    raw: response.data,
  };
}

export async function getWaveCheckoutSession(sessionId) {
  const apiKey = process.env.WAVE_API_KEY;
  const response = await axios.get(`${WAVE_API_BASE}/checkout/sessions/${sessionId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  return response.data;
}
