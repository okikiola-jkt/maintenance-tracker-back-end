const db = require('../../database/db');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();



const getRequestById = async (id) => {
    const query = 'SELECT * FROM requests WHERE id = $1';
    const response = await db.query(query, [id]);
    return response.rows[0];
};

const addNewRequest = async (request, response) => {
    try{
        const {details} = request.body;
        const insertQuery = 'INSERT INTO requests (details, userid) VALUES ($1, $2)';
        await db.query(insertQuery, [details, request.user.id]);

       
        return response.status(201).json({
            status: "success",
            message: "Successfully created new request"
       
        })


    } catch (error) {
        return response.status(500).json({
            status: "Failed",
            message: "Internal Server Error",
            error: error.message
        });
}

};

module.exports = addNewRequest;