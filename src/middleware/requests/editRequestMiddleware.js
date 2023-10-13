const Joi = require ('joi')

const editRequestSchema = Joi.object({
    details: Joi.string().min(5).required(),
});

const editNewRequestsMiddleware = (request, response, next) => {
    const validated = editRequestSchema.validate(request.body);

    if(validated.error){
        return response.status(400).json({
            status: 'error',
            message: validated.error.details[0].message
        })
    }
    next();
}
module.exports = editNewRequestsMiddleware;