const db = require("../../database/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


const getAdminByEmail = async (email) => {
    const query = 'SELECT * FROM admin WHERE email = $1';
    const response = await db.query(query, [email]);
    return response.rows[0];
};

const loginAdmin = async (request, response) => {
    try{
        const {email, password} = request.body;
        const admin = await getAdminByEmail(email);
        if(!admin) {
            return response.status(401).json({
                status: "error",
                message: "Invalid email or password"
            })
        }
        
        const isPasswordValid = await bcrypt.compare (password, admin.password)
        if (isPasswordValid) {
            const token = jwt.sign({
                id: admin.id,
                exp: Math.floor(Date.now() / 1000) + (60 * 60)
            },process.env.SECRETKEY);
            return response.status(200).json({
                status: "success",
                message: "Login successful",
                token: token
            });

        }else {
            return response.status(401).json({
                status: "error",
                message: "Invalid email or password"
            })
        }

    } catch (error) {
        console.error(error)
        return response.status(500).json({
            status: "error",
            message: "An error occured while processing your result"
        });
    }

};

module.exports = loginAdmin;




