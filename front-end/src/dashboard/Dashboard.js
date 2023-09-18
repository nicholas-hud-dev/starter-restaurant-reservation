import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationDetails from "./ReservationDetails";
import Table from "./TableDetails";
import useQuery from "../utils/useQuery";
import { next, previous, today } from "../utils/date-time"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

export default function Dashboard({ exportDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const query = useQuery()
  const [date, setDate] = useState(query.get("date") || exportDate);

  const loadReservations = () => {
    const abortController = new AbortController();
    //setDateAugment(date)
    console.log("DATEDASHLOG", date)
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
      console.log("RESERV IN DASH:", reservations)
      console.log("date = ", date)
    return () => abortController.abort();
  };

  const loadTables = () => {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  };

  const loadBoth = () => {
    console.log("Inside loadboth for -", date)
    const controller = new AbortController();
    loadReservations();
    loadTables();
    return () => controller.abort();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadBoth, [date])

  //previous/today/next buttons
  const buttonSetDate = (event) => {
    event.preventDefault();
    const buttonText = event.target.innerHTML;
    switch (buttonText) {
      case "Previous":
        setDate(previous(date))
        break;
      case "Today":
        setDate(today())
        break;
      case "Next":
        setDate(next(date))
        break;
      default:
        break;
    };
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for { date }</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="reservations">
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-primary" onClick={buttonSetDate}>
          Previous
        </button>
        <button type="button" className="btn btn-primary" onClick={buttonSetDate}>
          Today
        </button>
        <button type="button" className="btn btn-primary" onClick={buttonSetDate}>
          Next
        </button>
      </div>
      <ReservationDetails reservations={reservations} />
      <ErrorAlert error={tablesError} />
      <div className="tables">
      {tables.length < 1 ? <p>Loading...</p> :
      <Table tables={tables} />}
      </div>
      </div>
    </main>
  );
}