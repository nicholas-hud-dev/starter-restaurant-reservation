import { useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { updateReservationStatus, deleteReservationId, deleteTable } from "../utils/api"

export default function TableDetails({table}) {

const history = useHistory()
const [error, setError] = useState(null)

const handleFinish = (e) => {
    e.preventDefault();
    setError(null);
    const confirmBox = window.confirm("Is this table ready to seat new guests? This cannot be undone.");
    if (confirmBox === true) {
        updateReservationStatus({ status: "finished" }, table.reservation_id)
        .catch(setError);
        deleteReservationId(table.table_id)
        .then((response) => {
            // setCurrentTable(response)
            history.go(0);
        })
        .catch(setError);
    }
};
//
const handleCancel = (e) => {
    e.preventDefault();
};
//Deletes table then refreshes the page
const handleDelete =(e) => {
    e.preventDefault();
    setError(null);
    const confirmBox = window.confirm("Are you sure you want to delete this table? This cannot be undone.");
    console.log(table)
    if (confirmBox === true) {
        console.log("current table id", table.table_id)
        deleteTable(table.table_id)
        .catch(setError);
        history.go(0);
    }
};

    return (
        <div>
            <div>
                <p>Table Name: {table.table_name}</p>
                <p>Table Capacity: {table.capacity}</p>
                <div>
                    {!table.reservation_id ? (<div></div>) : (<div>
                                    <button onClick={handleCancel}>Cancel</button>
                                    <button onClick={handleFinish}>Finish</button>
                                                            </div>)}
                </div>
                <p>Table Status: {table.reservation_id ? "free" : "occupied"}</p>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

