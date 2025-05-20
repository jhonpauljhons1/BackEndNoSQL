import {errors as celebrateErrors} from 'celebrate';

export const celebrateErrorHandler = celebrateErrors();

export const generateErrorHandler = (err, req, res, next) => {
    if (err.joi) {
        return res.status(400).json({
            message: 'Error de validacion',
            details: err.joi.details.map(detail => detail.message),
        });
    }
    console.error(err.stack);
    res.status(500).json({
        message: 'Error interno del servidor',
    });
};