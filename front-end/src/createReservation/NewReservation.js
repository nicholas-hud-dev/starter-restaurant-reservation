import React, { useState, useEffect } from "react";
import Form from "./Form";
import { createReservation } from "../utils/api";
import { useHistory } from "react-router-dom";

export default function NewReservation() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission

  const handleSubmit = async () => {
    setError(null);

    const reservation = {
      ...formData,
      status: "booked",
      people: Number(formData.people),
    };

    try {
      // Use the createReservation function to submit the reservation data
      const createdReservation = await createReservation(reservation);

      // Update the reservation_date in formData
      setFormData({
        ...formData,
        reservation_date: createdReservation.reservation_date,
      });

      // Mark the form as submitted (no need for a separate state)
      // Redirect to the dashboard with the new reservation date
      history.push(`/dashboard?date=${createdReservation.reservation_date}`);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h3>Create A New Reservation!!!! U no U want 2</h3>
      <Form
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        error={error}
        history={history}
      />
    </div>
  );
}
