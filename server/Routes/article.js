const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/:id', async function (req, res) {
    try {
        const query = 'SELECT id, amount, name FROM article WHERE id = ?';
        const rows = await pool.query(query, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

module.exports = router;