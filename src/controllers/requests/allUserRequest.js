const db = require('../../database/db');
require('dotenv').config();


const getAllRequestByUser = async (request, response) => {
    try{

        const getQuery = 'SELECT * FROM requests WHERE userid = $1';
        const userRequests = await db.query(getQuery, [request.user.id]);

       

        return response.status(200).json({
            status: "success",
            data: userRequests.rows,
            message: "Succesfully retrieved requests for this user"
        })

    } catch (error) {
        return response.status(500).json({
            status: "error",
            message: error.message
        });
    }

}

module.exports = getAllRequestByUser;