const db = require('../../database/db');
require('dotenv').config();

const getApprovedRequestByUser = async (request, response) => {
   try{ 
    
    const {status} = request.params;
    const getQuery = "SELECT * FROM requests WHERE status = $1";
    const approvedRequests = await db.query(getQuery, [status])

    return response.status(200).json({
        status: 'success',
        data: approvedRequests.rows,
        message: 'Succesfully retrieved all requests'
    });
} catch (error) {
    return response.status(500).json({
        status: 'error',
        message: error.message
    });
}
}

module.exports = getApprovedRequestByUser;