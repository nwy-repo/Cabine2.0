

export default function Home() {

    return(
        <section className="bg-[url('../images/courv0.png')] bg-cover md:bg-center h-screen bg-[position:75%_75%] flex flex-col text-start items-start justify-center">
            <div className="ml-20">
                <h1 className="text-6xl font-bold text-white">CABINE 2.0<br />CABINE EN LIGNE</h1>
                <p className="text-white">Souscription appel, internet et transfert D'unité</p>
                <div className="flex gap-4 mt-10">
                    <button className="hover:bg-blue-800 transition py-3 px-6 bg-gradient-to-r from-blue-800 to-blue-600 shadow-xl rounded-xl text-white font-bold">Souscrire</button>
                    <button className="hover:bg-blue-800 transition py-3 px-6 bg-gradient-to-r from-blue-800 to-blue-600 shadow-xl rounded-xl text-white font-bold">À propos</button>
                </div>
            </div>
        </section>
    )
}