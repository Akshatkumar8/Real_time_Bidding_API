const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const upload = require('../middleware/upload');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

router.get('/', async (req, res) => {
    const { page, limit } = req.query;
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * limitNumber;
    try {
        const items = await Item.findAll(limitNumber, offset);
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    const itemId = req.params.id;
    try {
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', authenticateToken, authorizeRole('admin'), upload.single('image'), async (req, res) => {
    const { name, description, starting_price, end_time } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    try {
        const itemId = await Item.create(name, description, starting_price, imageUrl, end_time);
        res.status(201).json({ id: itemId, message: 'Item created successfully' });
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        // Update item logic
        res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    const itemId = req.params.id;
    try {
        // Delete item logic
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
