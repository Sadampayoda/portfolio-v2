

export default function Message({
    content,
    role = 'end'
}
) {
    return (
        <div className={`flex mb-4 ${role === 'start' ? 'justify-start' : 'justify-end'}`}>
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
                {content}
            </div>
        </div>
    )
}

// Halo 👋 Saya AI yang siap membantu menjelaskan tentang Sadam,
//                 pengalaman, project, dan teknologi yang digunakan.