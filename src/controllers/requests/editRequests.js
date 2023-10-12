const db = require('../../database/db');
require('dotenv').config();

const getRequestsById = async (id) => {
    const query = 'SELECT * from requests WHERE id = $1';
    const response = await db.query(query, [id]);
    return response.rows[0];
};

const editRequest = async (request, response) => {
    try{
        const {details, id} = request.body;
        const existingRequest = await getRequestsById(id);
        if (!existingRequest){
            return response.status(401).json({
                status: "error",
                message: "Request does not exist"
            })
        }

        if (existingRequest.userid !== request.user.id) {
            return response.status(403).json({
                status: "error",
                message: "Permission denied: You can only edit your own requests"
            });
        }

        const updateQuery = 'UPDATE requests SET details = $1 WHERE id = $2';
        await db.query(updateQuery, [details, id]);


        return response .status(201).json({
            status: "Success",
            message: "Succesfully edited request"
        })
    } catch (error) {
        return response.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

module.exports = editRequest;
