const express = require('express');
const pool = require('../database');
const router = express.Router();

router.post('/create', async function (req, res) {
    try {
        const { id, amount } = req.body;
        const query = 'INSERT INTO booking(amount, book_in, article_id) VALUES (?, true, ?)';
        const articleQuery = 'UPDATE article SET amount = amount + ? WHERE id = ?;';
        await pool.query(query, [amount, id]);
        await pool.query(articleQuery, [amount, id]);
    } catch (error) {
        res.status(500).json({error: error});
    }
});


module.exports = router;