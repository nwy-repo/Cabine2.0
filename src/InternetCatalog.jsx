import { useEffect, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { getOperator } from "./data/operators";
import { PASS_CATEGORIES } from "./data/passes";
import { useCart } from "./context/CartContext";
import { fetchPacks } from "./lib/packs";
import BackLink from "./components/BackLink";
import PassCard from "./components/PassCard";

export default function InternetCatalog() {
  const { operatorId } = useParams();
  const navigate = useNavigate();
  const { startOrder } = useCart();
  const operator = getOperator(operatorId);

  const [packs, setPacks] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    if (!operator) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initialise l'état de chargement avant un fetch, cf. https://react.dev/reference/react/useEffect#fetching-data-with-effects
    setStatus("loading");
    fetchPacks({ operator: operator.id, type: "internet" })
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
    startOrder({
      operatorId: operator.id,
      type: "internet",
      item: { id: pack.id, name: pack.name, price: pack.price, category: pack.category_label },
    });
    navigate("/checkout");
  }

  // Groupe les packs par catégorie, dans l'ordre défini par PASS_CATEGORIES
  const byCategory = PASS_CATEGORIES.map((category) => ({
    category,
    items: packs.filter((p) => p.category_id === category.id),
  })).filter((group) => group.items.length > 0);

  return (
    <section
      className={`flex flex-col text-center items-center justify-start min-h-screen gap-14 bg-gradient-to-t ${operator.gradientFrom} ${operator.gradientTo} p-6`}
    >
      <div className="flex flex-col items-center gap-4 mt-20">
        <BackLink to={`/operateur/${operator.id}`} className="text-white" />
        <h1 className="text-3xl md:text-5xl text-white font-bold">Pass Internet {operator.name}</h1>
      </div>

      {status === "loading" && <p className="text-white/80">Chargement des offres…</p>}
      {status === "error" && (
        <p className="text-white/80">Impossible de charger les offres pour le moment. Réessaie un peu plus tard.</p>
      )}
      {status === "ready" && byCategory.length === 0 && (
        <p className="text-white/80">Aucune offre disponible pour le moment.</p>
      )}

      {byCategory.map(({ category, items }) => (
        <div key={category.id} className="w-full max-w-5xl flex flex-col items-center gap-5">
          <div>
            <h2 className="text-white font-bold text-xl">{category.label}</h2>
            <p className="text-white/70 text-xs">{category.hint}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {items.map((pack) => (
              <PassCard
                key={pack.id}
                pass={pack}
                onBuy={handleBuy}
                accentBg={operator.accentBg}
                accentBgHover={operator.accentBgHover}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
