const bcrypt = require('bcrypt');
const db = require('../../database/db')

const emailExists = async (email) => {
    const query = 'SELECT email FROM users WHERE email = $1';
    const response = await db.query(query, [email]);

    return response.rows.length > 0;
}

const registerUser = async (email, password, name) => {
    try {
        if (await emailExists(email)) {
       
            throw new Error('Email exist');
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const query = 'INSERT INTO users (email, password, name) VALUES ($1, $2, $3)';

            await db.query(query, [email, hashedPassword, name]);
        }

        console.log('User registration successful');
    } catch (error) {
        console.error('User registration error:', error.message);
    }
}


const newUser = {
    email: 'okiki@gmail.com',
    password: 'okiki',
    name: 'new user',
};

registerUser(newUser.email, newUser.password, newUser.name);
