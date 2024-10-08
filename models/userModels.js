const connection = require('../configs/connection');

const getAllUsers = async () => {
    const query = `SELECT 
    user.id AS user_id, 
    user.email, 
    user.password, 
    role.id AS role_id, 
    role.role AS role_name
    FROM user 
    JOIN role ON role.id = user.role_id`;
    
    const [rows] = await connection.execute(query)

    return formattedResult(rows);
}

const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM user JOIN role ON role.id = user.role_id WHERE email = ? LIMIT 1';

    const [rows] = await connection.execute(query, [email]);

    const user = rows[0];
    const formattedResult = {
        id: user.id,
        email: user.email,
        password: user.password,
        role: {
            role: user.role,
        }
    };

    return formattedResult
}

const getUserById = async (id) => {
    const query = 'SELECT * FROM user WHERE id = ? LIMIT 1';

    const [rows] = await connection.execute(query, [id]);

    return rows[0];
}

const createUser = async (data) => {
    const query = 'INSERT INTO user (email, password, role_id) VALUES (?, ?, ?)';

    const [rows] = await connection.execute(query, [data.email, data.password, 2]);

    return rows;
}

const updateUser = async (id, data) => {
    user = await getUserById(id);

    if (!user) {
        throw new Error('User not found');
    }

    const fields = [];
    const values = [];
    
    if (data.email) {
        fields.push('email = ?');
        values.push(data.email);
    }

    if (data.password) {
        fields.push('password = ?');
        values.push(data.password);
    }

    if (fields.length === 0) {
        return { message: 'No data to update' };
    }
    
    const query = `UPDATE user SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id)

    try {
        const [rows] = await connection.execute(query, values);
        return rows;
    } catch (error) {
        console.error('Error updating user:', error.message);
        throw error;
    }
}

const deleteUser = async (id) => {
    const query = 'DELETE FROM user WHERE id = ?';

    const [rows] = await connection.execute(query, [id]);

    return rows;
}

formattedResult = (user) => {
    return user.map(userData => ({
        user_id: userData.user_id,
        email: userData.email,
        role: {
            role_id: userData.role_id,
            role_name: userData.role_name
        }
      }));
}

module.exports = {
    getAllUsers,
    getUserByEmail,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}