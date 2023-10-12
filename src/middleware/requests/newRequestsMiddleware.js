const Joi = require ('joi')

const requestSchema = Joi.object({
    details: Joi.string().min(5).required(),
});

const newRequestsMiddleware = (request, response, next) => {
    const validated = requestSchema.validate(request.body);

    if(validated.error){
        return response.status(400).json({
            status: 'error',
            message: validated.error.details[0].message
        })
    }
    next();
}
module.exports = newRequestsMiddleware;