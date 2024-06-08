const express = require('express');
const pool = require('../database');
const datasource = require('../src/database/dbconnection');
const article = require('../src/database/entities/article');
const articleRepo = datasource.getRepository(article);
const router = express.Router();

router.get('/overview', async function (req, res) {
    try {
        const articles = await articleRepo.find({
            select: {
                id: true,
                amount: true,
                name: true,
            },
            where: {
                delete_date: null,
            }  
        })
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.post('/create', async function (req, res) {
    try {
        const {name} = req.body;
        await datasource.createQueryBuilder()
            .insert()
            .into('Article')
            .values({
                name: name,
                amount: 0,
            })
            .execute();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.get('/byId/:id', async function (req, res) {
    try {
        const {id} = req.params;
        const article = await articleRepo.findOneBy({id: id});
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({error: error});
    }
})

router.post('/edit/:id', async function (req, res) {
    try {
        const {id} = req.params;
        const name = req.body.name;

        await datasource.createQueryBuilder()
            .update(article)
            .set({name: name})
            .where({ id: id })
            .execute();

        res.status(204).json();
    } catch (error) {
        res.status(500).json({error: error});
    }
})

module.exports = router;