import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createTable } from "../utils/api";

export default function NewTable() {

const history = useHistory()

const [table_name, setTable_name] = useState("")
const [capacity, setCapacity] = useState("")
const [error, setError] = useState(null)

const handleCancel = (e) => {
    e.preventDefault()
    history.goBack()
}

const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    const table = {
        table_name, 
        capacity,
    }
    console.log("TABLE DATA:", table)
    createTable(table)
        .then((response) => {
            console.log("RESPONSE:", response);
            history.push("/dashboard")
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                setError(error.response.data.error)
            } else {
                setError("An error occurred while creating the table")
            }
        })
}

    return (
        <div>
            <h1>
                New Table: Do that here, why not?
            </h1>
            <form onSubmit={handleSubmit}>
                <label>Table Name</label>
                <input 
                    name="table_name"
                    type="text"
                    placeholder="Enter Table Name" 
                    required
                    onChange={(e) => setTable_name(e.target.value)}
                    value={table_name}
                />
                <label>Table Capacity</label>
                <input
                    name="capacity"
                    type="number" 
                    placeholder="Enter Table Capacity"
                    required
                    onChange={(e) => setCapacity(e.target.valueAsNumber)}
                    value={capacity}
                />
                <div>
                    <button onClick={handleCancel}>Cancel</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}