const db = require('../../database/db');
require('dotenv').config();

const getRequestsById = async (id, userid) => {
    const query = 'SELECT * FROM requests WHERE id = $1 AND userid = $2';
    const response = await db.query(query, [id, userid]);
    return response.rows[0];
};

const editRequest = async (request, response) => {
    try{

        const {id} = request.params;
        const {details} = request.body;
        const existingRequest = await getRequestsById(id, request.user.id);
        if (!existingRequest){
            return response.status(401).json({
                status: "error",
                message: "Request does not exist"
            })
        }

        const updateQuery = 'UPDATE requests SET details = $1 WHERE id = $2';
        await db.query(updateQuery, [details, id]);


        return response .status(200).json({
            status: "Success",
            message: "Succesfully edited request"
        })
    } catch (error) {
        return response.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

module.exports = editRequest;
