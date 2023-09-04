const tableService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationService = require("../reservations/reservations.service");

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

const dataBodyExists = (req, res, next) => {
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
    try {
      if (reservation_id) {
        const reservation = await reservationService.read(reservation_id);
        if (!reservation) {
          return next({
            message: "999",
            status: 404,
          });
        }
        res.locals.reservation = reservation;
        return next();
      } else {
        return next({
          message: "Please input an existing reservation_id",
          status: 400,
        });
      }
    } catch (error) {
      return next(error);
    }
  };
  

  const capacityCheck = (req, res, next) => {
    const { people } = res.locals.reservation;
    const { capacity } = res.locals.table;
    if (people > capacity) {
      return next({
        message: 'This table does not have the capacity to seat that many people',
        status: 400,
      });
    } else {
      return next();
    }
  };

const tableNameExists = (req, res, next) => {
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

const capacityExists = (req, res, next) => {
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

const notOccupied = (req, res, next) => {
    const { status } = res.locals.table;
   // console.log(res.locals.table);
    if (status === 'occupied') {
      return next({
        message: 'table already occupied',
        status: 400,
      });
    } else {
      return next();
    }
  };



  function tableIsNotOccupied(req, res, next) {
    const { reservation_id } = res.locals.table;
    if (!reservation_id) {
      return next({
        status: 400,
        message: `Table is not occupied.`,
      });
    }
    return next();
  }

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

  const parsedReservationId = parseInt(reservation_id, 10);

  const tableUpdate = {
    table_id,
    table_name,
    capacity,
    status: "occupied",
    reservation_id: parsedReservationId,
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

const list = async (req, res) => {
    res.status(200).json({
      data: await tableService.list(),
    });
  };

module.exports = {
  create: [
    dataBodyExists,
    tableNameExists,
    capacityExists,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(tableExists),
    dataBodyExists,
    asyncErrorBoundary(reservationIdExists),
    capacityCheck,
    notOccupied,
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(tableExists),
    tableIsNotOccupied,
    asyncErrorBoundary(destroy),
  ],
  list: [
    asyncErrorBoundary(list)
],
}