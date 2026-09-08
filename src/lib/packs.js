import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { INTERNET_PASSES, MIX_PASSES, PASS_CATEGORIES } from "../data/passes";

// --- Repli local -----------------------------------------------------
// Tant que Supabase n'est pas configuré (ou que la table est vide), le
// site continue de fonctionner avec les données d'exemple de
// src/data/passes.js, dans le même format que les lignes Supabase.

const CATEGORY_LABEL = Object.fromEntries(PASS_CATEGORIES.map((c) => [c.id, c.label]));
const TRANSFER_AMOUNTS = [200, 500, 1000, 2000, 5000, 10000];

function localInternetPacks(operatorId) {
  const catalog = INTERNET_PASSES[operatorId] ?? {};
  const rows = [];
  for (const categoryId of Object.keys(catalog)) {
    for (const pack of catalog[categoryId]) {
      rows.push({
        id: pack.id,
        operator: operatorId,
        type: "internet",
        category_id: categoryId,
        category_label: CATEGORY_LABEL[categoryId],
        name: pack.name,
        data: pack.data,
        validity: pack.validity,
        price: pack.price,
      });
    }
  }
  return rows;
}

function localMixPacks(operatorId) {
  return (MIX_PASSES[operatorId] ?? []).map((pack) => ({
    id: pack.id,
    operator: operatorId,
    type: "mix",
    category_id: null,
    category_label: null,
    name: pack.name,
    data: pack.data,
    validity: pack.validity,
    price: pack.price,
  }));
}

function localTransferPacks(operatorId) {
  return TRANSFER_AMOUNTS.map((amount, i) => ({
    id: `local-transfert-${operatorId}-${i}`,
    operator: operatorId,
    type: "transfert",
    category_id: null,
    category_label: null,
    name: `${amount.toLocaleString("fr-FR")} F CFA`,
    data: null,
    validity: null,
    price: amount,
  }));
}

function localFallback(operator, type) {
  if (type === "internet") return localInternetPacks(operator);
  if (type === "mix") return localMixPacks(operator);
  if (type === "transfert") return localTransferPacks(operator);
  return [];
}

// --- Lecture publique (vitrine) --------------------------------------

/** Packs actifs pour un opérateur + type donnés, triés pour l'affichage. */
export async function fetchPacks({ operator, type }) {
  if (!isSupabaseConfigured) {
    return localFallback(operator, type);
  }

  const { data, error } = await supabase
    .from("packs")
    .select("*")
    .eq("operator", operator)
    .eq("type", type)
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Erreur de lecture Supabase, repli sur les données locales :", error.message);
    return localFallback(operator, type);
  }
  if (!data || data.length === 0) {
    // Table vide (Supabase configuré mais pas encore rempli/seedé)
    return localFallback(operator, type);
  }
  return data;
}

// --- Lecture/écriture admin (authentifié) -----------------------------

function requireSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Supabase n'est pas configuré. Renseigne VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans le fichier .env."
    );
  }
  return supabase;
}

/** Tous les packs (actifs ou non) pour l'admin, avec filtres optionnels. */
export async function adminFetchPacks({ operator, type } = {}) {
  const client = requireSupabase();
  let query = client
    .from("packs")
    .select("*")
    .order("operator", { ascending: true })
    .order("type", { ascending: true })
    .order("sort_order", { ascending: true });

  if (operator) query = query.eq("operator", operator);
  if (type) query = query.eq("type", type);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createPack(pack) {
  const client = requireSupabase();
  const { data, error } = await client.from("packs").insert(pack).select().single();
  if (error) throw error;
  return data;
}

export async function updatePack(id, updates) {
  const client = requireSupabase();
  const { data, error } = await client.from("packs").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deletePack(id) {
  const client = requireSupabase();
  const { error } = await client.from("packs").delete().eq("id", id);
  if (error) throw error;
}
