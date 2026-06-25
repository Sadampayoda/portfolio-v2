import response from "../utils/response.js";
import db from "../config/firebase.js";
import momentModel from "../models/moment.model.js";
import queryRepository from "../repositories/query.repository.js";
import dataHelper from "../helpers/data.helper.js";

const collectionRef = db.collection(momentModel.table)


const momentController = {
    getMoment: async (req, res, next) => {
        try {
            const { page, limit } = req.params;
            const result = await queryRepository.getAll(collectionRef, page, limit)
            return response.success(res, result, "get moment success")
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
            return response.success(res, result, "Get moment by id success")

        } catch (err) {
            next(err);
        }
    },
    createMoment: async (req, res, next) => {
        try {
            const data = req.body;
            if (!data || Object.keys(data).length === 0) {
                return response.badRequest(res, 'Failed to create moment data', 'Data is empty')
            }

            const momentValidation = momentModel.schema.validate(data);
            if (momentValidation.error) {
                return response.badRequest(res, 'Failed to create moment data', momentValidation.error)
            }

            const result = await queryRepository.store(collectionRef, data)

            return response.created(res, result, "Created moment data success")
        } catch (err) {
            next(err);
        }
    },
    updateMoment: async (req, res, next) => {
        try {
            const data = req.body;
            const id = req.params.id;

            if (!data || Object.keys(data).length === 0) {
                return response.badRequest(res, 'Failed to update moment data', 'Data is empty')
            }

            const validated = await dataHelper.validateFindData(collectionRef, res, id)
            if (validated.error) {
                return validated.error
            }


            const aboutValidation = momentModel.schemaUpdate.validate(data);
            if (aboutValidation.error) {
                return response.badRequest(res, 'Failed to update moment data', aboutValidation.error)
            }

            const result = await queryRepository.update(collectionRef, data, id)

            return response.created(res, result, "Updated moment data success")
        } catch (err) {
            next(err);
        }
    },
    deleteMoment: async (req, res, next) => {
        try {
            const id = req.params.id;

            const validated = await dataHelper.validateFindData(collectionRef, res, id)
            if (validated.error) {
                return validated.error
            }

            const result = await queryRepository.softDeletes(collectionRef, id)
            return response.success(res, result, "Deleted moment data success")

        } catch (err) {
            next(err);
        }
    }

}

export default momentController;
