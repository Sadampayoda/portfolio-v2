import OpenAI from 'openai';
import config from '../config/app.js';

const client = new OpenAI({
    apiKey: config.thirdParty.openai.key,
});

const openAiService = {
    response: async (req, res) => {
        return await client.responses.create({
            model: 'gpt-5.5',
            instructions: 'You are a coding assistant that talks like a pirate',
            input: 'Are semicolons optional in JavaScript?',
        });
    }
}

export default openAiService;