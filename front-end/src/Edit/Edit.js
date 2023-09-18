import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import NewReservationForm from "../createReservation/NewReservationForm";

export default function Edit() {
    
    const { reservation_id } = useParams();
    const [ reservation, setReservation ] = useState(null);
    const [ resError, setResError ] = useState(null);

    const loadReservation = () => {
        const controller = new AbortController();
        readReservation(reservation_id, controller.signal)
        .then(setReservation)
        .catch(setResError);
        return () => controller.abort();
    };

    useEffect(loadReservation, [reservation_id]);

    console.log("Rendering Edit component with reservation:", reservation);

    return(
        <div>
            <ErrorAlert error={resError} />
            {reservation ? <NewReservationForm reservation={reservation} /> : <p>Loading...</p>}
        </div>
    )
}