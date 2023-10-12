const jwt = require('jsonwebtoken');
const db = require('../../database/db');
require ('dotenv').config();

const getUserById = async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1'
    const response = await db.query(query, [id]);
    return response.rows[0];
}
const apiAuth = async (request, response, next) => {
    try{
        const token = request.headers.authorization.split(' ')[1];

        if (!token) {
            return response.status(401).json({
                status: 'error',
                message: 'No token provided',
            });
        }

        const decodedToken = jwt.verify(token, process.env.SECRETKEY);
          if (!decodedToken.id) {
            return response.status(401).json({
                status: 'error',
                message: 'Invalid token',
            });
        }

        const id = decodedToken.id;
        const user = await getUserById(id);
        if (!user) {
            return response.status(401).json({
                status: "error",
                message: "User does not exist"
            })
        }
        else{
            request.user = user;
            next()
        }
    } catch (err) {
        return response.status(401).json({
            status: "error",
            message: err.message
        });
    }
}

module.exports = apiAuth
