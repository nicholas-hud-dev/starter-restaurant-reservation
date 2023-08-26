import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { updateReservationStatus } from "../utils/api";

export default function ReservationDetails({ reservation }) {
  
    const history = useHistory();
    const [error, setError] = useState(null);
    
    const handleSeat = (e) => {
        e.preventDefault();
        setError(null);
        updateReservationStatus({ status: "seated" }, reservation.reservation_id)
        .then((response) => {
            history.push(`/reservations/${reservation.reservation_id}/seat`);
        })
        .catch(setError);
    }
  
    return (

    <div>
        {reservation.status === "booked" ? <a
                                href={`/reservations/${reservation.reservation_id}/seat`}
                                onClick={handleSeat} >
                            Seat
                                </a> : <div></div>
}
        <div>
            <p>Name: {reservation.first_name} {reservation.last_name}</p>
            <p>Mobile Number: {reservation.mobile_number}</p>
            <p>Date: {reservation.reservation_date}</p>
            <p>Time: {reservation.reservation_time}</p>
            <p>People: {reservation.people}</p>
            <p>Status: {reservation.status}</p>
        </div>
    </div>
  );
}
