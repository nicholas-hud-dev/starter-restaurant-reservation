exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary().notNullable();
    table.varchar("first_name").notNullable();
    table.varchar("last_name").notNullable();
    table.varchar("mobile_number").notNullable();
    table.varchar("reservation_date").notNullable();
    table.varchar("reservation_time").notNullable();
    table.varchar("people").notNullable();
    table.varchar("status").notNullable().defaultTo("booked");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
