const knex = require("../db/connection")

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((result) => result[0])
}

module.exports = {
    create,
}