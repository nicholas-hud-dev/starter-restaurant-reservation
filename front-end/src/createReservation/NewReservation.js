import { useState } from "react";
import Form from "./Form"
import { createReservation } from "../utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function NewReservation() {

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(null)
        
        const reservation = {
            ...formData,
            status: "booked",
        }

        reservation.people = Number(reservation.people)

        
        createReservation(reservation)
        .then(() => {
            history.push(`/dashboard?date=${formData.reservation_date}`)
        })
        .catch((error) => {
            setError(error)
        }) 
        
    }


    const initialFormData = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    }

    const [formData, setFormData] = useState(initialFormData)

    const [error, setError] = useState(null)

    return (
        <div>
            <h3>
                Create A New Reservation!!!! U no U want 2
            </h3>
            <Form 
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                />
        </div>
          )
}