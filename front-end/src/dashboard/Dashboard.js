
import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationDetails from "./ReservationDetails";
import Table from "./TableDetails";
import makeDate from "./makeDate";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

export default function Dashboard({ exportDate }) {
  const [dateAugment , setDateAugment] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  const loadReservations = () => {
    const abortController = new AbortController();
    const date = exportDate ? exportDate : makeDate(dateAugment);
    setDateAugment(date)
    console.log("DATEDASHLOG", date)
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
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
    const controller = new AbortController();
    loadReservations();
    loadTables();
    return () => controller.abort();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadBoth, [dateAugment])

  //previous/today/next buttons
  const buttonSetDate = (event) => {
    event.preventDefault();
    const buttonText = event.target.innerHTML;
    switch (buttonText) {
      case "Previous":
        setDateAugment(state => state - 1)
        break;
      case "Today":
        setDateAugment(0)
        break;
      case "Next":
        setDateAugment(state => state + 1)
        break;
      default:
        break;
    };
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {makeDate(dateAugment)}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="reservations">
      <ReservationDetails reservations={reservations} />
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
      <ErrorAlert error={tablesError} />
      <div className="tables">
      {tables.length < 1 ? <p>Loading...</p> :
      <Table tables={tables} />}
      </div>
      </div>
    </main>
  );
}