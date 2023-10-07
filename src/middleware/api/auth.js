const jwt = require('jsonwebtoken');

const apiAuth = (request, response, next) => {
    try{
        const tokem = request.headers.authorization.split('')[1];
        const decodedToken = jwt.verify(token, 'SECRETKEY');
        const id = decodedToken.Id;
        if (request.body.id && request.body.id !== id) {
            throw 'Invalid user ID';
        } else {
            next()
        }
    } catch {
        response.status(401).json({
            error: new Error('Invalid request')
        });
    }
}

module.exports = apiAuth

