const { PORT = 10000 } = process.env;
const express = require("express")
const app = require("./app")
const knex = require("./db/connection");
const history = require("connect-history-api-fallback");

app.use(history())

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch((error) => {
    console.error(error);
    knex.destroy();
  });

function listener() {
  console.log(`Listening on Port ${PORT}!`);
} 

