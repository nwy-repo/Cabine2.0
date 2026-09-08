import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export default function AdminPage() {
  const [session, setSession] = useState(undefined); // undefined = pas encore su, null = pas connecté

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Supabase non configuré, on fixe l'état une seule fois au montage
      setSession(null);
      return;
    }

    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-neutral-950 p-6">
        <div className="bg-white rounded-xl p-8 max-w-md text-center flex flex-col gap-3">
          <h1 className="text-xl font-bold">Supabase n'est pas configuré</h1>
          <p className="text-neutral-600 text-sm">
            Ajoute <code>VITE_SUPABASE_URL</code> et <code>VITE_SUPABASE_ANON_KEY</code> dans le fichier{" "}
            <code>.env</code> à la racine du projet, puis relance l'application pour accéder à l'espace admin.
          </p>
        </div>
      </section>
    );
  }

  if (session === undefined) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-neutral-950">
        <p className="text-white/70 text-sm">Chargement…</p>
      </section>
    );
  }

  return session ? <AdminDashboard session={session} /> : <AdminLogin />;
}
