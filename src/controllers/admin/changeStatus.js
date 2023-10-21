const db = require('../../database/db');

const getRequestsById = async (id, userid) => {
    const query = 'SELECT * FROM requests WHERE id = $1';
    const response = await db.query(query, [id]);
    return response.rows[0];
};


const changeStatus = async (request, response) => {
    try{
    const {status} = request.body;
    const {id} = request.params;
    const existingRequest = await getRequestsById(id);
    if (!existingRequest) {
        return response.status(404).json({
            status: 'error',
            message: 'Request not found'
        });
    }

  
        const query = 'UPDATE requests SET status = $1 WHERE id =$2';
        await db.query(query, [status, id]);
        

        return response.status(200).json({
            status: 'success',
            message: 'Succesfully updates status'
        });
    } catch (error) {
        return response.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

module.exports = changeStatus;