const db = require("../../database/db");
const { password } = require("pg/lib/defaults");
const bcrypt = require('bcrypt');


const getAdminByEmail = async (email) => {
    const query = 'SELECT * FROM admin WHERE email = $1';
    const response = await db.query(query, [email]);

    return response.rows[0];
};

const loginAdmin = async (email, password) => {
    try{
        const admin = await getAdminByEmail(email);
        
        if (!admin){
            throw new Error("Admin does not exist");
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid){
            throw new Error("Incorrect Password for email")
        }
     console.log('Login Successful');
    }

    catch (error) {
        console.log('Login Error:', error.message)
    }

};

const adminCredentials = {
    email: 'okiki@gmail.com',
    password: 'okiki',
};

loginAdmin(adminCredentials.email, adminCredentials.password);


