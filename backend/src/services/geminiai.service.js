import { GoogleGenAI } from '@google/genai';
import config from '../config/app.js';

const client = new GoogleGenAI({
    apiKey: config.thirdParty.geminiai.key,
});

const geminiAiService = {
    response: async (req, res) => {
        console.log('GEMINI KEY:', config.thirdParty.geminiai.key);
        return await client.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: 'Halo apa kabar AI ?',
        });
    }
}

export default geminiAiService;