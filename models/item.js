const pool = require('../config/db');

class Item {
    static async create(name, description, starting_price, image_url, end_time) {
        const [result] = await pool.query(
            'INSERT INTO items (name, description, starting_price, image_url, end_time) VALUES (?, ?, ?, ?, ?)',
            [name, description, starting_price, image_url, end_time]
        );
        return result.insertId;
    }

    static async findAll(limit, offset) {
        const [rows] = await pool.query('SELECT * FROM items LIMIT ? OFFSET ?', [limit, offset]);
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, updates) {
        const { name, description, starting_price, current_price, image_url, end_time } = updates;
        const [result] = await pool.query(
            'UPDATE items SET name = ?, description = ?, starting_price = ?, current_price = ?, image_url = ?, end_time = ? WHERE id = ?',
            [name, description, starting_price, current_price, image_url, end_time, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        await pool.query('DELETE FROM items WHERE id = ?', [id]);
    }
}

module.exports = Item;
