import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewReservationForm({ reservation }) {
  let defaultReservationData = reservation ? reservation :
    {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
        status: "booked",
      };
  const [reservationData, setReservationData] = useState({
    ...defaultReservationData,
  });
  const [createResError, setResError] = useState(null);
  const history = useHistory();

  const changeHandler = (event) => {
    event.preventDefault();
    setReservationData({
      ...reservationData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const controller = new AbortController();
    try {
      if (reservation) {
        const response = await updateReservation(reservationData, controller.signal);
        console.log("Response:", response);
        console.log("Date:", reservationData.reservation_date);
        history.push(`/dashboard?date=${reservationData.reservation_date}`);
      } else {
        const result = await createReservation(reservationData, controller.signal);
        console.log("Result:", result);
        console.log("Date:", reservationData.reservation_date);
        history.push(`/dashboard?date=${reservationData.reservation_date}`);
      }
    } catch (err) {
      setResError(err);
    }
    controller.abort();
  };
  

  const cancelHandler = (event) => {
    event.preventDefault();
    const controller = new AbortController();
    history.goBack();
    return () => controller.abort();
  };

  return (
    <div>
      {reservation ? <h1>Edit Reservation</h1> : <h1>New Reservation</h1>}
      <ErrorAlert error={createResError} />
      <form onSubmit={submitHandler} onReset={cancelHandler}>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            className="form-control"
            name="first_name"
            id="first_name"
            placeholder="First Name"
            value={reservationData.first_name}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="last_name"
            id="last_name"
            placeholder="Last Name"
            value={reservationData.last_name}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            name="mobile_number"
            id="mobile_number"
            placeholder="xxx-xxx-xxxx"
            value={reservationData.mobile_number}
            onChange={changeHandler}
            pattern="^\d{3}-\d{3}-\d{4}$"
            title="Please enter a valid phone number in the format xxx-xxx-xxxx"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservation_date">Reservation Date</label>
          <input
            type="date"
            className="form-control"
            name="reservation_date"
            id="reservation_date"
            pattern="\d{4}-\d{2}-\d{2}"
            value={reservationData.reservation_date}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservation_time">Reservation Time</label>
          <input
            type="time"
             min="10:30"
             max="21:30"
            className="form-control"
            name="reservation_time"
            id="reservation_time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            value={reservationData.reservation_time}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="people">Number of People</label>
          <input
            type="number"
            className="form-control"
            name="people"
            id="people"
            placeholder="Number of People"
            value={reservationData.people}
            onChange={changeHandler}
          />
        </div>
        <button type="submit" className="btn btn-primary m-1">
          Submit
        </button>
        <button type="reset" className="btn btn-danger m-1">
          Cancel
        </button>
      </form>
    </div>
  );
}