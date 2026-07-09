import response from "../utils/response.js";
import db from "../config/firebase.js";
import projectModel from "../models/project.model.js";
import queryRepository from "../repositories/query.repository.js";
import dataHelper from "../helpers/data.helper.js";
import responseHelper from "../helpers/response.helper.js";

const collectionRef = db.collection(projectModel.table)


const projectController = {
    getProject: async (req, res, next) => {
        try {
            const { page, limit, type } = req.query;
            const result = await queryRepository.getAll(collectionRef, page, limit, {
                type: type
            })

            return response.success(res, result, "get project success")
        } catch (err) {
            next(err);
        }
    },
    getById: async (req, res, next) => {
        try {
            const data = req.params.id;

            const validated = await dataHelper.validateFindData(collectionRef, res, data)
            if (validated.error) {
                return validated.error
            }

            const result = await queryRepository.getById(collectionRef, data)
            return response.success(res, result, "Get project by id success")

        } catch (err) {
            next(err);
        }
    },
    createProject: async (req, res, next) => {
        try {
            const data = req.body;
            if (!data || Object.keys(data).length === 0) {
                return response.badRequest(res, 'Failed to create project data', 'Data is empty')
            }

            const projectValidation = projectModel.schema.validate(data);
            if (projectValidation.error) {
                return response.badRequest(res, 'Failed to create project data', projectValidation.error)
            }

            const result = await queryRepository.store(collectionRef, data)

            return response.created(res, result, "Created project data success")
        } catch (err) {
            next(err);
        }
    },
    updateProject: async (req, res, next) => {
        try {
            const data = req.body;
            const id = req.params.id;

            if (!data || Object.keys(data).length === 0) {
                return response.badRequest(res, 'Failed to update project data', 'Data is empty')
            }

            const validated = await dataHelper.validateFindData(collectionRef, res, id)
            if (validated.error) {
                return validated.error
            }


            const projectValidation = projectModel.schemaUpdate.validate(data);
            if (projectValidation.error) {
                return response.badRequest(res, 'Failed to update project data', projectValidation.error)
            }

            const result = await queryRepository.update(collectionRef, data, id)

            return response.created(res, result, "Updated project data success")
        } catch (err) {
            next(err);
        }
    },
    deleteProject: async (req, res, next) => {
        try {
            const id = req.params.id;

            const validated = await dataHelper.validateFindData(collectionRef, res, id)
            if (validated.error) {
                return validated.error
            }

            const result = await queryRepository.softDeletes(collectionRef, id)
            return response.success(res, result, "Deleted project data success")

        } catch (err) {
            next(err);
        }
    }

}

export default projectController;
