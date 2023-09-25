const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "maintenance_tracker",
    password: "password",
    port: 5432,
});

module.exports = pool;