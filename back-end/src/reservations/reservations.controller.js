/**
 * List handler for reservation resources
 */
const reservationsService = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


async function list(req, res) {
  const { date } = req.query;

  if (date) {
    const data = await reservationsService.listByDate(date);
    res.json({ data });
  } else {
    const data = await reservationsService.list();
    res.json({ data });
  }
}

async function create(req, res) {
  //console.log("CREATE RUNS", req.body.data)
  const newReservation = {...req.body.data, status: "booked"}
  //console.log("newRes", newReservation)

  const data = await reservationsService.create(newReservation)

  console.log("data", data)
  //res.status(201).json({ data: data })
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: asyncErrorBoundary(create),
};
