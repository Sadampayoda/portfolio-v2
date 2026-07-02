import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import config from "./app.js";

dotenv.config();

const jwtSecret = config.jwt.secret;
const jwtExpiry = config.jwt.expiresIn;


const jsonWebToken = {
    generateToken: (user) => {
        return jwt.sign({ user }, jwtSecret, { expiresIn: jwtExpiry })
    }
}

export default jsonWebToken;
