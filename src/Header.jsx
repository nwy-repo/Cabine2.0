import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


export default function Header() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return(
        <header className="fixed w-full top-0 bg-white/85  z-50">
            <nav className="flex text-center items-center px-6 justify-between md:gap-0 gap-7 h-20 shadow-xl w-full">
                <button
                    className="md:hidden text-black text-3xl"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>

                <ul className="hidden md:flex text-center items-center gap-5">
                    <Link to='/'>Home</Link>
                    <Link to='/operateur/orange'>Orange</Link>
                    <Link to='/operateur/moov'>Moov</Link>
                    <Link to='/operateur/mtn'>Mtn</Link>
                </ul>

                <h1
                    className="
                        md:text-4xl
                        text-2xl
                        text-blue-500
                        font-bold
                        cursor-pointer
                    "
                    onClick={() => navigate('/')}
                >
                    CABINE 2.0
                </h1>

                <button
                    className="
                        md:py-3
                        py-2
                        md:px-6
                        px-4
                        rounded-xl
                        font-bold
                        text-white
                        shadow-xl
                        bg-blue-500
                        cursor-pointer
                    "
                    onClick={() => navigate('/Contact')}
                >
                    Contact
                </button>
            </nav>

            {open && (
                <div className="md:hidden list-none w-full flex flex-col items-center gap-6 py-6 bg-white/8">
                    <Link
                        to='/'
                        onClick={() => setOpen(false)}
                    >
                        Home
                    </Link>

                    <Link
                        to='/operateur/orange'
                        onClick={() => setOpen(false)}
                    >
                        Orange
                    </Link>

                    <Link
                        to='/operateur/moov'
                        onClick={() => setOpen(false)}
                    >
                        Moov
                    </Link>

                    <Link
                        to='/operateur/mtn'
                        onClick={() => setOpen(false)}
                    >
                        Mtn
                    </Link>
                </div>
            )}
        </header>
    )
}
