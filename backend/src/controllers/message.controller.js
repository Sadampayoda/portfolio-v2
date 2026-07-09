import queryRepository from "../repositories/query.repository.js";
import response from "../utils/response.js";
import messageModel from "../models/message.model.js";
import db from "../config/firebase.js";

const messageCollection = db.collection(messageModel.table)

const messageController = {
    getMessage: async (req, res, next) => {
        try {
            const { page, limit } = req.params;
            const result = await queryRepository.getAll(messageCollection, page, limit)
            return response.success(res, result, "get chat success")
        } catch (err) {
            next(err);
        }
    },
    getById: async (req, res, next) => {
        try {
            const data = req.params.id;
            const result = await queryRepository.getById(messageCollection, data)
            return response.success(res, { result }, "Get message by id success")

        } catch (err) {
            next(err);
        }
    },

}

export default messageController;