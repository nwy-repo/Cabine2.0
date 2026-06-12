import { useNavigate } from "react-router-dom"


export default function Internet() {
    const navigate = useNavigate();

    return(
        <section
            className="
                flex
                flex-col
                text-center
                items-center
                justify-center
                min-h-screen
                md:gap-20
                gap-15
                bg-gradient-to-t
                from-orange-500
                to-black
                p-6
            "
        >
        
            <h1
                className="
                    text-4xl
                    md:mt-25
                    mt-20
                    text-white
                    font-bold
                    md:mr-220
                    flex
                    md:flex-row
                    flex-col
                    text-center
                    items-center
                    md:gap-10
                "
            >
                <span
                    className="
                        text-orange-600 text-[15px]
                        underline
                        cursor-pointer
                    "
                    onClick={() => navigate('/Orange')}
                >
                    retour
                </span>
                Achat de pass
            </h1>


            <h2 className="-mb-15 md:mr-220 text-white">10Go à tout prix</h2>
            <div className="flex md:flex-row flex-col md:gap-10 gap-5">
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass internet" />
                    <h1 className="font-bold text-xl">Pass Internet</h1>
                </div>
        
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>
        
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Tranfert D'unité</h1>
                </div>
            </div>


            <h2 className="-mb-15 md:mr-220 text-white">Pass Illimité - RS</h2>
            <div className="flex md:flex-row flex-col md:gap-10 gap-5">
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass internet" />
                    <h1 className="font-bold text-xl">Pass Internet</h1>
                </div>
        
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>
            </div>

            <h2 className="-mb-15 md:mr-220 text-white">Pass Max it</h2>
            <div className="flex md:flex-row flex-col md:gap-10 gap-5">
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass internet" />
                    <h1 className="font-bold text-xl">Pass Internet</h1>
                </div>
        
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>
            </div>


            <h2 className="-mb-15 md:mr-220 text-white">Pass reseaux sociaux</h2>
            <div className="flex md:flex-row flex-col md:gap-10 gap-5">
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass internet" />
                    <h1 className="font-bold text-xl">Pass Internet</h1>
                </div>
        
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>
            </div>


            <h2 className="-mb-15 md:mr-220 text-white">Pass KDO Max</h2>
            <div className="flex md:flex-row flex-col md:gap-10 gap-5">
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass internet" />
                    <h1 className="font-bold text-xl">Pass Internet</h1>
                </div>
        
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>
            </div>


            <h2 className="-mb-15 md:mr-220 text-white">Pass 1 à 3 jours</h2>
            <div className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-5">
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass internet" />
                    <h1 className="font-bold text-xl">Pass Internet</h1>
                </div>
        
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>
            </div>


            <h2 className="-mb-15 md:mr-220 text-white">Pass 5 a 7 jours</h2>
            <div className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-5">
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass internet" />
                    <h1 className="font-bold text-xl">Pass Internet</h1>
                </div>
        
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>
            </div>



            <h2 className="-mb-15 md:mr-220 text-white">Pass Mois</h2>
            <div className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-5">
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass internet" />
                    <h1 className="font-bold text-xl">Pass Internet</h1>
                </div>
        
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>
            </div>



            <h2 className="-mb-15 md:mr-220 text-white">Pass Nuit</h2>
            <div className="flex md:flex-row flex-col md:gap-10 gap-5">
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" alt="icone pass internet" />
                    <h1 className="font-bold text-xl">Pass Internet</h1>
                </div>
            </div>
        
        </section>
    )
}