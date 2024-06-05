const express = require('express');
const pool = require('../database');
const router = express.Router();

router.post('/create', async function (req, res) {
    try {
        const { id, amount } = req.body;
        const query = 'INSERT INTO booking(amount, book_in, booking_date, article_id) VALUES (?, true, NOW(), ?)';
        const articleQuery = 'UPDATE article SET amount = amount + ? WHERE id = ?;';
        await pool.query(query, [amount, id]);
        await pool.query(articleQuery, [amount, id]);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.get('/bookin/overview', async function (req, res) {
    try {
        const query = 'SELECT a.name as article_name, b.amount, b.booking_date FROM booking b JOIN article a ON b.article_id = a.id WHERE book_in IS true ORDER BY b.booking_date'
        const rows = await pool.query(query);
        res.status(200).json(rows);
    } catch (error) {
        
    }
});

module.exports = router;