import { useNavigate, useSearchParams } from "react-router-dom";

export function PaymentSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const orderId = params.get("order");

  return (
    <section className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gradient-to-t from-green-700 to-black text-center p-6">
      <div className="bg-white/90 rounded-xl p-8 max-w-md flex flex-col gap-4 items-center">
        <div className="text-5xl">✅</div>
        <h1 className="text-2xl font-bold">Paiement réussi</h1>
        <p className="text-neutral-600 text-sm">
          Ta commande a été confirmée{orderId ? ` (réf. ${orderId})` : ""}. Le pass ou le transfert sera crédité sur le numéro indiqué dans quelques instants.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-600 hover:to-blue-800 transition text-white font-bold py-3 px-6 rounded-xl cursor-pointer"
        >
          Retour à l'accueil
        </button>
      </div>
    </section>
  );
}

export function PaymentError() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gradient-to-t from-red-700 to-black text-center p-6">
      <div className="bg-white/90 rounded-xl p-8 max-w-md flex flex-col gap-4 items-center">
        <div className="text-5xl">⚠️</div>
        <h1 className="text-2xl font-bold">Paiement non abouti</h1>
        <p className="text-neutral-600 text-sm">
          Le paiement a été annulé ou a échoué. Aucun montant n'a été débité. Tu peux réessayer.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-600 hover:to-blue-800 transition text-white font-bold py-3 px-6 rounded-xl cursor-pointer"
        >
          Retour à l'accueil
        </button>
      </div>
    </section>
  );
}
