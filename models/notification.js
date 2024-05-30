const pool = require('../config/db');

class Notification {
    static async create(user_id, message) {
        const [result] = await pool.query(
            'INSERT INTO notifications (user_id, message) VALUES (?, ?)',
            [user_id, message]
        );
        return result.insertId;
    }

    static async findByUserId(user_id) {
        const [rows] = await pool.query('SELECT * FROM notifications WHERE user_id = ?', [user_id]);
        return rows;
    }

    static async markAsRead(id) {
        await pool.query('UPDATE notifications SET is_read = true WHERE id = ?', [id]);
    }
}

module.exports = Notification;
