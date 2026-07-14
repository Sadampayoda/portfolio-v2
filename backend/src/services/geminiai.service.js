import { GoogleGenAI } from '@google/genai';
import config from '../config/app.js';
import RoleType from '../constants/RoleType.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../config/firebase.js';
import aboutModel from '../models/about.model.js';
import projectModel from '../models/project.model.js';
import momentModel from '../models/moment.model.js';
import queryRepository from '../repositories/query.repository.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROMPT_FILE_PATH = path.join(__dirname, '../prompt/gemini.prompt.md');

const client = new GoogleGenAI({
    apiKey: config.thirdParty.geminiai.key,
});

const geminiAiService = {
    response: async (contents, history) => {
        // 1. Read system prompt from markdown file
        let systemPrompt = "";
        try {
            systemPrompt = await fs.readFile(PROMPT_FILE_PATH, 'utf8');
        } catch (error) {
            console.error("Failed to read system prompt file:", error);
            systemPrompt = "Kamu adalah AI Assistant resmi pada portfolio milik Sadam Payoda Sabilillah.";
        }

        // 2. Fetch portfolio details from database
        let abouts = [];
        let projects = [];
        let moments = [];

        try {
            const aboutCollection = db.collection(aboutModel.table);
            const aboutResult = await queryRepository.getAll(aboutCollection);
            abouts = aboutResult ? aboutResult.data : [];
        } catch (error) {
            console.error("Failed to fetch abouts:", error);
        }

        try {
            const projectCollection = db.collection(projectModel.table);
            const projectResult = await queryRepository.getAll(projectCollection);
            projects = projectResult ? projectResult.data : [];
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        }

        try {
            const momentCollection = db.collection(momentModel.table);
            const momentResult = await queryRepository.getAll(momentCollection);
            moments = momentResult ? momentResult.data : [];
        } catch (error) {
            console.error("Failed to fetch moments:", error);
        }

        // Helper to truncate text to a maximum of 200 words
        const truncateTo200Words = (text) => {
            if (!text || typeof text !== 'string') return '';
            const words = text.trim().split(/\s+/);
            if (words.length > 200) {
                return words.slice(0, 200).join(' ') + '...';
            }
            return text;
        };

        // 3. Format database context for Gemini
        let databaseContext = "\n\n## DATA PORTFOLIO SADAM PAYODA SABILILLAH (DARI DATABASE):\n\n";

        databaseContext += "### INFORMASI ABOUT ME (TENTANG SADAM):\n";
        if (abouts && abouts.length > 0) {
            abouts.forEach(item => {
                const title = item.title || "";
                const desc = truncateTo200Words(item.description || "");
                databaseContext += `- **${title}**: ${desc}\n`;
            });
        } else {
            databaseContext += "- (Tidak ada data about)\n";
        }

        databaseContext += "\n### DAFTAR PROJECTS (PROYEK SADAM):\n";
        if (projects && projects.length > 0) {
            projects.forEach(item => {
                const title = item.title || "";
                const type = item.type || "";
                const desc = truncateTo200Words(item.description || "");
                const tools = Array.isArray(item.tools) ? item.tools.join(', ') : "";
                const github = item.github_url ? `(GitHub: ${item.github_url})` : "";
                const hosting = item.hosting_url ? `(Demo: ${item.hosting_url})` : "";
                databaseContext += `- **${title}** [Tipe: ${type}]\n  Deskripsi: ${desc}\n  Tools/Teknologi: ${tools}\n  Links: ${github} ${hosting}\n\n`;
            });
        } else {
            databaseContext += "- (Tidak ada data project)\n";
        }

        databaseContext += "\n### DAFTAR MOMENTS (PENGALAMAN & AKTIVITAS SADAM):\n";
        if (moments && moments.length > 0) {
            moments.forEach(item => {
                const title = item.title || "";
                const group = item.group || "";
                const location = item.location || "";
                const years = (item.start_year || item.end_year) ? `(${item.start_year || ""} - ${item.end_year || ""})` : "";
                const desc = truncateTo200Words(item.description || "");
                databaseContext += `- **${title}** [Kategori/Grup: ${group}] ${location} ${years}\n  Deskripsi: ${desc}\n\n`;
            });
        } else {
            databaseContext += "- (Tidak ada data moment)\n";
        }

        // 4. Combine file prompt and database context as full system instruction
        const fullSystemInstruction = systemPrompt + databaseContext;

        const historyMap = Array.isArray(history)
            ? history.map(doc => ({
                role: doc.role,
                parts: [{ text: doc.content }]
            }))
            : [];

        // 5. Query Gemini with the system instructions
        const response = await client.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: [
                ...historyMap,
                { role: RoleType.USER, parts: [{ text: contents }] }
            ],
            config: {
                systemInstruction: fullSystemInstruction,
            }
        });

        return response.candidates[0].content.parts[0].text;
    }
}

export default geminiAiService;