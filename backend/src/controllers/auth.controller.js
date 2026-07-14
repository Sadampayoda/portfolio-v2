import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import queryRepository from "../repositories/query.repository.js";
import response from "../utils/response.js";
import jsonWebToken from "../config/jsonwebtoken.js";
import db from "../config/firebase.js";

const collectionRef = db.collection(userModel.table)
const authController = {
    register: async (req, res, next) => {
        try {
            const data = req.body;
            if (!data || Object.keys(data).length === 0) {
                return response.badRequest(res, 'Failed to create user data', 'Data is empty')
            }

            const existingUser = await queryRepository.getByField(collectionRef, 'email', data.email);
            if (existingUser[0]) {
                return response.badRequest(res, 'Email already registered');
            }

            const existingName = await queryRepository.getByField(collectionRef, 'name', data.name);
            if (existingName[0]) {
                return response.badRequest(res, 'Name already registered');
            }

            const userValidation = userModel.schema.validate(data);
            if (userValidation.error) {
                return response.badRequest(res, 'Failed to create user data', userValidation.error)
            }

            const hashedPassword = await bcrypt.hash(data.password, 10);
            await queryRepository.store(collectionRef, {
                ...data,
                password: hashedPassword
            })

            return response.success(res, null, "Created user data success")

        } catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
        try {
            const data = req.body;
            if (!data || Object.keys(data).length === 0) {
                return response.badRequest(res, 'Failed to create user data', 'Data is empty')
            }

            const authValidation = userModel.schema.validate(data);
            if (authValidation.error) {
                return response.badRequest(res, 'Failed to create user data', authValidation.error)
            }

            const getUser = await queryRepository.getByField(collectionRef, 'email', data.email)
            const existingUser = getUser[0] || {};
            if (!existingUser || Object.keys(existingUser).length === 0) {
                return response.notFound(res, 'User not found')
            }

            const isPasswordValid = await bcrypt.compare(data.password, existingUser.password);
            if (!isPasswordValid) {
                return response.badRequest(res, 'Invalid password')
            }

            const token = jsonWebToken.generateToken({
                name: existingUser.name,
                email: existingUser.email,
            });
            return response.success(res, {
                token: token,
                user: {
                    name: existingUser.name,
                    email: existingUser.email,
                }
            }, "Login success")
        } catch (err) {
            next(err);
        }
    }
}

export default authController;