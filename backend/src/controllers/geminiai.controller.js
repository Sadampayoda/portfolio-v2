import geminiAiService from "../services/geminiai.service.js";
import response from "../utils/response.js";

const geminiAiController = {
    createResponse: async (req, res, next) => {
        try {
            const data = req.body;
            const result = await geminiAiService.response(req, res);
            return response.success(res, result, "Created response data success");
        } catch (err) {
            next(err)
        }
    }
}

export default geminiAiController;