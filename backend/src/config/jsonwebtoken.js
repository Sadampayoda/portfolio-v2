import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiry = process.env.JWT_EXPIRES_IN;


const jsonWebToken = {
    generateToken: (user) => {
        return jwt.sign({ user }, jwtSecret, { expiresIn: jwtExpiry })
    }
}

export default jsonWebToken;
