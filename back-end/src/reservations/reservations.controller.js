const reservationsService = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const hasProperties = require("../errors/hasProperties")
const onlyValidProperties = require("../errors/onlyValidProperties")

//VALIDATION LOGIC

async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await reservationsService.read(reservationId);

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

const REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

const UPDATE_REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "people",
  "mobile_number",
  "reservation_date",
  "reservation_time",
];
const UPDATE_VALID_PROPERTIES = [
  "reservation_id",
  "status",
  "created_at",
  "updated_at",
  "first_name",
  "last_name",
  "people",
  "mobile_number",
  "reservation_date",
  "reservation_time",
];


const hasOnlyValidProperties = onlyValidProperties(VALID_PROPERTIES)
const hasRequiredProperties = hasProperties(...REQUIRED_PROPERTIES)

const hasOnlyValidUpdateProperties = onlyValidProperties(UPDATE_VALID_PROPERTIES)
const hasRequiredUpdateProperties = hasProperties(UPDATE_REQUIRED_PROPERTIES)

const hasOnlyStatus = onlyValidProperties(["status"])
const hasRequiredStatus = hasProperties(["status"])

// DATE VALIDATION

function isValidDate(req, res, next) {
  const date = req.body.data.reservation_date
  const valid = Date.parse(date)
  if (valid) {
    return next()
  }
  next({
    status: 400,
    message: `reservation_date '${date}' is not a valid date.`
  })
}


function isValidTime(req, res, next) {
  const time = req.body.data.reservation_time
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  const valid = time.match(timeRegex)
  if (valid) {
    return next()
  }
  next({
    status: 400,
    message: `reservation_time '${time} is not a valid time.`
  })
}

function isValidNumber(req, res, next) {
  const people = req.body.data.people
  const valid = Number.isInteger(people)
  if (valid && people > 0) {
    return next()
  }
  next({
    status: 400,
    message: `people '${people}' is not a valid integer.`
  })
}

function statusIsBookedIfPresent(req, res, next) {
  const { status } = req.body.data
  if (!status || status === "booked") {
    return next()
  }
  next({
    status: 400,
    message: `status should be "booked" or absent, recieved: '${status}'`
  })
}

function noReservationsOnTuesdays(req, res, next) {
  const date = req.body.data.reservation_date
  const weekday = new Date(date).getUTCDay()
    if (weekday !== 2) {
      return next()
    }
  next({
    status: 400,
    message: `The restaurant is closed on Tuesdays.`
    })
}

function noReservationsInPast(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data
  const presentDate = Date.now() 
  const newDate = new Date(`${reservation_date} ${reservation_time}`).valueOf()
    if (newDate > presentDate) {
      return next()
    }
  next({
    status: 400,
    message: `New Reservations must be in the future.`
    })
}

function reservationIsDuringBusinessHours(req, res, next) {
  const time = req.body.data.reservation_time
  const hours = Number(time.slice(0, 2))
  const minutes = Number(time.slice(3, 5))
  const clockTime = hours * 100 + minutes
  if (clockTime < 1030 || clockTime > 2130) {
    return next({
      status: 400,
      message: `Reservation time '${time}' must be between 10:30 AM and 9:30 PM.`
    })
  }
  next()
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

  //CREATE
async function create(req, res) {
  console.log("CREATING RESERVATION")
  const newReservationData = req.body.data;

  const newReservation = { 
    ...newReservationData,
    status: "booked",   
  };

  const data = await reservationsService.create(newReservation);

  const responseData = {
    first_name: data.first_name,
    last_name: data.last_name,
    mobile_number: data.mobile_number,
    people: parseInt(data.people)
}

  res.status(201).json({ data: responseData});

}

module.exports = {
  create: [
    //asyncErrorBoundary(reservationExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    isValidDate,
    isValidTime,
    isValidNumber,
    statusIsBookedIfPresent,
    noReservationsOnTuesdays,
    noReservationsInPast,
    reservationIsDuringBusinessHours,
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
