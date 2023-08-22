import React, { useState, useEffect, useRef } from "react";
import Form from "./Form";
import { createReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";

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
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Define a ref to track whether the component is mounted
  const isMounted = useRef(true);

  useEffect(() => {
    // Set isMounted to true when the component mounts
    isMounted.current = true;

    // Clean up function to set isMounted to false when the component unmounts
    return () => {
      isMounted.current = false;
    };
  }, []);

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

      // Check if the component is still mounted before setting state
      if (isMounted.current) {
        setFormSubmitted(true);
        // Redirect to the dashboard with the new reservation date
        history.push(`/dashboard?date=${createdReservation.reservation_date}`);
      }
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
      {formSubmitted && (
        <Dashboard initialDate={formData.reservation_date} />
      )}
    </div>
  );
}
