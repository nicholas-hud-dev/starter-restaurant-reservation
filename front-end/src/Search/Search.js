import React, { useState, useEffect } from "react";
import { listReservations } from "../utils/api";
import ReservationDetails from "../dashboard/ReservationDetails";

export default function Search() {
  const [mobile_number, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (reservations && reservations.length === 0) {
      setShowError(true);
    }
  }, [reservations]);

  const handleSubmit = (e) => {
    e.preventDefault();
    listReservations({ mobile_number }).then((res) => {
      setReservations(res);
    });
  };

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  return (
    <div>
      <div>
        {showError && <p>No reservations found</p>}
      </div>
      <h1>Search. Yeah, I said it</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="mobile_number"
          type="text"
          placeholder="Enter a customer's phone number"
          required
          value={mobile_number}
          onChange={handleMobileNumberChange} // Add this onChange handler
        />
        <button type="submit">Search</button>
      </form>

      <div>
        <ul>
          {reservations &&
            reservations.map((res) => (
              <li key={res.reservation_id}>
                <ReservationDetails reservation={res} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
