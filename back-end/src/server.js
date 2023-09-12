const { PORT = 10000 } = process.env;
const express = require("express");
const app = express();
const knex = require("./db/connection");
const path = require("path"); // Import the path module

// Define your database migration and server startup logic
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

// Catch-all route to serve your main HTML file for all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Configure static asset serving for your frontend assets (CSS, JavaScript, etc.)
app.use(express.static(path.join(__dirname, "public")));

function listener() {
  console.log(`Listening on Port ${PORT}!`);
}

