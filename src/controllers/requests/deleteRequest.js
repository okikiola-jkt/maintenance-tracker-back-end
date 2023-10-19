const db = require('../../database/db');

const deleteUserRequest = async (request, response) => {
    try {
        const { id } = request.params;
        const deleteQuery = 'DELETE FROM requests WHERE id = $1 AND userid = $2';
        const deleteRequest = await db.query(deleteQuery, [id, request.user.id]);

        if (deleteRequest.rowCount === 0) {
            return response.status(404).json({
                status: "error",
                message: "Request not found"
            });
        }

        return response.status(200).json({
            status: "success",
            message: "Successfully deleted request"
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

module.exports = deleteUserRequest;
