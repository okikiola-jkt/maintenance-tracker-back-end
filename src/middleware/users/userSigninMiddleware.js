const Joi = require ('joi')

const userSigninSchema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required().min(6),
});

const userSigninMiddleware = (request, response, next) => {
    const validated = userSigninSchema.validate(request.body);

    if (validated.error){
        return response.status(400).json({
            status: 'error',
            messgae: 'A validation error occured',
            error: validated.error.details[0].message
        })
    }

    next();
}

module.exports = userSigninMiddleware;