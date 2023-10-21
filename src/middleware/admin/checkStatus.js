const Joi = require ('joi')

const checkStatus = Joi.object().keys({
    status: Joi.string().
    valid('pending', 'in-progress', 'completed', 'rejected').trim().required(),
  
});

const changeStatusMiddleware = (request, response, next) => {
    const validated = checkStatus.validate(request.body);

    if (validated.error){
        return response.status(400).json({
            status: 'error',
            message: 'A validation error occured',
            error: validated.error.details[0].message
        })
    }

    next();
}

module.exports = changeStatusMiddleware;