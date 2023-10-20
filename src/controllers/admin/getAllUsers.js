const db = require('../../database/db');

const getAllUsers = async (request, response) => {
    try{

      

        const getQuery = 'SELECT email, id, name FROM users';
        const allUsers = await db.query(getQuery);

        return response.status(200).json({
            status: 'success',
            data: allUsers.rows,
            message: 'Successfully retrieved all users'
        });
    } catch (error) {
        return response.status(500).json({
            status: 'error',
            message: error.message
        })
    }

}

module.exports = getAllUsers;