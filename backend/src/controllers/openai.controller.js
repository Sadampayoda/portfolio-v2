import openAiService from "../services/openai.service.js";
import response from "../utils/response.js";

const openaiController = {
    createResponse: async (req, res, next) => {
        try {
            const data = req.body;
            const result = await openAiService.response(req, res);
            return response.success(res, result, "Created response data success");
        } catch (err) {
            next(err)
        }
    }
}

export default openaiController;