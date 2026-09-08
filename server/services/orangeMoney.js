// Intégration Orange Money Web Payment.
// Portail développeur : https://developer.orange.com (rubrique Orange Money Web Payment)
//
// IMPORTANT : comme pour Wave, ce code n'a pas pu être testé contre l'API
// réelle (pas de contrat marchand Orange Money, pas d'accès réseau à
// api.orange.com depuis l'environnement où ce projet a été généré).
// La structure ci-dessous suit le flux standard documenté par Orange
// (OAuth2 client_credentials puis création du paiement) mais vérifie les
// noms de champs exacts pour le pays concerné (CI) avant la mise en
// production, et ajuste si besoin avec ton contrat marchand.
import axios from "axios";

let cachedToken = null;
let cachedTokenExpiry = 0;

async function getAccessToken() {
  const clientId = process.env.ORANGE_MONEY_CLIENT_ID;
  const clientSecret = process.env.ORANGE_MONEY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Identifiants Orange Money manquants côté serveur (fichier .env).");
  }

  if (cachedToken && Date.now() < cachedTokenExpiry) {
    return cachedToken;
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await axios.post(
    "https://api.orange.com/oauth/v3/token",
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  cachedToken = response.data.access_token;
  cachedTokenExpiry = Date.now() + (Number(response.data.expires_in) - 60) * 1000;
  return cachedToken;
}

export async function createOrangeMoneyPayment({ amount, orderId, successUrl, errorUrl, notifUrl }) {
  const merchantKey = process.env.ORANGE_MONEY_MERCHANT_KEY;
  const country = process.env.ORANGE_MONEY_COUNTRY || "ci";
  if (!merchantKey) {
    throw new Error("ORANGE_MONEY_MERCHANT_KEY manquant côté serveur (fichier .env).");
  }

  const token = await getAccessToken();

  const response = await axios.post(
    `https://api.orange.com/orange-money-webpay/${country}/v1/webpayment`,
    {
      merchant_key: merchantKey,
      currency: "OUV", // XOF côté Orange Money Web Payment ; certains contrats utilisent "OUV" comme code marchand test — remplace par le code fourni dans ton contrat.
      order_id: orderId,
      amount: Number(amount),
      return_url: successUrl,
      cancel_url: errorUrl,
      notif_url: notifUrl,
      lang: "fr",
      reference: `Cabine2.0 - ${orderId}`,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  // Orange Money renvoie normalement { payment_url, pay_token, notif_token }
  return {
    paymentUrl: response.data.payment_url,
    payToken: response.data.pay_token,
    raw: response.data,
  };
}
