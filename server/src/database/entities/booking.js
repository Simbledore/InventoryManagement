const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Booking",
  tableName: "bookings",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true
    },
    amount: {
        type: 'int',
    },
    book_in: {
        type: 'boolean',
    },
    booking_date: {
        type: 'datetime',
    },
    charge: {
      type: 'varchar',
      nullable: true,
    },
    booking_number: {
        type: 'int',
    }
  },
  relations: {
    article: {
      target: "Article",
      type: "many-to-one",
      joinColumn: true,
      onDelete: "CASCADE"
    }
  }
});