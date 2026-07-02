import Joi from 'joi';

const messageModel = {
    table: 'messages',
    schema: Joi.object({
        chat_id: Joi.string().required(),
        role: Joi.string().valid('user', 'model').required(),
        text: Joi.string().required(),
        created_at: Joi.date().optional(),
        deleted_at: Joi.date().optional(),
    }),
    schemaUpdate: Joi.object({
        text: Joi.string().optional(),
    }).min(1)
}

export default messageModel;