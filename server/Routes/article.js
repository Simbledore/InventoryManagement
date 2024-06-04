const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/overview', async function (req, res) {
    try {
        const query = 'SELECT id, amount, name FROM article;';
        const rows = await pool.query(query);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.post('/create', async function (req, res) {
    try {
        const {name} = req.body;
        const query = 'INSERT INTO article (name, amount) VALUES (?, 0);';
        await pool.query(query, name);
        res.status(204);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

module.exports = router;