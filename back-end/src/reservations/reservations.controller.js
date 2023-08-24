/**
 * List handler for reservation resources
 */
const reservationsService = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const hasProperties = require("../errors/hasProperties")

//VALIDATION LOGIC

async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation with id: ${reservationId} was not found`,
  });
}

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
  "reservation_id",
  "created_at",
  "updated_at",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidStatuses = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );
  if (invalidStatuses.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidStatuses.join(", ")}`,
    });
  }
  next();
}

const REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

const hasRequiredProperties = hasProperties(...REQUIRED_PROPERTIES)



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
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    //hasValidValues,
    asyncErrorBoundary(create),
  ],
  //update: [
    //asyncErrorBoundary(reservationExists),
    //hasOnlyValidProperties,
    //hasRequiredProperties,
    //hasValidValues,
    //statusIsBooked,
    //asyncErrorBoundary(update),
 // ],
  //updateStatus: [
   // asyncErrorBoundary(reservationExists),
    //statusIsValid,
    //statusNotFinished,
    //asyncErrorBoundary(updateStatus),
  //],
  list: [//hasValidQuery,
     asyncErrorBoundary(list)],
  //read: [reservationExists, asyncErrorBoundary(read)],
};
