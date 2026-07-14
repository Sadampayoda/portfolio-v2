import { useState } from "react";
import { X } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import hero from "@/assets/hero.png";
import { useMoments } from "../../hooks/moment/useMoments";

export default function Moments({ isDarkMode, setIsDarkMode }) {
    const [selectedMoment, setSelectedMoment] = useState(null);
    const { moments, loading } = useMoments();

    if (loading) {
        return (
            <>
                <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                
                <div className="flex flex-col mt-20 min-h-[calc(100vh-5rem)] bg-[var(--color-bg)] transition-colors duration-700">
                    
                    {/* Timeline Header Section */}
                    <div className="py-16 px-6 sm:px-12 md:px-20 max-w-4xl mx-auto text-center">
                        <span className="text-xs tracking-widest text-[var(--color-text-muted)] font-semibold uppercase block mb-3 animate-pulse">
                            LINIMASA
                        </span>
                        <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded mx-auto mb-6 animate-pulse"></div>
                        <div className="h-6 w-96 bg-gray-200 dark:bg-gray-800 rounded mx-auto animate-pulse"></div>
                    </div>

                    {/* Hero Portrait Banner */}
                    <div className="px-6 max-w-4xl mx-auto w-full mb-16 animate-pulse">
                        <div className="rounded-3xl bg-gray-200 dark:bg-gray-800 aspect-[21/9] md:aspect-[3/1]"></div>
                    </div>

                    {/* Timeline Section */}
                    <div className="relative max-w-5xl mx-auto w-full px-6 py-12 mb-24">
                        
                        {/* Vertical Center Line */}
                        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-800 opacity-20" />

                        <div className="flex flex-col gap-16 relative z-10">
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row relative items-start md:items-center">
                                    
                                    {/* Marker */}
                                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4.5 h-4.5 rounded-full bg-gray-300 dark:bg-gray-700 border-4 border-[var(--color-bg)] z-20 animate-pulse" />

                                    {/* Content Card */}
                                    <div className={`
                                        w-full md:w-1/2 pl-12 md:pl-0 
                                        ${idx % 2 === 0 ? "md:pr-12 md:text-right" : "md:order-2 md:pl-12 md:text-left"}
                                    `}>
                                        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm animate-pulse">
                                            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
                                            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-3"></div>
                                            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
                                            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6 mb-4"></div>
                                            <div className="flex gap-2">
                                                <div className="h-5 w-12 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                                <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Blank side spacer */}
                                    <div className="hidden md:block w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Footer />
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            
            <div className="flex flex-col mt-20 min-h-[calc(100vh-5rem)] bg-[var(--color-bg)] transition-colors duration-700">
                
                {/* Timeline Header Section */}
                <div className="py-16 px-6 sm:px-12 md:px-20 max-w-4xl mx-auto text-center">
                    <span className="text-xs tracking-widest text-[var(--color-text-muted)] font-semibold uppercase block mb-3">
                        LINIMASA
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-active)] mb-6">
                        Perjalanan Karir & Hidup
                    </h1>
                    <p className="text-base sm:text-lg text-[var(--color-text)] leading-relaxed max-w-2xl mx-auto mb-4">
                        Menelusuri perjalanan pemikiran kreatif dari tahun-tahun awal penemuan hingga dunia kecerdasan buatan dan rekayasa full-stack yang kompleks.
                    </p>
                    <span className="text-xs tracking-wider text-[var(--color-text-muted)] font-bold">
                        MULAI 2004 — SEKARANG
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
                        {moments.data?.map((moment, index) => {
                            const prevMoment = index > 0 ? moments.data[index - 1] : null;
                            const showGroupHeader = moment.group && moment.group !== prevMoment?.group;
                            const side = index % 2 === 0 ? "left" : "right";
                            const currentYear = new Date().getFullYear();
                            const isEndYearPresent = !moment.end_year || Number(moment.end_year) === currentYear;
                            const dateStr = moment.start_year 
                                ? `${moment.start_year} — ${isEndYearPresent ? "SEKARANG" : moment.end_year}` 
                                : "";
                            const isMajor = !!moment.image_url;

                            return (
                                <div key={moment.id} className="flex flex-col gap-16">
                                    {showGroupHeader && (
                                        <div className="flex justify-start md:justify-center items-center my-6 ml-10 md:ml-0">
                                            <span className="bg-[var(--color-button)] text-[var(--color-text-button)] px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase border border-[var(--color-border-active)] shadow-sm">
                                                {moment.group}
                                            </span>
                                        </div>
                                    )}

                                    {/* Timeline Item Row */}
                                    <div className="flex flex-col md:flex-row relative items-start md:items-center">
                                        
                                        {/* Alternating Node marker shapes (Major vs Intermediate) */}
                                        {isMajor ? (
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
                                            ${side === "left" ? "md:pr-12 md:text-right" : "md:order-2 md:pl-12 md:text-left"}
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
                                                    {dateStr}
                                                </span>

                                                {/* Milestone Title */}
                                                <h3 className="text-xl font-bold text-[var(--color-text-active)] mb-3">
                                                    {moment.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-sm text-[var(--color-text)] leading-relaxed mb-4 line-clamp-3">
                                                    {moment.description}
                                                </p>

                                                {/* Tags */}
                                                <div className={`flex flex-wrap gap-2 ${side === "left" ? "md:justify-end" : "md:justify-start"}`}>
                                                    {(moment.subtitle || []).map((tag) => (
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
                                aria-label="Tutup dialog"
                            >
                                <X size={24} />
                            </button>
                            
                            {/* Date */}
                            <span className="text-xs tracking-wider text-[var(--color-text-muted)] font-semibold uppercase block mb-2">
                                {(() => {
                                    const currentYear = new Date().getFullYear();
                                    const isEndYearPresent = !selectedMoment.end_year || Number(selectedMoment.end_year) === currentYear;
                                    return selectedMoment.start_year 
                                        ? `${selectedMoment.start_year} — ${isEndYearPresent ? "SEKARANG" : selectedMoment.end_year}` 
                                        : "";
                                })()}
                            </span>
                            
                            {/* Title */}
                            <h3 className="text-2xl font-bold text-[var(--color-text-active)] mb-4">
                                {selectedMoment.title}
                            </h3>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {(selectedMoment.subtitle || []).map((tag) => (
                                    <span key={tag} className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[var(--color-bg-secondary)] text-[var(--color-text-active)] border border-[var(--color-border)]">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Long Detailed Description */}
                            <div className="max-h-[240px] sm:max-h-[320px] overflow-y-auto custom-scrollbar pr-2 mb-8">
                                <p className="text-base text-[var(--color-text)] leading-relaxed whitespace-pre-line">
                                    {selectedMoment.description}
                                </p>
                            </div>
                            
                            {/* Close Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setSelectedMoment(null)}
                                    className="cursor-pointer bg-[var(--color-button)] text-[var(--color-text-button)] px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-button-hover)] transition-all duration-300"
                                >
                                    Tutup
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
