const knex = require("../db/connection")

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((result) => result[0])
}

function listByDate(date) {
    return knex("reservations")
      .select("*")
      .where("reservation_date", date)
      .orderBy("reservation_time");
  }

module.exports = {
    create,
    listByDate,
}