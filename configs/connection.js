require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Function to check if the connection is established
async function checkConnection() {
    try {
        const connection = await pool.promise().getConnection();
        console.log('Database connected successfully');
        connection.release();
    } catch (err) {
        console.error('Database connection failed:', err.message);
    }
}

checkConnection();

module.exports = pool.promise();