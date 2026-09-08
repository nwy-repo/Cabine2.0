import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  // Ne bloque pas l'app : le catalogue retombe sur les données d'exemple
  // locales (voir src/lib/packs.js) tant que Supabase n'est pas configuré.
  console.warn(
    "Supabase n'est pas configuré (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY manquants dans .env). " +
      "Le catalogue affiche des données d'exemple locales et la page /admin est indisponible."
  );
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
