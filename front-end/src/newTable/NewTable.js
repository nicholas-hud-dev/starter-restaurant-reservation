import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewTable() {

const history = useHistory()

const defaultTableData = {
    table_name: "",
    capacity: 0,
    status: "open"
  };
  const [ tableData , setReservationData ] = useState({
    ...defaultTableData
  });

const [ buttonDisable, setButtonDisable ] = useState(false);
const [ createTableError, setTableError ] = useState(null);

const changeHandler = (e) => {
    e.preventDefault();
    setReservationData({
      ...tableData,
      [e.target.name] : e.target.value
    });
  };

const handleCancel = (e) => {
    e.preventDefault()
    setButtonDisable(state => !state)
    history.goBack()
}

const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    const controller = new AbortController();
    setButtonDisable(state => !state)
    createTable(tableData, controller.signal)
    .then(() => history.push('/'))
    .catch(setTableError)
    setButtonDisable(state => !state)
  };

    return (
        <div>
            <h1>New Table</h1>
            {createTableError ? <ErrorAlert error={createTableError} /> : null}
            <form onSubmit={handleSubmit} onReset={handleCancel}>
                
                <div className="form-group">
                <label>Table Name</label>
                   <input 
                    name="table_name"
                    type="text"
                    placeholder="Enter Table Name" 
                    required
                    value={tableData.table_name}
                    onChange={changeHandler}
                /> 
                </div>
                <div className="form-group">
                <label>Table Capacity</label>
                    <input
                        name="capacity"
                        type="number" 
                        placeholder="Enter Table Capacity"
                        required
                        value={tableData.capacity}
                        onChange={changeHandler}
                />
                </div>
                
                <div>
                    <button type="reset" disabled={buttonDisable}>Cancel</button>
                    <button type="submit" disabled={buttonDisable}>Submit</button>
                </div>
            </form>
        </div>
    )
}