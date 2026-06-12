import { RouterContextProvider, useNavigate } from "react-router-dom";
import pass_internet from "../images/passi.png";
import pass_mix from "../images/passm.png";
import tranf from "../images/transf.png";
import { useState } from "react";


export default function Orange() {
    const navigate = useNavigate();

    return(
        <section className="flex flex-col text-center items-center p-4 justify-center min-h-screen gap-20 bg-gradient-to-t from-orange-500 to-black">

            <h1
                className="
                    md:text-6xl
                    text-4xl
                    text-orange-600
                    mt-20
                    font-bold
                    flex
                    flex-col
                    text-center
                    items-center
                    gap-5
                "
            >
                <span
                    className="
                        text-orange-600 text-[15px]
                        underline
                        cursor-pointer
                    "
                    onClick={() => navigate('/')}
                >
                    retour
                </span>
                ORANGE CI
            </h1>
            <div className="flex md:flex-row flex-col gap-10">
                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                    onClick={() => navigate('/Achat-pass')}
                >
                    <img className="md:w-20 w-10" src={pass_internet} alt="icone pass internet" />
                    <h1 className="font-bold text-xl">Pass Internet</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" src={pass_mix} alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Pass Mix</h1>
                </div>

                <div
                    className="flex text-start items-center cursor-pointer justify-center bg-white/85 w-80 h-25 gap-8 px-2"
                >
                    <img className="md:w-20 w-10" src={tranf} alt="icone pass mix" />
                    <h1 className="font-bold text-xl">Tranfert D'unité</h1>
                </div>
            </div>

        </section>
    )
}