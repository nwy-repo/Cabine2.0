

export default function Contact() {

    return(
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
                action=""
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
                        placeholder="Votre Nom" />
                    <input className="text-white bg-gray-400/35 h-12 border-3 border-gray-500/95 rounded-xl p-2" type="text" placeholder="Votre Prénom" />
                </div>
                <div className="flex md:flex-row flex-col gap-5">
                    <input className="text-white bg-gray-400/35 h-12 border-3 border-gray-500/95 rounded-xl p-2" type="text" placeholder="Numéro" />
                    <input className="text-white bg-gray-400/35 h-12 border-3 border-gray-500/95 rounded-xl p-2" type="text" placeholder="Email" />
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
                    name=""
                    id=""
                ></textarea>
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
                    "
                    type="submit"
                    value="Envoyé"
                />
            </form>
        </section>
    )
}