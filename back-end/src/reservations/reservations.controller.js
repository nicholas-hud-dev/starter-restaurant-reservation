/**
 * List handler for reservation resources
 */
const reservationsService = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

//VALIDATION LOGIC

function validateReservationData(req, res, next) {
  const newReservationData = req.body.data;

  if (
    !newReservationData ||
    !newReservationData.first_name
    ) {
    return next({
      status: 400,
      message: "Required data is missing.",
    });
  }

  // If all validations pass, call the next middleware or route handler.
  next();
}


//CRUDL FUNCTIONS

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
  const newReservationData = req.body.data;

  const newReservation = { ...newReservationData, status: "booked" };

  const data = await reservationsService.create(newReservation);

  res.status(201).json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [validateReservationData, asyncErrorBoundary(create)],
};
