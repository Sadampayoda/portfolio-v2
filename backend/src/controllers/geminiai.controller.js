import geminiAiService from "../services/geminiai.service.js";
import response from "../utils/response.js";
import messageModel from "../models/message.model.js";
import db from "../config/firebase.js";
import chatModel from "../models/chat.model.js";
import queryRepository from "../repositories/query.repository.js";
import RoleType from "../constants/RoleType.js";

const messageCollection = db.collection(messageModel.table)
const chatCollection = db.collection(chatModel.table)

const geminiAiController = {
    createResponse: async (req, res, next) => {
        try {
            const { name, contents } = req.body;
            let chat = await queryRepository.getByFieldFirst(chatCollection, 'name', name)
            
            if (!chat || Object.keys(chat).length === 0) {
                chat = await queryRepository.store(chatCollection, {
                    name: name
                })

            }
        
            const history = await queryRepository.getByField(messageCollection, 'chat_id', chat.id)

            const result = await geminiAiService.response(contents, history);
            if (!result) {
                return response.notFound(res, "Failed Created Response Data")
            }

            await queryRepository.store(messageCollection, {
                chat_id: chat.id,
                role: RoleType.USER,
                content: contents
            })
            await queryRepository.store(messageCollection, {
                chat_id: chat.id,
                role: RoleType.MODEL,
                content: result
            })
            


            const messages = await queryRepository.getByField(messageCollection, 'chat_id', chat.id)
            chat.message = Array.isArray(messages)
                ? messages.map(item => {
                    return {
                        role: item.role,
                        parts: [{ text: item.content }]
                    }
                })
                : [];

            return response.success(res, { chat }, "Created response data success");
        } catch (err) {
            next(err)
        }
    }
}

export default geminiAiController;