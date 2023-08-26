const tablesService = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const hasProperties = require("../errors/hasProperties")
const onlyValidProperties = require("../errors/onlyValidProperties")

// SET UP FOR VALIDATION

const REQUIRED_PROPERTIES = ["table_name", "capacity"]
const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id", "people"]

const hasOnlyValidPropertiesForCreate = onlyValidProperties(VALID_PROPERTIES)
const hasRequiredPropertiesForCreate = hasProperties(REQUIRED_PROPERTIES)

const hasOnlyValidPropertiesToSeat = onlyValidProperties(["reservation_id"])
const hasRequiredPropertiesToSeat = hasProperties(["reservation_id"])

// VALIDATION MIDDLEWARE

function hasValidName(req, res, next) {
    const { table_name } = req.body.data
    if (table_name.length >= 2) {
        return next()
    }
    next({
        status: 400,
        message: `table_name '${table_name}' must be at least 2 characters long.`
    })
}

function hasValidCapacity(req, res, next) {
    const { capacity } = req.body.data
    if (capacity > 0 && Number.isInteger(capacity)) {
        return next()
    }
    next({
        status: 400,
        message: `capacity '${capacity}' must be a whole number greater than zero.`
    })
}

async function tableExists(req, res, next) {
    const { tableId } = req.params
    const table = await tablesService.read(tableId)
    if (table) {
        res.locals.table = table
        return next()
    }
    next({
        status: 404,
        message: `table_id '${tableId}' does not exist.`
    })
}

async function reservationExists(req, res, next) {
    const { reservation_id } = req.body.data
    const reservation = await tablesService.readReservation(reservation_id)
    if (reservation) {
        res.locals.reservation = reservation
        return next()
    }
    next({
        status: 404,
        message: `Reservation ${reservation_id} does not exist.`
    })
}

// CRUDL FUNCTIONS

async function list(req, res) {
    const table = req.body.data;
    const data = await tablesService.list

    res.status(201).json({data})
  }
  

  async function create(req, res) {
    console.log("CREATING TABLE")
    const table = req.body.data;
    const data = await tablesService.create(table)

    res.status(201).json({data})
  
  }

  function read(req, res) {
    const data = res.locals.table
    res.json({data})
  }

  async function updateSeatReservation(req, res) {
    const {reservation_id} = req.body.data
    const table_id = req.params.tableId
    const data = await tablesService.updateSeatReservation(reservation_id, table_id)
    res.json({data})
  }


  module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        hasOnlyValidPropertiesForCreate,
        hasRequiredPropertiesForCreate,
        hasValidName,
        hasValidCapacity,
        asyncErrorBoundary(create)
    ],
    read: [
        asyncErrorBoundary(tableExists),
        read
    ],
    updateSeatReservation: [
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(reservationExists),
        asyncErrorBoundary(updateSeatReservation),
    ],
}