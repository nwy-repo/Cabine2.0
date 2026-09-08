import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setStatus("error");
      setError(signInError.message === "Invalid login credentials" ? "Email ou mot de passe incorrect." : signInError.message);
      return;
    }
    setStatus("idle");
    // onAuthStateChange dans AdminPage prend le relais automatiquement
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-950 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-8 w-full max-w-sm flex flex-col gap-5 shadow-xl"
      >
        <div>
          <h1 className="text-2xl font-bold">Espace admin</h1>
          <p className="text-neutral-500 text-sm mt-1">Gestion des packs Cabine 2.0</p>
        </div>

        <div>
          <label className="text-sm font-bold block mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-neutral-300 rounded-lg p-2 text-sm"
            autoComplete="username"
          />
        </div>

        <div>
          <label className="text-sm font-bold block mb-1">Mot de passe</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-neutral-300 rounded-lg p-2 text-sm"
            autoComplete="current-password"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-blue-700 hover:bg-blue-800 transition text-white font-bold py-2.5 rounded-lg cursor-pointer disabled:opacity-60"
        >
          {status === "loading" ? "Connexion…" : "Se connecter"}
        </button>

        <p className="text-xs text-neutral-400">
          Les comptes admin se créent depuis le tableau de bord Supabase (Authentication → Users), pas ici.
        </p>
      </form>
    </section>
  );
}
