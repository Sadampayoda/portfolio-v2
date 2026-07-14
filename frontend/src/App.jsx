import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home/Home";
import Projects from "@/pages/projects/Projects";
import Moments from "@/pages/moments/Moments";

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("theme");
            if (saved) {
                return saved === "dark";
            }
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    useEffect(() => {
        const hostname = window.location.hostname;
        const isLocal = hostname === "localhost" || 
                        hostname === "127.0.0.1" || 
                        hostname.startsWith("192.168.") || 
                        hostname.startsWith("10.") || 
                        hostname.endsWith(".local");
        
        document.title = isLocal ? "sadamdahhh.com" : (hostname || "sadamdahhh.com");
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
                <Route path="/projects" element={<Projects isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
                <Route path="/moments" element={<Moments isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
            </Routes>
        </BrowserRouter>
    )
}