const db = require("../database/db");


const query = `
  CREATE TABLE IF NOT EXISTS admin (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

db.query(query, (err, result) => {
    if (err){
        console.error("Error creating 'admin' table:", err)
    } else {
        console.log("Admin table created succesfully");
    }
});