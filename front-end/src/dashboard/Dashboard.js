import React, { useEffect, useState, useCallback } from "react";
import { listReservations } from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationDetails from "./ReservationDetails";

function Dashboard({ initialDate }) {
  const [date, setDate] = useState(initialDate || new Date().toISOString().slice(0, 10));
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const loadDashboard = useCallback(async () => {
    const abortController = new AbortController();
    setReservationsError(null);

    try {
      const reservationsData = await listReservations({ date }, abortController.signal);
      const formattedReservations = formatReservationDate(reservationsData);
      const reservationsWithFormattedTime = formatReservationTime(formattedReservations);
      setReservations(reservationsWithFormattedTime);
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
      
    };
  }, [loadDashboard]);

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
    </main>
  );
}

export default Dashboard;
