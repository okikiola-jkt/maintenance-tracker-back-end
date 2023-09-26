const db = require("../database/db");


const adminTableQuery = `
  CREATE TABLE IF NOT EXISTS admin (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

db.query(adminTableQuery, (err, result) => {
    if (err){
        console.error("Error creating 'admin' table:", err)
    } else {
        console.log("Admin table created succesfully");
    }
});

const userTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
  )
`;

db.query(userTableQuery, (err, result) => {
    if (err){
        console.error("Error creating 'users' table:", err)
    } else {
        console.log("User table created succesfully");
    }
});

const userRequestQuery = `
  CREATE TABLE IF NOT EXISTS requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    details VARCHAR(255),
    status status_enum DEFAULT 'pending',
    userId VARCHAR(255)
  )
`;

db.query(userRequestQuery, (err, result) => {
    if (err){
        console.error("Error creating 'requests' table:", err)
    } else {
        console.log("Request table created succesfully");
    }
});