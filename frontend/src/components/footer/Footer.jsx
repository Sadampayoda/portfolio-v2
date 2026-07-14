

export default function Footer() {
    return (
        <>
            <div className="py-10 md:py-0 md:h-[180px] bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] flex items-center transition-colors duration-700">

                <div className="w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-16 gap-4">

                    {/* Left */}
                    <div className="uppercase text-xl font-semibold tracking-wide text-[var(--color-text-active)] text-center md:text-left">
                        Sadamdahh.com
                    </div>

                    {/* Right */}
                    <div className="text-center md:text-right text-[var(--color-text-muted)] text-sm tracking-wide">
                        © 2026 Sadam. Dibuat dengan sepenuh hati & kode 🚀
                    </div>

                </div>

            </div>
        </>
    )
}