const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('../../database/db')
const secretKey = process.env.SECRETKEY;


const emailExists = async (email) => {
    const query = 'SELECT email FROM users WHERE email = $1';
    const response = await db.query(query, [email]);

    return response.rows.length > 0;
}

const registerUser = async (request, response) => {
    try {
        const { email, name, password } = request.body;

        if (await emailExists(email.trim())) {
            return response.status(409).json(
                {
                    "status": "error",
                    "message": "This email already exists."
                }
            );
        }

        const hashedPassword = bcrypt.hashSync(password.trim(), 10);
        const query = 'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id';

        const newUser = await db.query(query, [email.trim(), hashedPassword, name.trim()]);

        const token = jwt.sign(
                {
                    id: newUser.rows[0].id,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60)
                },
                secretKey
            );

        return response.status(201).json(
            {
                "status": "success",
                "message": "User registered successfully.",
                "token": token
            }
        )
    } catch (error) {
        console.error('User registration error:', error.message);
        return response.status(500).json(
            {
                "status": "error",
                "message": "An internal server error happened. Please contact Admin."
            }
        );
    }
}

module.exports = registerUser;
