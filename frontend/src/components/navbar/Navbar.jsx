import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import Button from "@/components/button/Button.jsx"

export default function Navbar({ isDarkMode, setIsDarkMode }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLetsTalkClick = () => {
        setIsOpen(false);
        if (location.pathname === "/") {
            const element = document.getElementById("ai-chat");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            navigate("/#ai-chat");
        }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full h-20 bg-[var(--color-navbar)] shadow-lg px-6 md:px-12 lg:px-24 flex items-center justify-between z-50 transition-colors duration-700">
                {/* Logo */}
                <Link to="/" onClick={() => setIsOpen(false)} className="uppercase text-xl font-semibold tracking-wide text-[var(--color-text-active)] z-50 select-none">
                    Sadamdahh.com
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center text-[var(--color-text-muted)] text-lg gap-10">
                    <button
                        onClick={handleLetsTalkClick}
                        className="relative cursor-pointer hover:text-[var(--color-text-active)] transition focus:outline-none
                        after:content-[''] after:absolute after:left-0 after:-bottom-1 
                        after:w-0 after:h-[3px] after:bg-[var(--color-border-active)] 
                        after:transition-all hover:after:w-full"
                    >
                        Let's Talk
                    </button>

                    <Link
                        to="/projects"
                        className="relative cursor-pointer hover:text-[var(--color-text-active)] transition 
                        after:content-[''] after:absolute after:left-0 after:-bottom-1 
                        after:w-0 after:h-[3px] after:bg-[var(--color-border-active)] 
                        after:transition-all hover:after:w-full"
                    >
                        Projects
                    </Link>

                    <Link
                        to="/moments"
                        className="relative cursor-pointer hover:text-[var(--color-text-active)] transition 
                        after:content-[''] after:absolute after:left-0 after:-bottom-1 
                        after:w-0 after:h-[3px] after:bg-[var(--color-border-active)] 
                        after:transition-all hover:after:w-full"
                    >
                        Moments
                    </Link>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center text-lg gap-10">
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="relative cursor-pointer hover:text-[var(--color-text-active)] transition focus:outline-none"
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? <Sun size={25} /> : <Moon size={25} />}
                    </button>
                    <Button link={"https://www.linkedin.com/in/sadampayodasabilillah"}>Connect</Button>
                </div>

                {/* Mobile Menu Toggle & Theme */}
                <div className="flex md:hidden items-center gap-6 z-50">
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="cursor-pointer text-[var(--color-text-active)] hover:scale-105 transition focus:outline-none"
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? <Sun size={25} /> : <Moon size={25} />}
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="cursor-pointer text-[var(--color-text-active)] focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu Drawer */}
                <div className={`
                    fixed top-0 right-0 h-screen w-full sm:w-[320px] bg-[var(--color-navbar)] shadow-2xl p-8 flex flex-col pt-24 gap-8 transition-all duration-300 ease-in-out z-40
                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                    md:hidden
                `}>
                    <div className="flex flex-col gap-6 text-[var(--color-text-muted)] text-xl items-start">
                        <button
                            onClick={handleLetsTalkClick}
                            className="cursor-pointer text-left hover:text-[var(--color-text-active)] transition focus:outline-none"
                        >
                            Let's Talk
                        </button>
                        <Link
                            to="/projects"
                            onClick={() => setIsOpen(false)}
                            className="cursor-pointer hover:text-[var(--color-text-active)] transition"
                        >
                            Projects
                        </Link>
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="cursor-pointer hover:text-[var(--color-text-active)] transition"
                        >
                            Moments
                        </Link>
                    </div>
                    <div className="w-full h-[1px] bg-[var(--color-border-active)] opacity-10"></div>
                    <div onClick={() => setIsOpen(false)} className="w-full">
                        <Button link={"https://www.linkedin.com/in/sadampayodasabilillah"}>Connect</Button>
                    </div>
                </div>

                {/* Backdrop Overlay for Mobile Drawer */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden transition-opacity"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </nav>
        </>
    )
}