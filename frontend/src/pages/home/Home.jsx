import background from "@/assets/images/background.png"
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { SendHorizontal } from "lucide-react";

export default function Home() {
    return (
        <>
            <Navbar />
            {/* Container Welcome */}
            <div className="flex flex-col mt-20">
                <div
                    className="h-screen bg-cover bg-center flex items-center"
                    style={{ backgroundImage: `url(${background})` }}
                >
                    <div className="max-w-2xl ml-20">

                        {/* Label */}
                        <div className="text-sm tracking-widest text-[var(--color-text-muted)] mb-4 border px-3 py-1 inline-block rounded-full">
                            WEB DEVELOPER
                        </div>

                        {/* Heading */}
                        <h1 className="text-7xl font-bold leading-tight text-[var(--color-text-active)]">
                            Building Scalable <br />
                            <span className="text-gray-400">
                                Web Systems &
                            </span><br />
                            Digital Experiences.
                        </h1>

                        {/* Description */}
                        <p className="mt-6 text-[var(--color-text)] max-w-md leading-relaxed">
                            Focused on clean architecture, performance, and maintainable code.
                            Turning complex ideas into fast, reliable, and user-friendly web applications.
                        </p>

                        {/* Scroll */}
                        <div className="mt-10 flex items-center gap-4 text-xs tracking-widest text-[var(--color-text-muted)]">
                            <div className="w-10 h-[1px] bg-[var(--color-text-muted)]"></div>
                            SCROLL TO EXPLORE
                        </div>

                    </div>
                </div>

                {/* Container AI */}
                <div className="h-screen bg-[var(--color-bg)] p-10 flex flex-col">

                    {/* Title */}
                    <div className="flex justify-center py-10">
                        <p className="text-[var(--color-text-active)] text-5xl font-bold leading-tight text-center">
                            Tanya Apa Saja <span className="text-gray-400">Tentang Sadam.</span>
                        </p>
                    </div>

                    {/* Input */}
                    <div className="flex justify-center">

                        <div className="
                    flex items-center
                    rounded-2xl
                    px-3
                    shadow-lg
                    border border-[var(--color-border)]
                    bg-white
                    focus-within:border-[var(--color-text-active)]
                    focus-within:shadow-xl
                    transition
                    w-[700px]
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
                        "
                            />

                            <button
                                className="
                            flex items-center justify-center
                            bg-[var(--color-button)]
                            text-white
                            cursor-pointer
                            rounded-xl
                            w-11 h-11
                            hover:bg-[var(--color-button-hover)]
                            hover:scale-105
                            transition
                        "
                            >
                                <SendHorizontal size={18} />
                            </button>

                        </div>

                    </div>

                    <div className="flex justify-center mt-8 flex-1 overflow-hidden">

                        <div className="
                    w-[750px]
                    rounded-3xl
                    bg-white
                    p-6
                    overflow-y-auto
                ">

                            <div className="flex mb-4">
                                <div className="
                            bg-[var(--color-bg-secondary)]
                            text-[var(--color-text)]
                            px-4 py-3
                            shadow
                            rounded-2xl
                            max-w-[80%]
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