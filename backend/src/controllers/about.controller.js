import response from "../utils/response.js";
import db from "../config/firebase.js";
import aboutModel from "../models/about.model.js";
import queryRepository from "../repositories/query.repository.js";
import dataHelper from "../helpers/data.helper.js";

const collectionRef = db.collection(aboutModel.table)


const aboutController = {
    getAbout: async (req, res) => {
        try {
            const result = await queryRepository.getAll(collectionRef)
            return response.success(res, result, "get about success")
        } catch (err) {
            console.log(err)
            return response.error(res, "Get all about failed", err.message)
        }
    },
    getById: async (req, res) => {
        try {
            const data = req.params.id;

            const validated = await dataHelper.validateFindData(collectionRef, res, data)
            if (validated.error) {
                return validated.error
            }

            const result = await queryRepository.getById(collectionRef, data)
            return response.success(res, result, "Get about by id success")

        } catch (err) {
            console.log(err)
            return response.error(res, "Get about by id failed", err.message)
        }
    },
    createAbout: async (req, res) => {
        try {
            const data = req.body;
            if (!data || Object.keys(data).length === 0) {
                return response.badRequest(res, 'Failed to create about data', 'Data is empty')
            }

            const aboutValidation = aboutModel.schema.validate(data);
            if (aboutValidation.error) {
                return response.badRequest(res, 'Failed to create about data', aboutValidation.error)
            }

            const result = await queryRepository.store(collectionRef, data)

            return response.created(res, result, "Created about data success")
        } catch (err) {
            console.log(err)
            return response.error(res, "Create about failed", err.message)
        }
    },
    updateAbout: async (req, res) => {
        try {
            const data = req.body;
            const id = req.params.id;

            if (!data || Object.keys(data).length === 0) {
                return response.badRequest(res, 'Failed to update about data', 'Data is empty')
            }

            const validated = await dataHelper.validateFindData(collectionRef, res, id)
            if (validated.error) {
                return validated.error
            }


            const aboutValidation = aboutModel.schemaUpdate.validate(data);
            if (aboutValidation.error) {
                return response.badRequest(res, 'Failed to update about data', aboutValidation.error)
            }

            const result = await queryRepository.update(collectionRef, data, id)

            return response.created(res, result, "Updated about data success")
        } catch (err) {
            console.log(err)
            return response.error(res, "Update about failed", err.message)
        }
    },
    deleteAbout: async (req, res) => {
        try {
            const id = req.params.id;

            const validated = await dataHelper.validateFindData(collectionRef, res, id)
            if (validated.error) {
                return validated.error
            }

            const result = await queryRepository.softDeletes(collectionRef, id)
            return response.success(res, result, "Deleted about data success")

        } catch (err) {
            console.log(err)
            return response.error(res, "Delete about failed", err.message)
        }
    }

}

export default aboutController;
