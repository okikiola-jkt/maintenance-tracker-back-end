const db = require('../../database/db');
require('dotenv').config();

const getSingleRequest = async (request, response) => {
    try {

        const {id} = request.params;
        const getQuery = 'SELECT * FROM requests WHERE id = $1';
        const getRequest = await db.query(getQuery, [id]);

        if (getRequest.rows.length === 0) {
            return response.status(404).json({
                status: 'error',
                message: 'Request not found'
            })
        }

        return response.status(200).json({
            status: 'success',
            data: getRequest.rows,
            message: 'successfully retrieved request'
        })

    } catch (error) {
        return response.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = getSingleRequest;