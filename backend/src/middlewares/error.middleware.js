import response from "../utils/response.js"

const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err.statusCode) {
        return response.error(res, err.message, err.statusCode, err.error)
    }
    return response.error(res, err.message, 500, err.error)
}




export default errorMiddleware;