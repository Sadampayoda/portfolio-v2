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
    getMessage: async (req, res, next) => {
        try {
            const { name } = req.query;
            if (!name) {
                return response.badRequest(res, "Name is required");
            }
            let chat = await queryRepository.getByFieldFirst(chatCollection, 'name', name)

            if (!chat || Object.keys(chat).length === 0) {
                return response.notFound(res, "Chat not found");
            }

            const messages = await queryRepository.getByField(messageCollection, 'chat_id', chat.id)
            chat.message = Array.isArray(messages)
                ? messages.map(item => {
                    return {
                        role: item.role,
                        content: item.content
                    }
                })
                : [];

            return response.success(res, { data: chat }, "Get message data success");
        } catch (err) {
            next(err)
        }
    },
    createResponse: async (req, res, next) => {
        try {
            const { name, content } = req.body;
            let chat = await queryRepository.getByFieldFirst(chatCollection, 'name', name)

            if (!chat || Object.keys(chat).length === 0) {
                chat = await queryRepository.store(chatCollection, {
                    name: name
                })

            }

            const history = await queryRepository.getByField(messageCollection, 'chat_id', chat.id)

            const result = await geminiAiService.response(content, history);
            if (!result) {
                return response.notFound(res, "Failed Created Response Data")
            }

            await queryRepository.store(messageCollection, {
                chat_id: chat.id,
                role: RoleType.USER,
                content: content
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
    },
    deleteMessage: async (req, res, next) => {
        try {
            const { name } = req.query;
            if (!name) {
                return response.badRequest(res, "Name is required");
            }
            let chat = await queryRepository.getByFieldFirst(chatCollection, 'name', name);

            if (!chat || Object.keys(chat).length === 0) {
                return response.notFound(res, "Chat not found");
            }

            // Get all messages under this chat
            const messages = await queryRepository.getByField(messageCollection, 'chat_id', chat.id);
            
            // Delete messages from collection
            if (Array.isArray(messages)) {
                for (const msg of messages) {
                    await queryRepository.destroy(messageCollection, msg.id);
                }
            }
            
            // Delete the chat document
            await queryRepository.destroy(chatCollection, chat.id);

            return response.success(res, null, "Delete message data success");
        } catch (err) {
            next(err)
        }
    }
}

export default geminiAiController;