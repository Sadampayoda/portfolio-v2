import { StatusCodes, ReasonPhrases } from 'http-status-codes'


const response = {
    success: (res, data = null, message = ReasonPhrases.OK, code = StatusCodes.OK) => {
        return res.status(code).json({
            status: 'SUCCESS',
            code,
            message,
            data
        })
    },
    created: (res, data = null, message = ReasonPhrases.CREATED) => {
        return res.status(StatusCodes.CREATED).json({
            status: 'SUCCESS',
            code: StatusCodes.CREATED,
            message,
            data
        });
    },

    error: (res, message = ReasonPhrases.INTERNAL_SERVER_ERROR, code = StatusCodes.INTERNAL_SERVER_ERROR, errors = null) => {
        return res.status(code).json({
            status: 'ERROR',
            code,
            message,
            errors
        });
    },

    notFound: (res, message = ReasonPhrases.NOT_FOUND) => {
        return res.status(StatusCodes.NOT_FOUND).json({
            status: 'ERROR',
            code: StatusCodes.NOT_FOUND,
            message,
            data: null
        });
    },

    badRequest: (res, message = ReasonPhrases.BAD_REQUEST, errors = null) => {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'ERROR',
            code: StatusCodes.BAD_REQUEST,
            message,
            errors
        });
    },

    unauthorized: (res, message = ReasonPhrases.UNAUTHORIZED) => {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            status: 'ERROR',
            code: StatusCodes.UNAUTHORIZED,
            message,
            data: null
        });
    },

    forbidden: (res, message = ReasonPhrases.FORBIDDEN) => {
        return res.status(StatusCodes.FORBIDDEN).json({
            status: 'ERROR',
            code: StatusCodes.FORBIDDEN,
            message,
            data: null
        });
    }
}


export default response;