import { useState, useMemo } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { useProjects } from "../../hooks/project/useProjects";
import { getRandomGradient } from "../../utils/gradient";
import ProjectType, { ProjectTypeLabels } from '@/constants/projectEnum';

const PROJECTS_PER_PAGE = 2

export default function Projects({ isDarkMode, setIsDarkMode }) {

    const [activeTab, setActiveTab] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const searchParams = useMemo(() => ({
        type: activeTab === "All" ? null : activeTab,
    }), [activeTab]);
    const {
        projects,
        loading,
    error
    } = useProjects(currentPage, PROJECTS_PER_PAGE, searchParams);
    // Pagination calculations
    const totalPages = projects?.meta?.totalPages ?? 1
    const totalItems = projects?.meta?.totalItems ?? 0
    const hasNextPage = projects?.meta?.hasNextPage ?? false
    const hasPrevPage = projects?.meta?.hasPrevPage ?? false

    const types = [
        { value: "All", label: "All" },
        ...Object.entries(ProjectTypeLabels).map(([value, label]) => ({ value, label }))
    ];

    const handleTypeChange = (type) => {
        setActiveTab(type);
        setCurrentPage(1);
    }

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
                            {types.map((type) => (
                                <button
                                    key={type.value}
                                    onClick={() => handleTypeChange(type.value)}
                                    className={`
                                        cursor-pointer
                                        px-5 py-2
                                        text-xs font-semibold tracking-wider uppercase
                                        rounded-full
                                        transition-all duration-300
                                        border border-[var(--color-border-active)]
                                        ${activeTab === type.value
                                            ? "bg-[var(--color-button)] text-[var(--color-text-button)] border-[var(--color-button)]"
                                            : "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-border)] border-[var(--color-border-active)]"
                                        }
                                    `}
                                >
                                    {type.value}
                                </button>
                            ))}
                        </div>

                        {/* Grid Projects */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {projects.data?.map((project) => (
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
                                    <div className={`h-48 w-full relative overflow-hidden group ${!project.image_url ? `bg-gradient-to-br ${getRandomGradient(project.id || project.title)}` : ""}`}>
                                        {project.image_url ? (
                                            <img
                                                src={project.image_url}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <>
                                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent mix-blend-overlay"></div>
                                                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

                                                <div className="absolute inset-0 flex items-center justify-center p-6">
                                                    <span className="text-white text-5xl font-black tracking-widest opacity-25 group-hover:scale-110 transition-transform duration-500 select-none">
                                                        {project.title.split(" ").map(w => w[0]).join("")}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Content Details */}
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {project.tools.map((tag) => (
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
                                            {project.type === "hosting" ? (
                                                <a
                                                    href={project.hosting_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-[var(--color-text-active)] hover:text-gray-400 transition"
                                                >
                                                    View Live Demo <span className="ml-1 text-sm">→</span>
                                                </a>
                                            ) : (
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-[var(--color-text-active)] hover:text-gray-400 transition"
                                                >
                                                    View Github <span className="ml-1 text-sm">→</span>
                                                </a>
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
                                    disabled={!hasPrevPage}
                                    className={`
                                        cursor-pointer px-4 py-2 text-xs font-bold uppercase rounded-xl border border-[var(--color-border)] transition-all duration-300
                                        ${!hasPrevPage
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
                                    disabled={!hasNextPage}
                                    className={`
                                        cursor-pointer px-4 py-2 text-xs font-bold uppercase rounded-xl border border-[var(--color-border)] transition-all duration-300
                                        ${!hasNextPage
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
