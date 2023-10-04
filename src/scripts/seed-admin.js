const bcrypt = require('bcrypt');
const db = require('../database/db');


const emailExists = async (email) => {
    const query = 'SELECT email FROM admin WHERE email = $1';
    const response = await db.query(query, [email]);

    if (response.rows.length > 0) return true;
    else return false;
}


const seedAdmin = async () => {
    const newAdmin = {
        email: 'firefire@gmail.com',
        password: bcrypt.hashSync('password21', 10)
    }

    if (await emailExists(newAdmin.email)) {
        console.log('Admin with the same email exists in the database');
    } else {
        const query  = 'INSERT INTO admin (email, password) VALUES ($1, $2)';
        await db.query(query, [newAdmin.email, newAdmin.password])

        console.log('Successfully seeded new admin to the database! \\(^0^)/');
    }
}

seedAdmin();
