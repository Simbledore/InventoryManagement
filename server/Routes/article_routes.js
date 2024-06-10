const express = require("express");
const datasource = require("../src/database/db_connection");
const article = require("../src/database/entities/article");
const { Not, Like } = require("typeorm");
const articleRepo = datasource.getRepository(article);
const router = express.Router();

router.get("/overview", async function (req, res) {
  try {
    const { page, q } = req.query;
    const pageInt = parseInt(page);

    const [articles, maxCount] = await articleRepo.findAndCount({
      select: {
        id: true,
        amount: true,
        name: true,
      },
      where: {
        delete_date: null,
        ...(q && { name: Like(`%${q}%`) }),
      },
      order: {
        name: "ASC",
      },
      take: 7,
      skip: (pageInt - 1) * 7,
    });

    const next = Math.ceil(maxCount / 7) > pageInt;

    res.status(200).json({ data: articles, next_page: next });
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
});

router.get("/all", async function (req, res) {
  try {
    const articles = await articleRepo.find({
      select: {
        id: true,
        amount: true,
        name: true,
      },
      where: {
        delete_date: null,
      },
      order: {
        name: "ASC",
      },
    });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json();
  }
});

router.post("/create", async function (req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json("Bitte geben Sie einen Namen ein");
    }

    const exists = await articleRepo.existsBy({ name: name });

    if (exists) {
      return res.status(400).json("Diesen Artikel gibt es bereits");
    }

    await datasource
      .createQueryBuilder()
      .insert()
      .into("Article")
      .values({
        name: name,
        amount: 0,
      })
      .execute();
    res.status(204).json();
  } catch (error) {
    res
      .status(500)
      .json(
        "Beim Anlegen des Artikels ist ein Fehler aufgetreten, bitte kontaktieren Sie einen Administrator"
      );
  }
});

router.get("/byId/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const article = await articleRepo.findOneBy({ id: id });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json();
  }
});

router.post("/edit/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const name = req.body.name;

    const exists = await articleRepo.exists({
      where: {
        name: name,
        id: Not(id),
      },
    });

    if (exists) {
      return res.status(400).json("Diesen Artikel gibt es bereits");
    }

    await datasource
      .createQueryBuilder()
      .update(article)
      .set({ name: name })
      .where({ id: id })
      .execute();

    res.status(204).json();
  } catch (error) {
    res
      .status(500)
      .json(
        "Beim editieren des Artikels ist ein Fehler aufgetreten, bitte kontaktieren Sie einen Administrator"
      );
  }
});

module.exports = router;
