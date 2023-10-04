const db = require("../../database/db");
const jwt= require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config();


const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const response = await db.query(query, [email]);
    return response.rows[0];
};

const loginUser = async (request, response) => {
    try {
        const {email, password} = request.body;

        const user = await getUserByEmail(email);
        if (!user) {
            return response.status(401).json({
                status: "error",
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid){
            const token = jwt.sign({ 
                id: user.id,
                exp: Math.floor(Date.now() / 1000) + (60 * 60)
            }, process.env.SECRETKEY);

            return response.status(200).json({
                status: "success",
                message: "Login successful",
                token: token
            });
        } else {
            return response.status(401).json({
                status: "error",
                message: "Invalid email or password"
            })
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            status: "error",
            message: "An error occured while processing your request"
        });
    }
};


module.exports = loginUser;


