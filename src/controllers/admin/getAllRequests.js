const db = require('../../database/db');
require('dotenv').config();

const getAllRequests = async (request, response) => {
    try {
        const { status } = request.params;
        let getQuery;

        if (status) {
            getQuery = 'SELECT * FROM requests WHERE status = $1';
        } else {
            getQuery = 'SELECT * FROM requests';
        }

       
        const allRequests = await db.query(getQuery, status ? [status] : []);

        return response.status(200).json({
            status: 'success',
            data: allRequests.rows,
            message: 'Successfully retrieved all requests'
        });
    } catch (error) {
        return response.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = getAllRequests;
