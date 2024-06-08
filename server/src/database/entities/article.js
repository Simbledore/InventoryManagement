const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Article",
  tableName: "articles",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true
    },
    name: {
      type: "varchar",
      length: "255"
    },
    amount: {
        type: 'int',
    },
    delete_date: {
        type: 'datetime',
        nullable: true
    }
  },
  relations: {
    bookins: {
      target: "Booking",
      type: "one-to-many",
      inverseSide: "article",
      cascade: true
    }
  }
});