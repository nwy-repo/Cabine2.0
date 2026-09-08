import { useEffect, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { getOperator } from "./data/operators";
import { formatFcfa } from "./data/passes";
import { useCart } from "./context/CartContext";
import { fetchPacks } from "./lib/packs";
import BackLink from "./components/BackLink";

export default function Transfer() {
  const { operatorId } = useParams();
  const navigate = useNavigate();
  const { startOrder } = useCart();
  const operator = getOperator(operatorId);

  const [presets, setPresets] = useState([]);
  const [status, setStatus] = useState("loading");
  const [amount, setAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!operator) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initialise l'état de chargement avant un fetch
    setStatus("loading");
    fetchPacks({ operator: operator.id, type: "transfert" })
      .then((rows) => {
        if (!cancelled) {
          setPresets(rows);
          setAmount(rows[0]?.price ?? null);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [operator]);

  if (!operator) return <Navigate to="/" replace />;

  const finalAmount = customAmount ? Number(customAmount) : amount;

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!finalAmount || finalAmount < 100) {
      setError("Le montant doit être d'au moins 100 F CFA.");
      return;
    }
    if (!/^[0-9]{8,10}$/.test(recipientPhone.replace(/\s/g, ""))) {
      setError("Merci de saisir un numéro de destinataire valide.");
      return;
    }

    startOrder({
      operatorId: operator.id,
      type: "transfert",
      item: { id: "transfert", name: "Transfert d'unité", price: finalAmount },
      recipientPhone,
    });
    navigate("/checkout");
  }

  return (
    <section
      className={`flex flex-col text-center items-center justify-center min-h-screen gap-10 bg-gradient-to-t ${operator.gradientFrom} ${operator.gradientTo} p-6`}
    >
      <div className="flex flex-col items-center gap-4 mt-20">
        <BackLink to={`/operateur/${operator.id}`} className="text-white" />
        <h1 className="text-3xl md:text-5xl text-white font-bold">Transfert d'unité {operator.name}</h1>
      </div>

      {status === "loading" && <p className="text-white/80">Chargement…</p>}
      {status === "error" && (
        <p className="text-white/80">Impossible de charger les montants pour le moment. Réessaie un peu plus tard.</p>
      )}

      {status === "ready" && (
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 rounded-xl p-6 flex flex-col gap-6 w-full max-w-sm text-left"
        >
          <div>
            <label className="text-sm font-bold block mb-2">Montant à transférer</label>
            <div className="grid grid-cols-3 gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setAmount(preset.price);
                    setCustomAmount("");
                  }}
                  className={`py-2 rounded-lg text-sm font-bold border transition ${
                    finalAmount === preset.price && !customAmount
                      ? `${operator.accentBg} text-white border-transparent`
                      : "bg-white border-neutral-300 text-neutral-700"
                  }`}
                >
                  {formatFcfa(preset.price)}
                </button>
              ))}
            </div>
            <input
              type="number"
              min="100"
              placeholder="Ou saisis un autre montant"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="mt-3 w-full border border-neutral-300 rounded-lg p-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-bold block mb-2">Numéro du destinataire</label>
            <input
              type="tel"
              placeholder="07 00 00 00 00"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
              className="w-full border border-neutral-300 rounded-lg p-2 text-sm"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className={`${operator.accentBg} ${operator.accentBgHover} transition text-white font-bold py-3 rounded-xl cursor-pointer`}
          >
            Continuer — {formatFcfa(finalAmount || 0)}
          </button>
        </form>
      )}
    </section>
  );
}
