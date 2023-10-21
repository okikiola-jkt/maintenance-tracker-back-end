const Joi = require ('joi')

const adminSigninSchema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required().min(6),
});

const adminSigninMiddleware = (request, response, next) => {
    const validated = adminSigninSchema.validate(request.body);

    if (validated.error){
        return response.status(400).json({
            status: 'error',
            message: 'A validation error occured',
            error: validated.error.details[0].message
        })
    }

    next();
}

module.exports = adminSigninMiddleware;