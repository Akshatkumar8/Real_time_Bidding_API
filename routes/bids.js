const express = require('express');
const router = express.Router();
const Bid = require('../models/bid');
const { authenticateToken } = require('../middleware/auth');

router.get('/:itemId', authenticateToken, async (req, res) => {
    const itemId = req.params.itemId;
    try {
        const bids = await Bid.findByItemId(itemId);
        res.status(200).json(bids);
    } catch (error) {
        console.error('Error fetching bids:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/:itemId', authenticateToken, async (req, res) => {
    const { bid_amount } = req.body;
    const itemId = req.params.itemId;
    try {
        // Place bid logic
        res.status(200).json({ message: 'Bid placed successfully' });
    } catch (error) {
        console.error('Error placing bid:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
