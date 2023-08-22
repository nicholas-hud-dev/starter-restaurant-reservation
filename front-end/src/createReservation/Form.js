import React from "react"

export default function Form({ formData, setFormData, handleSubmit, history }) {


    const handleCancel = (e) => {
        e.preventDefault()
        history.goBack()
    }

    return (
    <div>
        <form onSubmit={(e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleSubmit();
}}>
            <label>First Name</label>
            <input 
                name="first_name"
                placeholder="Enter First Name"
                type="text"
                required={true}
                value={formData.first_name}
                onChange={(e) => setFormData({
                    first_name: e.target.value,
                    last_name: formData.last_name,
                    mobile_number: formData.mobile_number,
                    reservation_date: formData.reservation_date,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                })}
            />
            <label>Last Name</label>
            <input 
                name="last_name"
                placeholder="Enter Last Name"
                type="text"
                required={true}
                value={formData.last_name}
                onChange={(e) => setFormData({
                    first_name: formData.first_name,
                    last_name: e.target.value,
                    mobile_number: formData.mobile_number,
                    reservation_date: formData.reservation_date,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                })}
            />
            <label>Mobile Number</label>
            <input 
                name="mobile_number"
                placeholder="xxx-xxx-xxxx"
                type="tel"
                required={true}
                value={formData.mobile_number}
                onChange={(e) => setFormData({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    mobile_number: e.target.value,
                    reservation_date: formData.reservation_date,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                })}
            />
            <label>Reservation Date</label>
            <input 
                name="reservation_date"
                pattern="\d{2}-\d{2}-\d{4}"
                type="date"
                required={true}
                value={formData.reservation_date}
                onChange={(e) => setFormData({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    mobile_number: formData.mobile_number,
                    reservation_date: e.target.value,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                })}
            />
            <label>Reservation Time</label>
            <input 
                name="reservation_time"
                type="time"
                required={true}
                value={formData.reservation_time}
                onChange={(e) => setFormData({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    mobile_number: formData.mobile_number,
                    reservation_date: formData.reservation_date,
                    reservation_time: e.target.value,
                    people: formData.people,
                })}
            />
            <label># of People in Party</label>
            <input 
                name="People"
                placeholder="# of People in Party"
                type="text"
                required={true}
                value={formData.people}
                onChange={(e) => setFormData({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    mobile_number: formData.mobile_number,
                    reservation_date: formData.reservation_date,
                    reservation_time: formData.reservation_time,
                    people: e.target.value,
                })}
            />
            <div>
                <button type="cancel" onClick={handleCancel}>Cancel</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
    )
}