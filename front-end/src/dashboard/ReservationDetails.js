import { useHistory } from "react-router-dom";
import { cancelReservation } from "../utils/api";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function ReservationDetails({ reservations }) {
  const history = useHistory();

  const cancelHandler = (reservation_id) => {
    console.log("reservationIDRESDEETS", reservation_id)
    const controller = new AbortController();
    const rock = window.confirm("Do you really want to change this?");
    if (rock) {
      cancelReservation(reservation_id, controller.signal).then(() =>
        history.push("/")
      );
    }
  };
  

  return (
    <table id="resDeets" className="table">
      <thead>
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Mobile Number</th>
          <th scope="col">Reservation Day</th>
          <th scope="col">Reservation Time</th>
          <th scope="col">Number of People</th>
          <th scope="col">Status</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map(
          (
            {
              reservation_id,
              first_name,
              last_name,
              mobile_number,
              reservation_date,
              reservation_time,
              people,
              status,
            }
          ) => {
            if (status !== "finished") {
              return (
                <tr key={reservation_id}>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>{mobile_number}</td>
                  <td>{reservation_date}</td>
                  <td>{reservation_time}</td>
                  <td>{people}</td>
                  <td>{status}</td>
                  <td>
                    {status === "booked" ? (
                      <>
                        <Link
                    reservation_id={reservation_id}
                    className="btn btn-secondary"
                    role="button"
                    to={`/reservations/${reservation_id}/edit`}
                    >
                    Edit
                    </Link>
                        <Link
                    reservation_id={reservation_id}
                    className="btn btn-secondary"
                    role="button"
                    to={`/reservations/${reservation_id}/seat`}
                    >
                    Seat
                    </Link>
                        <button
                          type="button"
                          className="btn btn-danger m-1"
                          onClick={() => cancelHandler(reservation_id)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : null}
                  </td>
                </tr>
              );
            }
            return null;
          }
        )}
      </tbody>
    </table>
  );
}