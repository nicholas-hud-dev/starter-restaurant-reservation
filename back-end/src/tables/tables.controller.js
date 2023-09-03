const tableService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationService = require("../reservations/reservations.service")

//validation
const tableExists = async (req, res, next) => {
  const { table_id } = req.params;
  const data = await tableService.read(Number(table_id));
  if (data) {
    res.locals.table = data;
    return next();
  } else {
    return next({
      message: `The Table ${table_id} does not Exist`,
      status: 404,
    });
  }
};

const dataBodyExists = async (req, res, next) => {
  if (req.body.data) {
    return next();
  } else {
    return next({
      message: "Body of Data does not exist",
      status: 400,
    });
  }
};

const reservationIdExists = async (req, res, next) => {
    const { reservation_id } = req.body.data;
    if (
      reservation_id &&
      reservation_id !== "" &&
      reservation_id == Number(reservation_id) &&
      Number(reservation_id) > 0
    ) {
      const reservation =  await reservationService.read(reservation_id);
      if (reservation) {
  
        res.locals.reservation = reservation;
        return next();
  
    } else {
      return next({
        message: "Please input an existing reservation_id",
        status: 400,
      });
    }
  }
}

const capacityCheck = async (req, res, next) => {
  const { table_option } = req.params;
  const { people } = res.locals.reservation;
  const { status, capacity } = res.locals.table;
  if (table_option === "seat") {
    if (status === "open") {
      if (capacity >= people) {
        return next();
      } else {
        return next({
          message:
            "This table does not have the capacity to seat that many people",
          status: 400,
        });
      }
    } else {
      return next({
        message: "This table is occupied",
        status: 400,
      });
    }
  } else {
    return next({
      message: "Invalid Path",
      status: 404,
    });
  }
};

const tableNameExists = async (req, res, next) => {
  const { table_name } = req.body.data;
  if (table_name && table_name !== "" && table_name.length > 1) {
    return next();
  } else {
    return next({
      message: "table_name cannot be empty or one letter",
      status: 400,
    });
  }
};

const capacityExists = async (req, res, next) => {
  const { capacity } = req.body.data;
  if (capacity && !isNaN(capacity) && capacity > 0) {
    return next();
  } else {
    return next({
      message: "The table must have a capacity greater than zero",
      status: 400,
    });
  }
};

const notOccupied = async (req, res, next) => {
  const { status } = res.locals.table;
  console.log(res.locals.table)
  if (status === "occupied") {
    return next();
  } else {
    return next({
      message: "not occupied",
      status: 400,
    });
  }
};

//CRUDL functions
const create = async (req, res) => {
  const { table_name, capacity } = req.body.data;
  const newTable = {
    table_name: table_name,
    capacity: capacity,
    status: "open",
  };
  const createdTable = await tableService.create(newTable);
  res.status(201).json({ data: createdTable });
};

const read = async (req, res) => {
  res.json({ data: res.locals.table });
};

const update = async (req, res) => {
  const { reservation_id } = req.body.data;
  const { table_name, capacity } = res.locals.table;
  const { table_id } = req.params;
  const tableUpdate = {
    table_id,
    table_name,
    capacity,
    status: "occupied",
    reservation_id,
  };
  const reservationUpdate = { ...res.locals.reservation, status: "seated" };
  const updatedTable = await tableService.update(tableUpdate, reservationUpdate);
  res.json({ data: updatedTable });
};

const destroy = async (req, res) => {
  const {reservation_id} = res.locals.table;
  const newTable = {
    ...res.locals.table,
    status: "open",
  };
  const reservation = await tableService.readRes(reservation_id)
  const updatedReservation = {
    ...reservation,
    status: "finished",
  }
  const openedTable = await tableService.destroy(newTable, updatedReservation);
  res.status(200).json({ data: openedTable });
};

async function list(req, res) {
    const data = await tableService.list();  
    console.log(data)
    res.json({ data });
  }

module.exports = {
  create: [
    asyncErrorBoundary(dataBodyExists),
    asyncErrorBoundary(tableNameExists),
    asyncErrorBoundary(capacityExists),
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(dataBodyExists),
    asyncErrorBoundary(reservationIdExists),
    asyncErrorBoundary(capacityCheck),
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(notOccupied),
    asyncErrorBoundary(destroy),
  ],
  list: [
    asyncErrorBoundary(list)
],
}