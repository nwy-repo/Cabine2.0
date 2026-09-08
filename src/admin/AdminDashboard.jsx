import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { adminFetchPacks, createPack, updatePack, deletePack } from "../lib/packs";
import { OPERATOR_LIST } from "../data/operators";
import { formatFcfa } from "../data/passes";
import PackForm from "./PackForm";

const TYPE_LABEL = { internet: "Internet", mix: "Mix", transfert: "Transfert" };

export default function AdminDashboard({ session }) {
  const [packs, setPacks] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [errorMessage, setErrorMessage] = useState("");
  const [operatorFilter, setOperatorFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [editingPack, setEditingPack] = useState(null); // null = pas d'édition en cours
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setStatus("loading");
    setErrorMessage("");
    try {
      const rows = await adminFetchPacks({
        operator: operatorFilter || undefined,
        type: typeFilter || undefined,
      });
      setPacks(rows);
      setStatus("ready");
    } catch (err) {
      setErrorMessage(err.message || "Erreur de chargement.");
      setStatus("error");
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initialise l'état de chargement avant un fetch
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operatorFilter, typeFilter]);

  async function handleCreate(payload) {
    setSubmitting(true);
    try {
      await createPack(payload);
      setShowAddForm(false);
      await load();
    } catch (err) {
      setErrorMessage(err.message || "Erreur lors de la création.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpdate(payload) {
    setSubmitting(true);
    try {
      await updatePack(editingPack.id, payload);
      setEditingPack(null);
      await load();
    } catch (err) {
      setErrorMessage(err.message || "Erreur lors de la modification.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(pack) {
    if (!window.confirm(`Supprimer "${pack.name}" ? Cette action est définitive.`)) return;
    try {
      await deletePack(pack.id);
      await load();
    } catch (err) {
      setErrorMessage(err.message || "Erreur lors de la suppression.");
    }
  }

  async function handleToggleActive(pack) {
    try {
      await updatePack(pack.id, { active: !pack.active });
      await load();
    } catch (err) {
      setErrorMessage(err.message || "Erreur lors de la mise à jour.");
    }
  }

  return (
    <section className="min-h-screen bg-neutral-100 p-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gestion des packs</h1>
            <p className="text-neutral-500 text-sm">{session.user.email}</p>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-sm font-bold text-neutral-500 hover:text-neutral-800 cursor-pointer"
          >
            Se déconnecter
          </button>
        </header>

        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={operatorFilter}
            onChange={(e) => setOperatorFilter(e.target.value)}
            className="border border-neutral-300 rounded-lg p-2 text-sm bg-white"
          >
            <option value="">Tous les opérateurs</option>
            {OPERATOR_LIST.map((op) => (
              <option key={op.id} value={op.id}>
                {op.name}
              </option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-neutral-300 rounded-lg p-2 text-sm bg-white"
          >
            <option value="">Tous les types</option>
            <option value="internet">Pass Internet</option>
            <option value="mix">Pass Mix</option>
            <option value="transfert">Transfert d'unité</option>
          </select>

          <button
            onClick={() => {
              setShowAddForm((v) => !v);
              setEditingPack(null);
            }}
            className="ml-auto bg-blue-700 hover:bg-blue-800 transition text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
          >
            {showAddForm ? "Fermer" : "+ Ajouter un pack"}
          </button>
        </div>

        {errorMessage && (
          <p className="text-red-700 bg-red-100 border border-red-200 rounded-lg p-3 text-sm">{errorMessage}</p>
        )}

        {showAddForm && (
          <PackForm key="new" submitting={submitting} onSubmit={handleCreate} onCancel={() => setShowAddForm(false)} />
        )}

        {editingPack && (
          <PackForm
            key={editingPack.id}
            initialPack={editingPack}
            submitting={submitting}
            onSubmit={handleUpdate}
            onCancel={() => setEditingPack(null)}
          />
        )}

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          {status === "loading" && <p className="p-5 text-sm text-neutral-500">Chargement…</p>}
          {status === "error" && !errorMessage && <p className="p-5 text-sm text-neutral-500">Erreur de chargement.</p>}
          {status === "ready" && packs.length === 0 && (
            <p className="p-5 text-sm text-neutral-500">Aucun pack pour ce filtre. Ajoute-en un pour commencer.</p>
          )}

          {status === "ready" && packs.length > 0 && (
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-left text-neutral-500">
                <tr>
                  <th className="p-3 font-medium">Opérateur</th>
                  <th className="p-3 font-medium">Type</th>
                  <th className="p-3 font-medium">Catégorie</th>
                  <th className="p-3 font-medium">Nom</th>
                  <th className="p-3 font-medium">Données</th>
                  <th className="p-3 font-medium">Validité</th>
                  <th className="p-3 font-medium">Prix</th>
                  <th className="p-3 font-medium">Visible</th>
                  <th className="p-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {packs.map((pack) => (
                  <tr key={pack.id} className="border-t border-neutral-100">
                    <td className="p-3 capitalize">{pack.operator}</td>
                    <td className="p-3">{TYPE_LABEL[pack.type]}</td>
                    <td className="p-3 text-neutral-500">{pack.category_label ?? "—"}</td>
                    <td className="p-3 font-medium">{pack.name}</td>
                    <td className="p-3 text-neutral-500">{pack.data ?? "—"}</td>
                    <td className="p-3 text-neutral-500">{pack.validity ?? "—"}</td>
                    <td className="p-3 font-medium">{formatFcfa(pack.price)}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleToggleActive(pack)}
                        className={`text-xs font-bold px-2 py-1 rounded-full cursor-pointer ${
                          pack.active ? "bg-green-100 text-green-700" : "bg-neutral-200 text-neutral-500"
                        }`}
                      >
                        {pack.active ? "Actif" : "Masqué"}
                      </button>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setEditingPack(pack);
                          setShowAddForm(false);
                        }}
                        className="text-blue-700 hover:underline text-xs font-bold mr-3 cursor-pointer"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(pack)}
                        className="text-red-600 hover:underline text-xs font-bold cursor-pointer"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
