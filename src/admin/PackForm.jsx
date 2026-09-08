import { useState } from "react";
import { OPERATOR_LIST } from "../data/operators";
import { PASS_CATEGORIES } from "../data/passes";

const TYPES = [
  { id: "internet", label: "Pass Internet" },
  { id: "mix", label: "Pass Mix" },
  { id: "transfert", label: "Transfert d'unité" },
];

const EMPTY_PACK = {
  operator: "orange",
  type: "internet",
  category_id: PASS_CATEGORIES[0].id,
  name: "",
  data: "",
  validity: "",
  price: "",
  active: true,
  sort_order: 0,
};

export default function PackForm({ initialPack, onSubmit, onCancel, submitting }) {
  // Le composant est remonté via une prop `key` côté parent (voir
  // AdminDashboard) quand on passe d'un pack à un autre ou du mode
  // "ajout" au mode "édition", donc l'état initial ci-dessous suffit :
  // pas besoin d'effet pour resynchroniser `values` avec `initialPack`.
  const [values, setValues] = useState(initialPack ?? EMPTY_PACK);
  const [error, setError] = useState("");

  function update(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!values.name.trim()) {
      setError("Le nom du pack est obligatoire.");
      return;
    }
    const price = Number(values.price);
    if (!price || price <= 0) {
      setError("Le prix doit être un nombre supérieur à 0.");
      return;
    }

    const payload = {
      operator: values.operator,
      type: values.type,
      category_id: values.type === "internet" ? values.category_id : null,
      category_label:
        values.type === "internet"
          ? PASS_CATEGORIES.find((c) => c.id === values.category_id)?.label ?? null
          : null,
      name: values.name.trim(),
      data: values.data?.trim() || null,
      validity: values.validity?.trim() || null,
      price,
      active: Boolean(values.active),
      sort_order: Number(values.sort_order) || 0,
    };

    onSubmit(payload);
  }

  const isTransfert = values.type === "transfert";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-5 shadow flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Opérateur</label>
          <select
            value={values.operator}
            onChange={(e) => update("operator", e.target.value)}
            className="w-full border border-neutral-300 rounded-lg p-2 text-sm"
          >
            {OPERATOR_LIST.map((op) => (
              <option key={op.id} value={op.id}>
                {op.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold block mb-1">Type</label>
          <select
            value={values.type}
            onChange={(e) => update("type", e.target.value)}
            className="w-full border border-neutral-300 rounded-lg p-2 text-sm"
          >
            {TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {values.type === "internet" && (
        <div>
          <label className="text-xs font-bold block mb-1">Catégorie</label>
          <select
            value={values.category_id}
            onChange={(e) => update("category_id", e.target.value)}
            className="w-full border border-neutral-300 rounded-lg p-2 text-sm"
          >
            {PASS_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="text-xs font-bold block mb-1">Nom du pack</label>
        <input
          type="text"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full border border-neutral-300 rounded-lg p-2 text-sm"
          placeholder={isTransfert ? "ex : 1 000 F CFA" : "ex : Prends 10 Go"}
        />
      </div>

      {!isTransfert && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold block mb-1">Données / contenu</label>
            <input
              type="text"
              value={values.data ?? ""}
              onChange={(e) => update("data", e.target.value)}
              className="w-full border border-neutral-300 rounded-lg p-2 text-sm"
              placeholder="ex : 10 Go"
            />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Validité</label>
            <input
              type="text"
              value={values.validity ?? ""}
              onChange={(e) => update("validity", e.target.value)}
              className="w-full border border-neutral-300 rounded-lg p-2 text-sm"
              placeholder="ex : 24h"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold block mb-1">Prix (F CFA)</label>
          <input
            type="number"
            min="1"
            value={values.price}
            onChange={(e) => update("price", e.target.value)}
            className="w-full border border-neutral-300 rounded-lg p-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Ordre d'affichage</label>
          <input
            type="number"
            value={values.sort_order}
            onChange={(e) => update("sort_order", e.target.value)}
            className="w-full border border-neutral-300 rounded-lg p-2 text-sm"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={Boolean(values.active)} onChange={(e) => update("active", e.target.checked)} />
        Visible sur le site
      </label>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-700 hover:bg-blue-800 transition text-white font-bold py-2 px-5 rounded-lg cursor-pointer disabled:opacity-60"
        >
          {submitting ? "Enregistrement…" : initialPack ? "Enregistrer" : "Ajouter le pack"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-neutral-200 hover:bg-neutral-300 transition font-bold py-2 px-5 rounded-lg cursor-pointer"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
