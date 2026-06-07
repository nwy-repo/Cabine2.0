import { useState } from "react"


export default function Header() {
    const [open, setOpen] = useState(false)

    return(
        <header className="fixed w-full top-0 bg-white/85 px-6 z-50">
            <nav className="flex text-center items-center justify-between md:gap-0 gap-7 h-20">
                <button
                    className="md:hidden text-black text-3xl"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>

                <ul className="hidden md:flex text-center items-center gap-5">
                    <li>Home</li>
                    <li>Orange</li>
                    <li>Moov</li>
                    <li>Mtn</li>
                </ul>

                <h1 className="md:text-4xl text-2xl text-blue-500 font-bold">CABINE 2.0</h1>

                <button className="md:py-3 py-2 md:px-6 px-4 rounded-xl font-bold text-white shadow-xl bg-blue-500">Contact</button>
            </nav>

            {open && (
                <div className="md:hidden list-none w-full flex flex-col items-center gap-6 py-6 bg-white/8">
                    <li className="">Home</li>
                    <li className="">Orange</li>
                    <li className="">Moov</li>
                    <li className="">Mtn</li>
                </div>
            )}
        </header>
    )
}