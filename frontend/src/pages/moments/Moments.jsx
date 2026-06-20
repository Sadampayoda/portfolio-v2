import { useState } from "react";
import { X } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import hero from "@/assets/hero.png";

const MOCK_MOMENTS = [
    {
        id: 1,
        date: "2004 — 2010",
        title: "Elementary (SD)",
        brief: "The inception of curiosity. Early fascinations with logic puzzles and digital interfaces began here.",
        longDescription: "Selama masa Sekolah Dasar, Sadam mulai menunjukkan ketertarikan besar pada logika matematika, teka-teki taktis, dan permainan logika. Ini menjadi batu pijakan utama bagi perkembangan pola pikir analitis dan rasa ingin tahunya terhadap cara kerja dunia digital di masa depan.",
        tags: ["Foundation", "Curiosity"],
        side: "left",
        isMajor: true
    },
    {
        id: 2,
        date: "2010 — 2013",
        title: "Junior High (SMP)",
        brief: "Exploration of basic web structures. First lines of HTML and CSS were written during this pivotal period.",
        longDescription: "Di masa Sekolah Menengah Pertama, Sadam mulai mengeksplorasi dunia komputer lebih jauh. Ia menulis baris kode HTML dan CSS pertamanya untuk merancang halaman web statis sederhana. Periode penting ini menjadi gerbang perkenalan formalnya dengan dunia pemrograman.",
        tags: ["Web Core", "Design Intro"],
        side: "right",
        isMajor: false
    },
    {
        id: 3,
        date: "2013 — 2016",
        title: "Senior High (SMA)",
        brief: "Diving into algorithmic thinking and competitive programming. Focused on Mathematics and Physics.",
        longDescription: "Mengambil peminatan Matematika dan Ilmu Alam (MIPA) di Sekolah Menengah Atas, Sadam memperdalam pemahaman teoritisnya tentang kalkulus, fisika, dan algoritma dasar. Ketertarikannya mulai bergeser ke pemecahan masalah (problem-solving) dan pemrograman kompetitif tingkat dasar.",
        tags: ["Algorithms", "STEM Focus"],
        side: "left",
        isMajor: false
    },
    {
        id: 4,
        date: "2016 — 2020",
        title: "University",
        brief: "B.Sc. in Computer Science. Specialized in Human-Computer Interaction and Software Systems.",
        longDescription: "Sadam menempuh pendidikan tinggi Sarjana Komputer (S.Kom) dengan fokus pada rekayasa perangkat lunak, struktur data, arsitektur komputer, serta interaksi manusia dan komputer. Ia berhasil lulus dengan predikat memuaskan setelah menyelesaikan proyek tugas akhir berbasis sistem web modular skala besar.",
        tags: ["B.Sc", "Research"],
        side: "right",
        isMajor: true
    },
    // PROFESSIONAL ERA DIVIDER
    {
        id: 5,
        date: "2020 — 2022",
        title: "Junior Developer",
        brief: "Building scalable front-end solutions for high-traffic media platforms. Deep dive into React.",
        longDescription: "Memulai karir profesional pertamanya di industri teknologi sebagai Frontend Developer Junior. Sadam memfokuskan keahliannya pada ekosistem React.js dan Tailwind CSS, membangun antarmuka web interaktif berkinerja tinggi yang diakses oleh ribuan pengguna aktif setiap harinya.",
        tags: ["React", "Tailwind", "TypeScript"],
        side: "left",
        isMajor: false
    },
    {
        id: 6,
        date: "2022 — PRESENT",
        title: "AI & Full-Stack Engineer",
        brief: "Developing custom LLM integrations and neural architecture for predictive analytics.",
        longDescription: "Saat ini, Sadam bekerja sebagai insinyur perangkat lunak full-stack dengan spesialisasi pada integrasi kecerdasan buatan (AI). Ia merancang microservices backend yang kokoh, mengembangkan API cepat, serta mengintegrasikan model bahasa besar (LLMs) untuk kebutuhan analisis data bisnis prediktif.",
        tags: ["Python", "AI Integration", "Full-Stack"],
        side: "right",
        isMajor: true
    }
];

export default function Moments({ isDarkMode, setIsDarkMode }) {
    const [selectedMoment, setSelectedMoment] = useState(null);

    return (
        <>
            <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            
            <div className="flex flex-col mt-20 min-h-[calc(100vh-5rem)] bg-[var(--color-bg)] transition-colors duration-700">
                
                {/* Timeline Header Section */}
                <div className="py-16 px-6 sm:px-12 md:px-20 max-w-4xl mx-auto text-center">
                    <span className="text-xs tracking-widest text-[var(--color-text-muted)] font-semibold uppercase block mb-3">
                        THE TIMELINE
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-active)] mb-6">
                        The Path of Evolution
                    </h1>
                    <p className="text-base sm:text-lg text-[var(--color-text)] leading-relaxed max-w-2xl mx-auto mb-4">
                        Tracing the trajectory of a creative mind from the foundational years of discovery to the complex landscapes of artificial intelligence and full-stack engineering.
                    </p>
                    <span className="text-xs tracking-wider text-[var(--color-text-muted)] font-bold">
                        EST. 2004 — PRESENT
                    </span>
                </div>

                {/* Hero Portrait Banner */}
                <div className="px-6 max-w-4xl mx-auto w-full mb-16">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[var(--color-border)] aspect-[21/9] md:aspect-[3/1] bg-black">
                        <img 
                            src={hero} 
                            alt="Sadam portrait timeline" 
                            className="w-full h-full object-cover object-center opacity-85 hover:scale-102 transition-transform duration-700 ease-in-out" 
                        />
                        {/* Blurry fade edges for premium styling */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-[var(--color-bg)] opacity-70" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-transparent to-[var(--color-bg)] opacity-40" />
                    </div>
                </div>

                {/* Timeline Section */}
                <div className="relative max-w-5xl mx-auto w-full px-6 py-12 mb-24">
                    
                    {/* Vertical Center Line */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[var(--color-border-active)] opacity-20 z-0" />

                    <div className="flex flex-col gap-16 relative z-10">
                        {MOCK_MOMENTS.map((moment, index) => {
                            // Insert a visual section header before the 5th item (Professional Era)
                            const isProfessionalEraStart = moment.id === 5;

                            return (
                                <div key={moment.id} className="flex flex-col gap-16">
                                    {isProfessionalEraStart && (
                                        <div className="flex justify-start md:justify-center items-center my-6 ml-10 md:ml-0">
                                            <span className="bg-[var(--color-button)] text-[var(--color-text-button)] px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase border border-[var(--color-border-active)] shadow-sm">
                                                Professional Era
                                            </span>
                                        </div>
                                    )}

                                    {/* Timeline Item Row */}
                                    <div className="flex flex-col md:flex-row relative items-start md:items-center">
                                        
                                        {/* Alternating Node marker shapes (Major vs Intermediate) */}
                                        {moment.isMajor ? (
                                            <div 
                                                onClick={() => setSelectedMoment(moment)}
                                                className="
                                                    absolute left-6 md:left-1/2 -translate-x-1/2 
                                                    w-4.5 h-4.5 rounded-full 
                                                    bg-[var(--color-text-active)] 
                                                    border-4 border-[var(--color-bg)] 
                                                    shadow-md hover:scale-125
                                                    transition-all duration-300 
                                                    cursor-pointer z-20
                                                "
                                            />
                                        ) : (
                                            <div 
                                                onClick={() => setSelectedMoment(moment)}
                                                className="
                                                    absolute left-6 md:left-1/2 -translate-x-1/2 
                                                    w-4.5 h-4.5 rounded-full 
                                                    bg-[var(--color-bg)] 
                                                    border-4 border-[var(--color-text-muted)] 
                                                    shadow-sm hover:scale-125
                                                    transition-all duration-300 
                                                    cursor-pointer z-20
                                                    flex items-center justify-center
                                                "
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)]" />
                                            </div>
                                        )}

                                        {/* Spacer and Alternating Alignment Containers */}
                                        <div className={`
                                            w-full md:w-1/2 pl-12 md:pl-0 
                                            ${moment.side === "left" ? "md:pr-12 md:text-right" : "md:order-2 md:pl-12 md:text-left"}
                                        `}>
                                            <div 
                                                onClick={() => setSelectedMoment(moment)}
                                                className="
                                                    cursor-pointer
                                                    inline-block
                                                    w-full max-w-lg
                                                    bg-[var(--color-card)]
                                                    border border-[var(--color-border)]
                                                    rounded-2xl p-6
                                                    shadow-sm hover:shadow-xl hover:-translate-y-1
                                                    transition-all duration-300
                                                "
                                            >
                                                {/* Date Label */}
                                                <span className="text-xs tracking-wider text-[var(--color-text-muted)] font-semibold block mb-2">
                                                    {moment.date}
                                                </span>

                                                {/* Milestone Title */}
                                                <h3 className="text-xl font-bold text-[var(--color-text-active)] mb-3">
                                                    {moment.title}
                                                </h3>

                                                {/* Brief desc */}
                                                <p className="text-sm text-[var(--color-text)] leading-relaxed mb-4">
                                                    {moment.brief}
                                                </p>

                                                {/* Tags */}
                                                <div className={`flex flex-wrap gap-2 ${moment.side === "left" ? "md:justify-end" : "md:justify-start"}`}>
                                                    {moment.tags.map((tag) => (
                                                        <span key={tag} className="px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-[var(--color-bg-secondary)] text-[var(--color-text-active)] border border-[var(--color-border)]">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Blank side spacer for Desktop layout */}
                                        <div className="hidden md:block w-1/2" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Details Popup Modal */}
                {selectedMoment && (
                    <div 
                        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-6 z-50 transition-opacity"
                        onClick={() => setSelectedMoment(null)}
                    >
                        <div 
                            className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-3xl max-w-lg w-full p-8 shadow-2xl relative transition-all duration-300 transform scale-100"
                            onClick={(e) => e.stopPropagation()} // Prevent close on modal body click
                        >
                            {/* Close button */}
                            <button 
                                onClick={() => setSelectedMoment(null)}
                                className="absolute top-6 right-6 cursor-pointer text-[var(--color-text-muted)] hover:text-[var(--color-text-active)] transition focus:outline-none"
                                aria-label="Close dialog"
                            >
                                <X size={24} />
                            </button>
                            
                            {/* Date */}
                            <span className="text-xs tracking-wider text-[var(--color-text-muted)] font-semibold uppercase block mb-2">
                                {selectedMoment.date}
                            </span>
                            
                            {/* Title */}
                            <h3 className="text-2xl font-bold text-[var(--color-text-active)] mb-4">
                                {selectedMoment.title}
                            </h3>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedMoment.tags.map((tag) => (
                                    <span key={tag} className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[var(--color-bg-secondary)] text-[var(--color-text-active)] border border-[var(--color-border)]">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Long Detailed Description */}
                            <p className="text-base text-[var(--color-text)] leading-relaxed mb-8">
                                {selectedMoment.longDescription}
                            </p>
                            
                            {/* Close Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setSelectedMoment(null)}
                                    className="cursor-pointer bg-[var(--color-button)] text-[var(--color-text-button)] px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-button-hover)] transition-all duration-300"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <Footer />
            </div>
        </>
    );
}
