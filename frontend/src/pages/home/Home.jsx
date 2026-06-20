import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import background from "@/assets/images/background.png"
import backgroundDark from "@/assets/images/background-dark.png"
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { SendHorizontal } from "lucide-react";

export default function Home({ isDarkMode, setIsDarkMode }) {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, [location]);

    return (
        <>
            <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            {/* Container Welcome */}
            <div className="flex flex-col mt-20">
                <div className="relative min-h-[calc(100vh-5rem)] flex items-center py-12 md:py-0 overflow-hidden">
                    {/* Light Background Layer */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
                        style={{ 
                            backgroundImage: `url(${background})`,
                            opacity: isDarkMode ? 0 : 1,
                            zIndex: 1
                        }}
                    />
                    {/* Dark Background Layer */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
                        style={{ 
                            backgroundImage: `url(${backgroundDark})`,
                            opacity: isDarkMode ? 1 : 0,
                            zIndex: 2
                        }}
                    />

                    {/* Gradient Overlay to blend bottom edge into page background */}
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none z-10 transition-colors duration-700" />

                    {/* Content Container */}
                    <div className="relative max-w-2xl px-6 sm:px-12 md:ml-12 lg:ml-20 w-full z-20">

                        {/* Label */}
                        <div className="text-xs sm:text-sm tracking-widest text-[var(--color-text-muted)] mb-4 border px-3 py-1 inline-block rounded-full">
                            WEB DEVELOPER
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[var(--color-text-active)]">
                            Building Scalable <br className="hidden sm:inline" />
                            <span className="text-gray-400">
                                Web Systems &
                            </span><br className="hidden sm:inline" />
                            Digital Experiences.
                        </h1>

                        {/* Description */}
                        <p className="mt-6 text-[var(--color-text)] max-w-xs sm:max-w-sm md:max-w-md text-sm sm:text-base leading-relaxed">
                            Focused on clean architecture, performance, and maintainable code.
                            Turning complex ideas into fast, reliable, and user-friendly web applications.
                        </p>

                        {/* Scroll */}
                        <div className="mt-8 sm:mt-10 flex items-center gap-4 text-xs tracking-widest text-[var(--color-text-muted)]">
                            <div className="w-10 h-[1px] bg-[var(--color-text-muted)]"></div>
                            SCROLL TO EXPLORE
                        </div>

                    </div>
                </div>

                {/* Container AI */}
                <div id="ai-chat" className="min-h-screen md:h-screen bg-[var(--color-bg)] p-4 sm:p-6 md:p-10 flex flex-col transition-colors duration-700">

                    {/* Title */}
                    <div className="flex justify-center py-6 md:py-10">
                        <p className="text-[var(--color-text-active)] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-center px-4">
                            Tanya Apa Saja <span className="text-gray-400">Tentang Sadam.</span>
                        </p>
                    </div>

                    {/* Input */}
                    <div className="flex justify-center px-4 w-full">

                        <div className="
                            flex items-center
                            rounded-2xl
                            px-3
                            shadow-lg
                            border border-[var(--color-border)]
                            bg-[var(--color-card)]
                            focus-within:border-[var(--color-text-active)]
                            focus-within:shadow-xl
                            transition-all
                            duration-700
                            w-full
                            max-w-[700px]
                        ">

                            <input
                                type="text"
                                placeholder="Penasaran tentang Sadam? Yuk ngobrol 👋"
                                className="
                                    h-14
                                    flex-1
                                    p-2
                                    bg-transparent
                                    outline-none
                                    text-[var(--color-text)]
                                    placeholder:text-[var(--color-text-muted)]
                                    text-sm sm:text-base
                                "
                            />

                            <button
                                className="
                                    flex items-center justify-center
                                    bg-[var(--color-button)]
                                    text-[var(--color-text-button)]
                                    cursor-pointer
                                    rounded-xl
                                    w-11 h-11
                                    hover:bg-[var(--color-button-hover)]
                                    hover:scale-105
                                    transition-all
                                    duration-700
                                "
                            >
                                <SendHorizontal size={18} />
                            </button>

                        </div>

                    </div>

                    {/* Chat Box History */}
                    <div className="flex justify-center mt-6 md:mt-8 flex-1 overflow-hidden px-4">

                        <div className="
                            w-full
                            max-w-[750px]
                            rounded-3xl
                            bg-[var(--color-card)]
                            p-4 sm:p-6
                            overflow-y-auto
                            shadow-sm
                            border border-[var(--color-border)]
                            min-h-[300px]
                            md:h-0
                            transition-all
                            duration-700
                        ">

                            <div className="flex mb-4">
                                <div className="
                                    bg-[var(--color-bg-secondary)]
                                    text-[var(--color-text)]
                                    px-4 py-3
                                    shadow-sm
                                    rounded-2xl
                                    max-w-[85%]
                                    text-sm sm:text-base
                                    transition-all
                                    duration-700
                                ">
                                    Halo 👋 Saya AI yang siap membantu menjelaskan tentang Sadam,
                                    pengalaman, project, dan teknologi yang digunakan.
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                <Footer />

            </div>
        </>
    );
}