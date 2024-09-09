require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

try {
    const conn = connection.promise().getConnection();
    console.log('Database connected successfully');
} catch (err) {
    console.error('Database connection failed:', err.message);
}

module.exports = connection.promise();