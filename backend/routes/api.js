// backend/routes/api.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Test route
router.get('/hello', (req, res) => {
  res.json({ message: 'Backend OK' });
});

// Create message (contact form)
router.post('/message', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const msg = await Message.create({ name, email, subject, message });
    res.status(201).json(msg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all messages (admin use)
router.get('/messages', async (req, res) => {
  try {
    const msgs = await Message.find().sort({ createdAt: -1 });
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
