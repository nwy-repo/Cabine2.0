import { useState } from "react";
import { sendContactMessage } from "./lib/api";

// Numéro WhatsApp de la cabine, au format international sans "+" ni espaces.
// À définir via VITE_WHATSAPP_NUMBER dans le fichier .env du frontend.
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "2250700000000";

export default function Contact() {
    const [form, setForm] = useState({ nom: "", prenom: "", numero: "", email: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle | sending | sent | error
    const [error, setError] = useState("");

    function update(field) {
        return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
    }

    function buildWhatsappLink() {
        const text = [
            `Bonjour, je suis ${form.prenom} ${form.nom}.`.trim(),
            form.message && `Message : ${form.message}`,
            form.numero && `Mon numéro : ${form.numero}`,
        ]
            .filter(Boolean)
            .join("\n");
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!form.nom || !form.message) {
            setError("Merci de renseigner au moins ton nom et ta préoccupation.");
            return;
        }

        setStatus("sending");
        try {
            await sendContactMessage(form);
            setStatus("sent");
        } catch (err) {
            setStatus("error");
            setError(
                err.message ||
                    "L'envoi par email a échoué. Le serveur backend est peut-être hors ligne — tu peux nous écrire directement sur WhatsApp ci-dessous."
            );
        }
    }

    return (
        <section
            className="
                min-h-screen
                bg-gradient-to-t from-black to-blue-500
                flex
                items-center
                justify-center
                p-6
            "
        >
            <form
                onSubmit={handleSubmit}
                className="
                    bg-white/25
                    p-4
                    flex
                    flex-col
                    text-center
                    items-center
                    justify-center
                    gap-8
                    mt-17
                    rounded-xl
                "
            >
                <h1
                    className="
                        text-black
                        md:text-6xl
                        text-3xl
                        font-bold
                    "
                >
                    CONTACT NOUS
                </h1>

                {status === "sent" ? (
                    <p className="text-white font-bold bg-green-600/70 rounded-lg px-4 py-3">
                        Message envoyé ! Nous te répondons très vite.
                    </p>
                ) : (
                    <>
                        <div className="flex md:flex-row flex-col gap-5">
                            <input
                                className="
                                    text-white
                                    bg-gray-400/35
                                    h-12
                                    border-3
                                    border-gray-500/95
                                    rounded-xl
                                    p-2
                                "
                                type="text"
                                placeholder="Votre Nom"
                                value={form.nom}
                                onChange={update("nom")}
                            />
                            <input
                                className="text-white bg-gray-400/35 h-12 border-3 border-gray-500/95 rounded-xl p-2"
                                type="text"
                                placeholder="Votre Prénom"
                                value={form.prenom}
                                onChange={update("prenom")}
                            />
                        </div>
                        <div className="flex md:flex-row flex-col gap-5">
                            <input
                                className="text-white bg-gray-400/35 h-12 border-3 border-gray-500/95 rounded-xl p-2"
                                type="text"
                                placeholder="Numéro"
                                value={form.numero}
                                onChange={update("numero")}
                            />
                            <input
                                className="text-white bg-gray-400/35 h-12 border-3 border-gray-500/95 rounded-xl p-2"
                                type="text"
                                placeholder="Email"
                                value={form.email}
                                onChange={update("email")}
                            />
                        </div>
                        <textarea
                            className="
                                text-white
                                bg-gray-400/35
                                h-32
                                border-3
                                border-gray-500/95
                                rounded-xl
                                p-2
                                md:w-107
                                w-50
                            "
                            placeholder="Quelle est votre préocupation"
                            value={form.message}
                            onChange={update("message")}
                        ></textarea>

                        {error && <p className="text-white bg-red-600/70 rounded-lg px-3 py-2 text-sm">{error}</p>}

                        <input
                            className="
                                transition
                                py-3
                                px-10
                                bg-gradient-to-r
                                from-blue-800
                                to-blue-600
                                hover:from-blue-600
                                hover:to-blue-800
                                shadow-xl
                                rounded-xl
                                text-white
                                font-bold
                                cursor-pointer
                                disabled:opacity-60
                            "
                            type="submit"
                            value={status === "sending" ? "Envoi..." : "Envoyé"}
                            disabled={status === "sending"}
                        />

                        <a
                            href={buildWhatsappLink()}
                            target="_blank"
                            rel="noreferrer"
                            className="
                                transition
                                py-3
                                px-10
                                bg-green-600
                                hover:bg-green-700
                                shadow-xl
                                rounded-xl
                                text-white
                                font-bold
                            "
                        >
                            Écrire sur WhatsApp
                        </a>
                    </>
                )}
            </form>
        </section>
    )
}
