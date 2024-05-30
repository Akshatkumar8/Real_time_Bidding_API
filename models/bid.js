const pool = require('../config/db');

class Bid {
    static async create(item_id, user_id, bid_amount) {
        const [result] = await pool.query(
            'INSERT INTO bids (item_id, user_id, bid_amount) VALUES (?, ?, ?)',
            [item_id, user_id, bid_amount]
        );
        return result.insertId;
    }

    static async findByItemId(item_id) {
        const [rows] = await pool.query('SELECT * FROM bids WHERE item_id = ?', [item_id]);
        return rows;
    }
}

module.exports = Bid;
