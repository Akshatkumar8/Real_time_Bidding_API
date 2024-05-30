const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const notifications = await Notification.findByUserId(req.user.id);
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/mark-read', authenticateToken, async (req, res) => {
    const { id } = req.body;
    try {
        await Notification.markAsRead(id);
        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
