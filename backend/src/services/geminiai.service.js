import { GoogleGenAI } from '@google/genai';
import config from '../config/app.js';
import RoleType from '../constants/RoleType.js';
const client = new GoogleGenAI({
    apiKey: config.thirdParty.geminiai.key,
});

const geminiAiService = {
    response: async (contents, history) => {
        const historyMap = Array.isArray(history)
            ? history.map(doc => ({
                role: doc.role,
                parts: [{ text: doc.content }]
            }))
            : [];

        const response = await client.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: [
                ...historyMap,
                { role: RoleType.USER, parts: [{ text: contents }] }
            ],
        });


        return response.candidates[0].content.parts[0].text;
    }
}

export default geminiAiService;