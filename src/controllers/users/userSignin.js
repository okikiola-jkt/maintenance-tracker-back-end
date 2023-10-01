const db = require("../../database/db");
const { password } = require("pg/lib/defaults");
const bcrypt = require('bcrypt');


const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM user WHERE email = $1';
    const response = await db.query(query, [email]);

    return response.rows[0];
};

const loginUser = async (email, password) => {
    try{
        const user = await getUserByEmail(email);
        
        if (!user){
            throw new Error("User does not exist");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid){
            throw new Error("Incorrect Password for email")
        }
     console.log('Login Successful');
    }

    catch (error) {
        console.log('Login Error:', error.message)
    }

};

const userCredentials = {
    email: 'okiki@gmail.com',
    password: bcrypt.hashSync('password', 10),
};

loginUser(userCredentials.email, userCredentials.password);


