import response from "../utils/response.js";
import config from "../config/app.js";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import queryRepository from "../repositories/query.repository.js";
import db from "../config/firebase.js";

const collectionRef = db.collection(userModel.table)

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return response.unauthorized(res, "API Key not found")
    }

    const existingUser = await queryRepository.getByField(collectionRef, 'api_key', apiKey);

    if (!existingUser?.[0]) {
        return response.unauthorized(res, "API Key is invalid")
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.unauthorized(res, "Token not found")
    }

    const token = authHeader.split(' ')[1];
    // const token = req.cookies.token;
    // if(!token) {
    //     return response.unauthorized(res, "Token not found");
    // }

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
            return response.unauthorized(res, "Token is invalid")
        }
        req.user = decoded.user;
        next()
    });

}

export default authMiddleware;
