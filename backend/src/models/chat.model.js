import Joi from 'joi';

const chatModel = {
    table: 'chats',
    schema: Joi.object({
        name: Joi.string().required(),
        created_at: Joi.date().optional(),
        updated_at: Joi.date().optional(),
        deleted_at: Joi.date().optional(),
    }),
    schemaUpdate: Joi.object({
        name: Joi.string().optional(),
    }).min(1)
}


export default chatModel;