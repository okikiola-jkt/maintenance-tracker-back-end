const db = require('../../database/db');
require('dotenv').config();

const getAllRequests = async (request, response) => {
   try{ 
    
    const getQuery = 'SELECT * FROM requests';
    const allRequests = await db.query(getQuery)

    return response.status(200).json({
        status: 'success',
        data: allRequests.rows,
        message: 'Succesfully retrieved all requests'
    });
} catch (error) {
    return response.status(500).json({
        status: 'error',
        message: error.message
    });
}
}

module.exports = getAllRequests;