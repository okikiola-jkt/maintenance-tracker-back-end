
const db = require('../../database/db');
require('dotenv').config();


const getAllRequestByUser = async (request, response) => {
    try{

        const getQuery = 'SELECT * FROM requests WHERE userid = $1';
        const userRequests = await db.query(getQuery, [request.user.id]);

        if (userRequests.rows.length === 0){
            return response.status(404).json({
                status: "error",
                message: "No requests found for this user"
            });
        }

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