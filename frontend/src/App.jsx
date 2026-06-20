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