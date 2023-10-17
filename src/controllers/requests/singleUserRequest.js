const db = require('../../database/db');
require('dotenv').config();

const getSingleRequestByUser = async (request, response) => {
    try{
        const {id} = request.params;
        const getQuery = 'SELECT * FROM requests WHERE id = $1 AND userid = $2';
        const userRequest = await db.query(getQuery, [id, request.user.id]);

        if (userRequest.rows.length === 0) {
            return response.status(404).json({
                status: "error",
                message: "Request not found"
            });
        }
       
        return response.status(200).json({
            status: "success",
            data: userRequest.rows,
            message: "Succesfully retrieved requests for this user"
        })

      

    } catch (error) {
        return response.status(500).json({
            status: "error",
            message: error.message
        });
    }

}

module.exports = getSingleRequestByUser;