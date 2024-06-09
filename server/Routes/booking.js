const express = require('express');
const pool = require('../database');
const datasource = require('../src/database/dbconnection');
const booking = require('../src/database/entities/booking');
const bookingRepo = datasource.getRepository(booking);
const article = require('../src/database/entities/article');
const articleRepo = datasource.getRepository(article);
const router = express.Router();

router.post('/bookin/create', async function (req, res) {
    try {
        const { id, amount } = req.body;
        await datasource.createQueryBuilder()
            .insert()
            .into(booking)
            .values({ 
                amount: amount,
                book_in: true,
                booking_date: new Date(),
                article: {id: id}
            })
            .execute();

        await datasource.createQueryBuilder()
            .update(article)
            .set({ amount: () => `amount + ${amount}` })
            .where({ id: id})
            .execute();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.post('/bookout/create', async function (req, res, end) {
    try {
        const { id, amount } = req.body;
        const existing_article = await articleRepo.findOneBy({ id: id});

        if (existing_article.amount - amount < 0) {
            console.log('to much')
            return res.status(400).json();
        }

        await datasource.createQueryBuilder()
            .insert()
            .into(booking)
            .values({ 
                amount: amount,
                book_in: false,
                booking_date: new Date(),
                article: {id: id}
            })
            .execute();

            await datasource.createQueryBuilder()
            .update(article)
            .set({ amount: () => `amount - ${amount}` })
            .where({ id: id})
            .execute();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.get('/overview', async function (req, res) {
    try {
        const { bookin, page } = req.query;
        const pageInt = parseInt(page);

        console.log(bookin);
        const [bookings, maxCount] = await bookingRepo.findAndCount({
            where : {
                book_in: bookin === 'true' ? true : false
            },
            relations: {
                article: true
            },
            order: {
                booking_date: 'DESC',
            },
            take : 7,
            skip : (pageInt - 1) * 7 
        });
        
        const next = (Math.ceil(maxCount / 7) > pageInt);

        res.status(200).json({data: bookings, next_page: next});
    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.get('/article/:id', async function (req, res) {
    try {
        const {id} = req.params;
        const {page} = req.query;
        const pageInt = parseInt(page);

        const [bookings, maxCount] = await bookingRepo.findAndCount({
            where : {
                article: {id: id}
            },
            order: {
                booking_date: 'DESC'
            },
            take: 7,
            skip : (pageInt - 1) * 7
        });
        console.log(maxCount);
        const next = (Math.ceil(maxCount / 7) > pageInt);

        res.status(200).json({data: bookings, next_page: next});
    } catch (error) {
        res.status(500).json({error: error});
    }
});

module.exports = router;