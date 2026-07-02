import Joi from "joi";
import ProjectType, { ProjectTypeValues } from "../constants/ProjectType.js";

const projectModel = {
    table: 'projects',
    schema: Joi.object({
        type: Joi.string().valid(...ProjectTypeValues).required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        tools: Joi.array()
            .items(Joi.string())
            .optional(),
        image_url: Joi.string().optional(),
        github_url: Joi.string().optional(),
        hosting_url: Joi.string().optional(),
        created_at: Joi.date().optional(),
        updated_at: Joi.date().optional(),
        deleted_at: Joi.date().optional(),
    }),
    schemaUpdate: Joi.object({
        type: Joi.string().valid(...ProjectTypeValues).optional(),
        title: Joi.string().optional(),
        tools: Joi.array()
            .items(Joi.string())
            .optional(),
        description: Joi.string().optional(),
        image_url: Joi.string().optional(),
        github_url: Joi.string().optional(),
        hosting_url: Joi.string().optional()
    }).min(1)
}

export default projectModel;