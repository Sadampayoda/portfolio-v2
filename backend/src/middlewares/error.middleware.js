import response from "../utils/response.js";
import logger from "../config/logger.js";

const errorMiddleware = (err, req, res, next) => {
    logger.error('Request error', {
        method: req.method,
        url: req.originalUrl,
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode || 500
    });
    
    if (err.statusCode) {
        return response.error(res, err.message, err.statusCode, err.error)
    }
    return response.error(res, err.message, 500, err.error)
}





export default errorMiddleware;