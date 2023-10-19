const jwt = require('jsonwebtoken');
const db = require('../../database/db');
require('dotenv').config();

const getAdminById = async (id) => {
    const query = 'SELECT * FROM admin WHERE id = $1'
    const response = await db.query(query, [id])
    return response.rows[0];
}

const adminApiAuth = async (request, response, next) => {
    try{
        const token = request.headers.authorization;

        if (!token){
            return response.status(401).json({
                status: 'error',
                message: 'No token provided'
            });
        }

        const decodedToken = jwt.verify(token, process.env.SECRETKEY)
        if (!decodedToken.id){
            return response.status(401).json({
                status: 'error',
                message: 'Invalid token'
            })
        }

        const id = decodedToken.id;
        const admin = await getAdminById(id);
        if (!admin) {
            return response.status(401).json({
                status: 'error',
                message: 'Admin does not exist'
            })
        }else{
            request.admin = admin;
            next()
        }
    } catch (err) {
        return response.status(401).json({
            status: 'error',
            messgae: err.message
        });
    }
};

module.export = adminApiAuth