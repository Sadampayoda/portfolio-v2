import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"

export default function JobPortal({ isDarkMode, setIsDarkMode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <main className="mt-20 w-full h-[calc(85vh-5rem)]">
                <iframe
                    src="https://talent.xenopati.my.id/embed/5KneQYvpuR7ZHc18S8XIaciAR9WRSbghdPCdlitO"
                    title="Public Job Portal"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin">
                </iframe>
            </main>
            <Footer />
        </div>
    )
}