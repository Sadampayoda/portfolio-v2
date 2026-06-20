import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const PROJECTS_PER_PAGE = 3;

const MOCK_PROJECTS = [
    {
        id: 1,
        title: "Neural Nexus AI",
        category: "Non-Hosting",
        tags: ["Python", "PyTorch", "LLM"],
        description: "An autonomous knowledge synthesis engine designed for enterprise-scale semantic mapping and conversational data extraction.",
        link: "#",
        gradient: "from-indigo-600 to-purple-600"
    },
    {
        id: 2,
        title: "Prism Dashboard",
        category: "Hosting (Live)",
        tags: ["React", "Three.js", "WebGL"],
        description: "A next-generation spatial computing dashboard utilizing high-performance rendering for 3D visualization of infrastructure data.",
        link: "https://prism-demo.sadampayoda.com",
        gradient: "from-orange-500 to-rose-500"
    },
    {
        id: 3,
        title: "Aether Core Engine",
        category: "Non-Hosting",
        tags: ["Go", "gRPC", "Redis"],
        description: "The backbone microservice platform for modular portfolio deployments, optimized for high throughput and extremely low latency.",
        link: "#",
        gradient: "from-teal-500 to-emerald-500"
    },
    {
        id: 4,
        title: "Apex Analytics Portal",
        category: "Hosting (Live)",
        tags: ["Next.js", "Tailwind", "PostgreSQL"],
        description: "A secure, enterprise analytics console showing real-time system metrics with customizable visual charts and automated reporting.",
        gradient: "from-cyan-500 to-blue-600",
        link: "https://apex.sadampayoda.com"
    },
    {
        id: 5,
        title: "Solaris Prediction Hub",
        category: "Hosting (Live)",
        tags: ["FastAPI", "Svelte", "Scikit-Learn"],
        description: "An AI-powered forecasting suite that visualizes solar activity patterns and generates automated climatology analysis reports.",
        gradient: "from-amber-400 to-orange-600",
        link: "https://solaris.sadampayoda.com"
    },
    {
        id: 6,
        title: "Chronos Scheduler",
        category: "Non-Hosting",
        tags: ["Rust", "Wasm", "Docker"],
        description: "A sandboxed job orchestrator running high-density task loops with sub-millisecond precision across distributed clusters.",
        gradient: "from-fuchsia-600 to-pink-600",
        link: "#"
    },
    {
        id: 7,
        title: "ByteVault Encryption",
        category: "Non-Hosting",
        tags: ["C++", "WebAssembly", "Core"],
        description: "A client-side zero-knowledge cryptography suite compiling optimized WebAssembly binaries directly into standard browsers.",
        gradient: "from-sky-500 to-indigo-500",
        link: "#"
    },
    {
        id: 8,
        title: "Nexus Gate Portal",
        category: "Hosting (Live)",
        tags: ["Vue", "Firebase", "WebSockets"],
        description: "A collaborative live-syncing workspace platform facilitating remote agile workflow management and secure messaging.",
        gradient: "from-violet-500 to-purple-600",
        link: "https://nexus-portal.sadampayoda.com"
    }
];

export default function Projects({ isDarkMode, setIsDarkMode }) {
    const [activeTab, setActiveTab] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    // Filter projects
    const filteredProjects = MOCK_PROJECTS.filter((project) => {
        if (activeTab === "All") return true;
        return project.category === activeTab;
    });

    // Pagination calculations
    const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const currentProjects = filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

    return (
        <>
            <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <div className="flex flex-col mt-20 min-h-[calc(100vh-5rem)]">
                
                {/* Projects Section */}
                <div id="projects" className="bg-[var(--color-bg-secondary)] flex-1 py-20 transition-colors duration-700">
                    <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16">
                        
                        {/* Header */}
                        <div className="mb-12">
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-active)] mb-4">
                                Curated Works
                            </h1>
                            <p className="text-base sm:text-lg text-[var(--color-text)] max-w-2xl leading-relaxed">
                                Engineering sophisticated digital experiences at the intersection of human-centric design, robust backend systems, and modern web architectures.
                            </p>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            {["All", "Hosting (Live)", "Non-Hosting"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabChange(tab)}
                                    className={`
                                        cursor-pointer
                                        px-5 py-2
                                        text-xs font-semibold tracking-wider uppercase
                                        rounded-full
                                        transition-all duration-300
                                        border border-[var(--color-border-active)]
                                        ${activeTab === tab 
                                            ? "bg-[var(--color-button)] text-[var(--color-text-button)] border-[var(--color-button)]" 
                                            : "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-border)] border-[var(--color-border-active)]"
                                        }
                                    `}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Grid Projects */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {currentProjects.map((project) => (
                                <div 
                                    key={project.id}
                                    className="
                                        flex flex-col
                                        rounded-2xl
                                        overflow-hidden
                                        bg-[var(--color-card)]
                                        border border-[var(--color-border)]
                                        shadow-sm hover:shadow-xl hover:-translate-y-1
                                        transition-all duration-300
                                    "
                                >
                                    {/* CSS Gradient Placeholder Image Container */}
                                    <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} flex items-center justify-center p-6 relative overflow-hidden group`}>
                                        {/* Abstract Grid Overlays */}
                                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent mix-blend-overlay"></div>
                                        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                                        
                                        <span className="text-white text-5xl font-black tracking-widest opacity-25 group-hover:scale-110 transition-transform duration-500 select-none">
                                            {project.title.split(" ").map(w => w[0]).join("")}
                                        </span>
                                    </div>

                                    {/* Content Details */}
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {project.tags.map((tag) => (
                                                    <span key={tag} className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[var(--color-bg-secondary)] text-[var(--color-text-active)] border border-[var(--color-border)]">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-xl font-bold text-[var(--color-text-active)] mb-2">
                                                {project.title}
                                            </h2>

                                            {/* Description */}
                                            <p className="text-sm text-[var(--color-text)] mb-6 leading-relaxed line-clamp-3">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Action button */}
                                        <div>
                                            {project.category === "Hosting (Live)" ? (
                                                <a 
                                                    href={project.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-[var(--color-text-active)] hover:text-gray-400 transition"
                                                >
                                                    View Live Demo <span className="ml-1 text-sm">→</span>
                                                </a>
                                            ) : (
                                                <span className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-[var(--color-text-muted)] cursor-not-allowed">
                                                    Local Environment <span className="ml-1 text-sm">⊘</span>
                                                </span>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2">
                                {/* Prev */}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`
                                        cursor-pointer px-4 py-2 text-xs font-bold uppercase rounded-xl border border-[var(--color-border)] transition-all duration-300
                                        ${currentPage === 1 
                                            ? "text-[var(--color-text-muted)] bg-transparent border-transparent cursor-not-allowed" 
                                            : "text-[var(--color-text-active)] hover:bg-[var(--color-bg)] border-[var(--color-border-active)]"
                                        }
                                    `}
                                >
                                    Prev
                                </button>

                                {/* Page Numbers */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`
                                            cursor-pointer w-9 h-9 flex items-center justify-center text-xs font-bold rounded-xl border transition-all duration-300
                                            ${currentPage === page
                                                ? "bg-[var(--color-button)] text-[var(--color-text-button)] border-[var(--color-border-active)]"
                                                : "bg-transparent text-[var(--color-text)] border-[var(--color-border)] hover:bg-[var(--color-bg)]"
                                            }
                                        `}
                                    >
                                        {page}
                                    </button>
                                ))}

                                {/* Next */}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`
                                        cursor-pointer px-4 py-2 text-xs font-bold uppercase rounded-xl border border-[var(--color-border)] transition-all duration-300
                                        ${currentPage === totalPages 
                                            ? "text-[var(--color-text-muted)] bg-transparent border-transparent cursor-not-allowed" 
                                            : "text-[var(--color-text-active)] hover:bg-[var(--color-bg)] border-[var(--color-border-active)]"
                                        }
                                    `}
                                >
                                    Next
                                </button>
                            </div>
                        )}

                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
