// Client HTTP vers le backend. L'URL est configurable via une variable
// d'environnement Vite (VITE_API_URL), utile pour pointer vers le backend
// déployé une fois en production.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // réponse sans corps JSON
  }

  if (!res.ok) {
    const message = data?.error || `Erreur serveur (${res.status})`;
    throw new Error(message);
  }

  return data;
}

/**
 * Démarre un paiement. Le backend crée une session chez Wave ou Orange
 * Money et renvoie une URL de paiement hébergée vers laquelle on redirige
 * le client.
 */
export function createCheckoutSession(payload) {
  return request("/api/checkout", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function sendContactMessage(payload) {
  return request("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export { API_URL };
