// utils/gradient.js
const GRADIENTS = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-purple-500",
    "from-yellow-500 to-orange-500",
    "from-pink-500 to-rose-500",
    "from-sky-500 to-blue-500",
];

export function getRandomGradient(seed) {
    // pakai seed (misal id atau title) biar gradient konsisten,
    // gak ganti-ganti tiap kali komponen re-render
    let hash = 0;
    const str = String(seed);
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % GRADIENTS.length;
    return GRADIENTS[index];
}