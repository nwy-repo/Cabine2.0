import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { getOperator } from "./data/operators";
import { formatFcfa } from "./data/passes";
import { createCheckoutSession } from "./lib/api";
import BackLink from "./components/BackLink";

const PAYMENT_METHODS = [
  { id: "wave", name: "Wave", description: "Paiement instantané via l'app Wave" },
  { id: "orange_money", name: "Orange Money", description: "Paiement via votre compte Orange Money" },
];

export default function Checkout() {
  const { order, clearOrder } = useCart();

  const [payerPhone, setPayerPhone] = useState("");
  const [method, setMethod] = useState("wave");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [error, setError] = useState("");

  if (!order) return <Navigate to="/" replace />;

  const operator = getOperator(order.operatorId);

  async function handlePay(e) {
    e.preventDefault();
    setError("");

    if (!/^[0-9]{8,10}$/.test(payerPhone.replace(/\s/g, ""))) {
      setError("Merci de saisir un numéro de paiement valide.");
      return;
    }

    setStatus("loading");
    try {
      const session = await createCheckoutSession({
        operatorId: order.operatorId,
        type: order.type,
        itemName: order.item.name,
        amount: order.item.price,
        recipientPhone: order.recipientPhone || payerPhone,
        payerPhone,
        method,
      });

      // Le backend renvoie l'URL de paiement hébergée par Wave ou Orange
      // Money : on y redirige le client pour finaliser la transaction.
      if (session?.paymentUrl) {
        clearOrder();
        window.location.href = session.paymentUrl;
      } else {
        throw new Error("Réponse de paiement invalide.");
      }
    } catch (err) {
      setStatus("error");
      setError(
        err.message ||
          "Le paiement n'a pas pu être initié. Vérifie que le serveur backend est bien démarré et configuré."
      );
    }
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gradient-to-t from-neutral-900 to-neutral-700 p-6">
      <div className="flex flex-col items-center gap-4 mt-20">
        <BackLink to={`/operateur/${order.operatorId}`} className="text-white" />
        <h1 className="text-3xl md:text-5xl text-white font-bold">Paiement</h1>
      </div>

      <div className="bg-white/90 rounded-xl p-6 w-full max-w-md flex flex-col gap-6">
        <div className="border-b border-neutral-200 pb-4">
          <p className="text-xs uppercase tracking-wide text-neutral-500">{operator?.name}</p>
          <h2 className="font-bold text-xl">{order.item.name}</h2>
          {order.item.category && <p className="text-sm text-neutral-600">{order.item.category}</p>}
          {order.recipientPhone && (
            <p className="text-sm text-neutral-600">Destinataire : {order.recipientPhone}</p>
          )}
          <p className="font-bold text-2xl mt-2">{formatFcfa(order.item.price)}</p>
        </div>

        <form onSubmit={handlePay} className="flex flex-col gap-5">
          <div>
            <label className="text-sm font-bold block mb-2">Moyen de paiement</label>
            <div className="grid grid-cols-2 gap-3">
              {PAYMENT_METHODS.map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`text-left p-3 rounded-lg border transition ${
                    method === m.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-neutral-300 bg-white"
                  }`}
                >
                  <span className="font-bold block">{m.name}</span>
                  <span className="text-xs text-neutral-500">{m.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-bold block mb-2">Numéro pour le paiement</label>
            <input
              type="tel"
              placeholder="07 00 00 00 00"
              value={payerPhone}
              onChange={(e) => setPayerPhone(e.target.value)}
              className="w-full border border-neutral-300 rounded-lg p-2 text-sm"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-600 hover:to-blue-800 transition text-white font-bold py-3 rounded-xl cursor-pointer disabled:opacity-60"
          >
            {status === "loading" ? "Redirection en cours…" : `Payer ${formatFcfa(order.item.price)}`}
          </button>

          <p className="text-[11px] text-neutral-500 text-center">
            Tu seras redirigé vers {method === "wave" ? "Wave" : "Orange Money"} pour confirmer le paiement en toute sécurité.
          </p>
        </form>
      </div>
    </section>
  );
}
