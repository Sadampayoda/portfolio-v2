import Joi from "joi";

const momentModel = {
    table: 'moments',
    schema: Joi.object({
        group: Joi.string().required(),
        title: Joi.string().required(),
        location: Joi.string().optional(),
        subtitle: Joi.array()
            .items(Joi.string())
            .optional(),
        start_year: Joi.number().optional(),
        end_year: Joi.number().optional(),
        description: Joi.string().required(),
        image_url: Joi.string().optional(),
        created_at: Joi.date().optional(),
        updated_at: Joi.date().optional(),
        deleted_at: Joi.date().optional(),
    }),
    schemaUpdate: Joi.object({
        group: Joi.string().optional(),
        title: Joi.string().optional(),
        location: Joi.string().optional(),
        subtitle: Joi.array()
            .items(Joi.string())
            .optional(),
        start_year: Joi.number().optional(),
        end_year: Joi.number().optional(),
        description: Joi.string().optional(),
        image_url: Joi.string().optional(),
    }).min(1)
}

export default momentModel;