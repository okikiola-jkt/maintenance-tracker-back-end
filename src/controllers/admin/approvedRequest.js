const db = require('../../database/db');
require('dotenv').config();

const getApprovedRequestByUser = async (request, response) => {
   try{ 
    
    const getQuery = "SELECT * FROM requests WHERE status = 'completed'";
    const approvedRequests = await db.query(getQuery)

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