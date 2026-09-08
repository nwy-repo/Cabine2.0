import { useNavigate } from "react-router-dom";
import { OPERATOR_LIST } from "./data/operators";

export default function Home() {
    const navigate = useNavigate();

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <section className="bg-[url('../images/courv0.png')] bg-cover md:bg-center h-screen bg-[position:75%_75%] flex flex-col text-start items-start justify-center">
                <div className="md:ml-20 ml-5 md:bg-transparent bg-white/85 px-4 py-6 rounded-xl">
                    <h1 className="md:text-6xl text-3xl font-bold md:text-white text-black">CABINE 2.0<br />CABINE EN LIGNE</h1>
                    <p className="md:text-white text-black md:text-xs text-[10px]">Souscription appel, internet et transfert D'unité</p>
                    <div className="flex gap-4 mt-10">
                        <button
                            onClick={() => scrollTo("operateurs")}
                            className="transition py-3 px-6 bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-600 hover:to-blue-800 shadow-xl rounded-xl text-white font-bold cursor-pointer"
                        >
                            Souscrire
                        </button>
                        <button
                            onClick={() => scrollTo("a-propos")}
                            className="transition py-3 px-6 bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-600 hover:to-blue-800 shadow-xl rounded-xl text-white font-bold cursor-pointer"
                        >
                            À propos
                        </button>
                    </div>
                </div>
            </section>

            <section id="operateurs" className="flex flex-col items-center gap-10 py-20 px-6 bg-white">
                <div className="text-center max-w-lg">
                    <h2 className="text-3xl md:text-4xl font-bold">Choisis ton opérateur</h2>
                    <p className="text-neutral-500 mt-2 text-sm">
                        Pass internet, pass mix ou transfert d'unité — sélectionne ton réseau pour voir les offres disponibles.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
                    {OPERATOR_LIST.map((operator) => (
                        <button
                            key={operator.id}
                            onClick={() => navigate(`/operateur/${operator.id}`)}
                            className={`cursor-pointer flex-1 min-w-[220px] max-w-xs rounded-2xl p-6 text-left shadow-xl bg-gradient-to-br ${operator.gradientFrom} ${operator.gradientTo} transition hover:scale-[1.02]`}
                        >
                            <h3 className={`text-2xl font-bold ${operator.darkText ? "text-black" : "text-white"}`}>
                                {operator.name}
                            </h3>
                            <p className={`text-sm mt-2 ${operator.darkText ? "text-black/70" : "text-white/80"}`}>
                                {operator.tagline}
                            </p>
                        </button>
                    ))}
                </div>
            </section>

            <section id="a-propos" className="flex flex-col items-center gap-6 py-20 px-6 bg-neutral-100 text-center">
                <h2 className="text-3xl md:text-4xl font-bold max-w-lg">Une cabine, mais en ligne</h2>
                <p className="text-neutral-600 max-w-xl text-sm md:text-base">
                    Cabine 2.0 reprend le service d'une cabine téléphonique de quartier — achat de pass internet,
                    de pass mix et transfert d'unité — et le rend accessible depuis ton téléphone, 24h/24,
                    pour Orange, Moov et MTN.
                </p>
            </section>
        </>
    )
}
