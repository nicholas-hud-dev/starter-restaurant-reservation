import React from "react";

export default function ReservationDetails({ reservation }) {
  return (
    <div>
      <h1>Reservation Details</h1>
      <p>Name: {reservation.first_name} {reservation.last_name}</p>
      <p>Mobile Number: {reservation.mobile_number}</p>
      <p>Date: {reservation.reservation_date}</p>
      <p>Time: {reservation.reservation_time}</p>
      <p>People: {reservation.people}</p>
      <p>Status: {reservation.status}</p>
    </div>
  );
}
