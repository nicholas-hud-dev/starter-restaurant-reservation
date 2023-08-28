
import React, { useEffect, useState, useCallback } from "react";
import { listReservations, listTables } from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationDetails from "./ReservationDetails";
import useQuery from "../utils/useQuery";
import TableDetails from "./TableDetails";

function Dashboard({ initialDate }) {

  const query = useQuery();
  const [date, setDate] = useState(query.get("date")||initialDate);  
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([])

  const loadDashboard = useCallback(async () => {
    const abortController = new AbortController();
    setReservationsError(null);

    try {
      const reservationsData = await listReservations({ date }, abortController.signal);
      const formattedReservations = formatReservationDate(reservationsData);
      const reservationsWithFormattedTime = formatReservationTime(formattedReservations);
      if (!abortController.signal.aborted) {
        setReservations(reservationsWithFormattedTime);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setReservationsError(error);
    } finally {
      abortController.abort();
    }
  }, [date]);

  useEffect(() => {
    loadDashboard();

    return () => {
      // Clean up by aborting the controller when the component unmounts
      const abortController = new AbortController();
      abortController.abort();
    };
  }, [loadDashboard]);

const loadTables = useCallback(async () => {
    try {
      const tablesData = await listTables();
      setTables(tablesData);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
    loadTables(); // Call the loadTables function

    return () => {
      const abortController = new AbortController();
      abortController.abort();
    };
  }, [loadDashboard, loadTables]);

  function handlePreviousDay() {
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    setDate(prevDate.toISOString().slice(0, 10));
  }

  function handleNextDay() {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    setDate(nextDate.toISOString().slice(0, 10));
  }

  function handleToday() {
    setDate(new Date().toISOString().slice(0, 10));
  }

  

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
        <button className="btn btn-primary mx-2" onClick={handlePreviousDay}>Previous</button>
        <button className="btn btn-primary mx-2" onClick={handleToday}>Today</button>
        <button className="btn btn-primary mx-2" onClick={handleNextDay}>Next</button>
      </div>
      <ErrorAlert error={reservationsError} />
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.reservation_id}>
            <ReservationDetails reservation={reservation} />
          </li>
        ))}
      </ul>
      <div className="d-md-flex mb-3">
          <h2>Tables</h2>
          {tables && tables.map((table) => (
             <div>
              <TableDetails table={table}/>
             </div>
          ))}
      </div>
    </main>
  );
}

export default Dashboard;


/** 
import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time";
import ReservationDetails from "./ReservationDetails";
import TableDetails from "./TableDetails";
import useQuery from "../utils/useQuery";

 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}

function Dashboard({ initialDate }) {
  // const date = today()
  const [reservations, setReservations] = useState(null);
  const [tables, setTables] = useState(null);
  const [viewDate, setViewDate] = useState(initialDate);
  const [error, setError] = useState(null);
  const handlePreviousDay = (e) => {
    e.preventDefault();
    setViewDate(previous(viewDate));
  };
  const handleNextDay = (e) => {
    e.preventDefault();
    setViewDate(next(viewDate));
  };
  const handleToday = (e) => {
    e.preventDefault();
    setViewDate(initialDate);
  };
  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    if (viewDate === initialDate) {
      listReservations({ initialDate }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    } else {
      listReservations({ viewDate }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    }
    return () => abortController.abort();
  }, [initialDate, viewDate]);
  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    listTables()
    .then(setTables)
    .catch(setError);
    return () => abortController.abort();
  }, []);
  const query = useQuery();
  const searchedDate = query.get("date");
  useEffect(() => {
    if (searchedDate && searchedDate !== "") {
      setViewDate(searchedDate);
    }
  }, [searchedDate])
  if (reservations) {
    return (
      <main>
        <h1 className="d-flex m-3 justify-content-center display-4 text-white">Dashboard</h1>
        <div className="d-flex justify-content-between mb-3">
          <button className="rounded" onClick={handlePreviousDay}>Prev</button>
          <button className="rounded" onClick={handleToday}>Today</button>
          <button className="rounded" onClick={handleNextDay}>Next</button>
        </div>
        <h2 className="d-flex justify-content-center text-white" >Reservations:</h2>
        <div className="d-md-flex mb-3 d-flex justify-content-center text-white">
          <h4 className="mb-0">{viewDate}</h4>
        </div>
        <div className="row">
              {reservations && reservations.filter(res => res.status !== "cancelled").map((reservation) => (
                <div className="col-md-6" key={reservation.reservation_id}>
                  <ReservationDetails reservation={reservation} />
                </div>
              ))}
        </div>
        <div>
          <h2 className="d-flex justify-content-center text-white">Tables</h2>
          {tables && tables.map((table) => (
            <div className="mb-3 mt-3" key={table.table_id}>
              <TableDetails table={table} />
            </div>
          ))}
        </div>
        <ErrorAlert error={error} />
      </main>
    );
  } else {
    return (
      <div>
        Loading...
      </div>
    )
  }
}
export default Dashboard;
*/