import { Sun, Moon } from "lucide-react";
import Button from "@/components/button/Button.jsx"

export default function Navbar() {
    return (
        <>
            <div className="grid grid-cols-3 h-20 fixed top-0 left-0 w-full bg-[var(--color-navbar)] shadow-lg px-25">
                <div className="flex justify-start items-center">
                    <div className="uppercase text-xl font-semibold tracking-wide text-[var(--color-text-active)]">
                        Sadamdahh.com
                    </div>
                </div>
                <div className="flex justify-center items-center text-[var(--color-text-muted)] text-lg gap-10">

                    <div className="relative cursor-pointer hover:text-[var(--color-text-active)] transition 
                        after:content-[''] after:absolute after:left-0 after:-bottom-1 
                        after:w-0 after:h-[3px] after:bg-[var(--color-border-active)] 
                        after:transition-all hover:after:w-full">
                        Let's Talk
                    </div>

                    <div className="relative cursor-pointer hover:text-[var(--color-text-active)] transition 
                        after:content-[''] after:absolute after:left-0 after:-bottom-1 
                        after:w-0 after:h-[3px] after:bg-[var(--color-border-active)] 
                        after:transition-all hover:after:w-full">
                        Projects
                    </div>

                    <div className="relative cursor-pointer hover:text-[var(--color-text-active)] transition 
                        after:content-[''] after:absolute after:left-0 after:-bottom-1 
                        after:w-0 after:h-[3px] after:bg-[var(--color-border-active)] 
                        after:transition-all hover:after:w-full">
                        Moments
                    </div>

                </div>
                <div className="flex justify-end items-center text-lg gap-10">
                    <div className="relative cursor-pointer hover:text-[var(--color-text-active)] transition 
                        after:content-[''] after:absolute after:left-0 after:-bottom-1 
                        after:w-0 after:h-[3px] after:bg-[var(--color-border-active)] 
                        after:transition-all hover:after:w-full">
                        <Moon size={25} />
                    </div>
                    <div>
                        
                        <Button link={"https://www.linkedin.com/in/sadampayodasabilillah"}>Connect</Button>
                    </div>
                </div>
            </div>
        </>
    )
}