import response from "../utils/response.js";
import logger from "../config/logger.js";

const errorMiddleware = (err, req, res, next) => {
    logger.error(err.message);
    if (err.statusCode) {
        return response.error(res, err.message, err.statusCode, err.error)
    }
    return response.error(res, err.message, 500, err.error)
}




export default errorMiddleware;