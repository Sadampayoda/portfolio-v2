import Joi from 'joi';
import { RoleTypeValues } from '../constants/RoleType.js';

const messageModel = {
    table: 'messages',
    schema: Joi.object({
        chat_id: Joi.string().required(),
        role: Joi.string().valid(...RoleTypeValues).required(),
        content: Joi.string().required(),
        created_at: Joi.date().optional(),
        deleted_at: Joi.date().optional(),
    }),
    schemaUpdate: Joi.object({
        content: Joi.string().optional(),
    }).min(1)
}

export default messageModel;