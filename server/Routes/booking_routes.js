const express = require("express");
const datasource = require("../src/database/db_connection");
const booking = require("../src/database/entities/booking");
const bookingRepo = datasource.getRepository(booking);
const article = require("../src/database/entities/article");
const articleRepo = datasource.getRepository(article);
const router = express.Router();

router.post("/bookin/create", async function (req, res) {
  try {
    const { id, amount, charge } = req.body;

    if (!id || !amount || !charge) {
      return res.status(400).json("Bitte alle Felder ausfüllen");
    }

    const bookin_count = await bookingRepo.count({
      where: {
        book_in: true,
      },
    });

    await datasource
      .createQueryBuilder()
      .insert()
      .into(booking)
      .values({
        amount: amount,
        book_in: true,
        booking_date: new Date(),
        charge: charge,
        booking_number: bookin_count + 1,
        article: { id: id },
      })
      .execute();

    await datasource
      .createQueryBuilder()
      .update(article)
      .set({ amount: () => `amount + ${amount}` })
      .where({ id: id })
      .execute();

    res.status(204).json();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(
        "Beim Anlegen der Buchung ist ein Fehler aufgetreten, bitte kontaktieren Sie einen Administrator"
      );
  }
});

router.post("/bookout/create", async function (req, res, end) {
  try {
    const { id, amount } = req.body;
    const existing_article = await articleRepo.findOneBy({ id: id });

    if (!id || !amount) {
      return res.status(400).json("Bitte alle Felder ausfüllen");
    }

    if (existing_article.amount - amount < 0) {
      return res.status(400).json("Die angegebende Menge ist zu hoch!");
    }

    const booking_number = await bookingRepo.count({
      where: {
        book_in: false,
      },
    });

    await datasource
      .createQueryBuilder()
      .insert()
      .into(booking)
      .values({
        amount: amount,
        book_in: false,
        booking_date: new Date(),
        booking_number: booking_number + 1,
        article: { id: id },
      })
      .execute();

    await datasource
      .createQueryBuilder()
      .update(article)
      .set({ amount: () => `amount - ${amount}` })
      .where({ id: id })
      .execute();
    res.status(204).json();
  } catch (error) {
    res
      .status(500)
      .json(
        "Beim anlegen der Buchung ist ein Fehler aufgetreten, bitte kontaktieren Sie einen Administrator"
      );
  }
});

router.get("/overview", async function (req, res) {
  try {
    const { bookin, page } = req.query;
    const pageInt = parseInt(page);
    const bookings = await bookingRepo.find({
      where: {
        book_in: bookin === "true" ? true : false,
      },
      relations: {
        article: true,
      },
      order: {
        booking_date: "DESC",
      },
    });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json();
  }
});

router.get("/article/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const { page } = req.query;
    const pageInt = parseInt(page);

    const [bookings, maxCount] = await bookingRepo.findAndCount({
      where: {
        article: { id: id },
      },
      order: {
        booking_date: "DESC",
      },
      take: 7,
      skip: (pageInt - 1) * 7,
    });
    console.log(maxCount);
    const next = Math.ceil(maxCount / 7) > pageInt;

    res.status(200).json({ data: bookings, next_page: next });
  } catch (error) {
    res.status(500).json();
  }
});

router.post("/edit/:id/:article_id", async function (req, res) {
  try {
    const { id, article_id } = req.params;
    const { amount, charge, book_in } = req.body;

    const wrong_booking = await bookingRepo.findOne({
      where: {
        id: id,
      },
      select: {
        amount: true,
      },
    });

    if (!book_in) {
      const article = await articleRepo.findOneBy({ id: article_id });
      if (article.amount - (amount - wrong_booking.amount) < 0) {
        return res.status(400).json("Die angegebende Menge ist zu hoch!");
      }
    }

    await datasource
      .createQueryBuilder()
      .update(booking)
      .set({
        amount: amount,
        booking_date: new Date(),
        charge: charge,
      })
      .where({ id: id })
      .execute();

    await datasource
      .createQueryBuilder()
      .update(article)
      .set({
        amount: () =>
          `amount ${book_in ? "+" : "-"} ${amount - wrong_booking.amount}`,
      })
      .where({ id: article_id })
      .execute();

    await datasource.createQueryBuilder();

    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
});

router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;

    const booking = await bookingRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        article: true,
      },
    });

    res.status(200).json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
});

router.post("/delete/:id/:article_id", async function (req, res) {
  try {
    const { id, article_id } = req.params;
    const { amount, book_in } = req.body;

    console.log(id, "  ", amount, "  ", book_in, "  ", article_id);

    const articleEntry = await articleRepo.findOneBy({
      id: article_id,
    });

    if (book_in) {
      if (articleEntry.amount - amount < 0) {
        return res
          .status(400)
          .json(
            "Die Ausbuchung kann nicht mehr gelöscht werden, bitte Kontaktiere einen Administartor"
          );
      }
    }

    await datasource
      .createQueryBuilder()
      .update(article)
      .set({
        amount: () => `amount ${book_in ? "-" : "+"} ${amount}`,
      })
      .where({ id: article_id })
      .execute();

    await bookingRepo.delete(id);

    res.status(200).json();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(
        "Beim Löschen der Ausbuchung ist ein Fehler aufgetreten, bitte kontaktiere einen Administrator"
      );
  }
});
module.exports = router;
