import { useEffect, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { getOperator } from "./data/operators";
import { useCart } from "./context/CartContext";
import { fetchPacks } from "./lib/packs";
import BackLink from "./components/BackLink";
import PassCard from "./components/PassCard";

export default function MixCatalog() {
  const { operatorId } = useParams();
  const navigate = useNavigate();
  const { startOrder } = useCart();
  const operator = getOperator(operatorId);

  const [packs, setPacks] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!operator) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initialise l'état de chargement avant un fetch
    setStatus("loading");
    fetchPacks({ operator: operator.id, type: "mix" })
      .then((rows) => {
        if (!cancelled) {
          setPacks(rows);
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

  function handleBuy(pack) {
    startOrder({ operatorId: operator.id, type: "mix", item: { id: pack.id, name: pack.name, price: pack.price } });
    navigate("/checkout");
  }

  return (
    <section
      className={`flex flex-col text-center items-center justify-center min-h-screen gap-14 bg-gradient-to-t ${operator.gradientFrom} ${operator.gradientTo} p-6`}
    >
      <div className="flex flex-col items-center gap-4 mt-20">
        <BackLink to={`/operateur/${operator.id}`} className="text-white" />
        <h1 className="text-3xl md:text-5xl text-white font-bold">Pass Mix {operator.name}</h1>
        <p className="text-white/70 text-sm">Data, appels et SMS dans un seul pass</p>
      </div>

      {status === "loading" && <p className="text-white/80">Chargement des offres…</p>}
      {status === "error" && (
        <p className="text-white/80">Impossible de charger les offres pour le moment. Réessaie un peu plus tard.</p>
      )}
      {status === "ready" && packs.length === 0 && <p className="text-white/80">Aucune offre disponible pour le moment.</p>}

      <div className="flex flex-wrap justify-center gap-5">
        {packs.map((pack) => (
          <PassCard
            key={pack.id}
            pass={pack}
            onBuy={handleBuy}
            accentBg={operator.accentBg}
            accentBgHover={operator.accentBgHover}
          />
        ))}
      </div>
    </section>
  );
}
