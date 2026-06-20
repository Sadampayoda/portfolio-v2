

export default function Footer() {
    return (
        <>
            <div className="h-[250px] bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)]">

                <div className="h-full grid grid-cols-2 items-center px-16">

                    {/* Left */}
                    <div className="uppercase text-xl font-semibold tracking-wide text-[var(--color-text-active)]">
                        Sadamdahh.com
                    </div>

                    {/* Right */}
                    <div className="text-right text-[var(--color-text-muted)] text-sm tracking-wide">
                        © 2026 Sadam. Crafted with passion & code 🚀
                    </div>

                </div>

            </div>
        </>
    )
}