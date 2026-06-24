import Joi from 'joi';

const aboutModel = {
    table: 'abouts',
    schema: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image_url: Joi.string().optional(),
        created_at: Joi.date().optional(),
        updated_at: Joi.date().optional(),
        deleted_at: Joi.date().optional(),
    }),
    schemaUpdate: Joi.object({
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        image_url: Joi.string().optional(),
    }).min(1)
}


export default aboutModel;