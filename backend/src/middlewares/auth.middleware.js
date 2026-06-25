import response from "../utils/response.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.unauthorized(res, "Token not found")
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return response.unauthorized(res, "Token is invalid")
        }
        req.user = decoded.user;
        next()
    });

}

export default authMiddleware;
