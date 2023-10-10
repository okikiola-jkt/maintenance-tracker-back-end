const jwt = require('jsonwebtoken');
const db = require('../../database/db');


const getUserById = async (id) => {
    const query = 'SELECT * FROM requests WHERE id = $1'
    const response = await db.query(query, [id]);
    return response.rows[0];
}

const apiAuth = async (request, response, next) => {
    try{
        const token = request.headers.authorization.split('')[1];
        const decodedToken = jwt.verify(token, 'SECRETKEY');
        const id = decodedToken.Id;
        
        const user = await getUserById(id);
        if (!user) {
            return response.status(401).json({
                status: "error",
                message: "User does not exist"
            })
        }
        else{
            next()
        }

    } catch {
        return response.status(401).json({
            error: new Error('Invalid request')
        });
    }
}

module.exports = apiAuth

