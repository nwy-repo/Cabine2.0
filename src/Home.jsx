

export default function Home() {

    return(
        <section className="bg-[url('../images/courv0.png')] bg-cover md:bg-center h-screen bg-[position:75%_75%] flex flex-col text-start items-start justify-center">
            <div className="md:ml-20 ml-5 md:bg-transparent bg-white/85 px-4 py-6 rounded-xl">
                <h1 className="md:text-6xl text-3xl font-bold md:text-white text-black">CABINE 2.0<br />CABINE EN LIGNE</h1>
                <p className="md:text-white text-black md:text-xs text-[10px]">Souscription appel, internet et transfert D'unité</p>
                <div className="flex gap-4 mt-10">
                    <button className="transition py-3 px-6 bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-600 hover:to-blue-800 shadow-xl rounded-xl text-white font-bold">Souscrire</button>
                    <button className="transition py-3 px-6 bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-600 hover:to-blue-800 shadow-xl rounded-xl text-white font-bold">À propos</button>
                </div>
            </div>
        </section>
    )
}