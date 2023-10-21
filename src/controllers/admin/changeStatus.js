const db = require('../../database/db');

const changeStatus = async (request, response) => {

    const {status} = request.body;
    const {id} = request.params;

    try{
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