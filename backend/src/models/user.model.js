import Joi from 'joi';

const userModel = {
    table: 'users',
    schema: Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(50).required(),
        api_key: Joi.string().optional(),
        created_at: Joi.date().optional(),
        updated_at: Joi.date().optional(),
        deleted_at: Joi.date().optional(),
    }),
    schemaUpdate: Joi.object({
        name: Joi.string().min(3).max(50).optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().min(6).max(50).optional(),
    }).min(1)
}


export default userModel;