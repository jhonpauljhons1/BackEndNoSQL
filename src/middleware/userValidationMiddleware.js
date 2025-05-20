import {celebrate, Joi, Segments} from 'celebrate';

export const userValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().max(50).message({
            'string.empty': 'El nombre no puede estar vacío',
            'string.max': 'El nombre no puede tener más de 50 caracteres',
        }),
        email:Joi.string().required().email(),
        password:Joi.string().required().min(6),
    })
})