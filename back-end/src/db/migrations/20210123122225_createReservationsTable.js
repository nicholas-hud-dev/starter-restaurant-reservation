exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary().notNullable();
    table.varchar("first_name").notNullable();
    table.varchar("last_name").notNullable();
    table.varchar("mobile-number").notNullable();
    table.varchar("reservation-date").notNullable();
    table.varchar("reservation-time").notNullable();
    table.varchar("people").notNullable();
    table.varchar("status").notNullable().defaultTo("booked");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
