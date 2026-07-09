import queryRepository from "../repositories/query.repository.js";
import response from "../utils/response.js";
import db from "../config/firebase.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

const chatCollection = db.collection(chatModel.table)
const messageCollection = db.collection(messageModel.table)

const chatController = {
    getChat: async (req, res, next) => {
        try {
            const { page, limit } = req.params;
            const result = await queryRepository.getAll(chatCollection, page, limit)
            return response.success(res, result, "get chat success")
        } catch (err) {
            next(err);
        }
    },
    getById: async (req, res, next) => {
        try {
            const id = req.params.id;

            const result = await queryRepository.getById(chatCollection, id)


            const messages = await queryRepository.getByField(messageCollection, 'chat_id', id, "asc")

            result.message = Array.isArray(messages)
                ? messages.map(item => {
                    return {
                        role: item.role,
                        parts: [{ text: item.content }]
                    }
                })
                : [];

            return response.success(res, { result }, "Get chat by id success")

        } catch (err) {
            next(err);
        }
    },

}

export default chatController;