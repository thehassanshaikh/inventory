import React, { useState } from 'react';
import { addHardwareEntry, updateStock, Timestamp } from '../firebase'; // Import your custom functions

const HardwareForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    ticketNumber: '',
    equipment: '',
    optionalEquipment: '',
    serialNumber: '',
    dateOfAssigning: '',
    assignedBy: '',
    hardwareModel: '',
    location: '',
    team: '',
    statusCondition: '',
    status: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timestamp = Timestamp.fromDate(new Date());

    try {
      // Add new hardware entry to Firestore using your custom function
      await addHardwareEntry({ ...formData, timestamp });

      // Update stock levels (decrement by 1 for simplicity; adjust as needed)
      if (formData.equipment) {
        await updateStock(formData.equipment, -1); // Assuming decrement by 1
      }

      // Clear form data
      setFormData({
        firstName: '',
        lastName: '',
        ticketNumber: '',
        equipment: '',
        optionalEquipment: '',
        serialNumber: '',
        dateOfAssigning: '',
        assignedBy: '',
        hardwareModel: '',
        location: '',
        team: '',
        statusCondition: '',
        status: '',
      });

      alert('Hardware entry added and stock updated!');
    } catch (e) {
      console.error("Error adding document: ", e);
      alert('Error adding hardware entry!');
    }
  };

  return (
    <div>
      <h2>Add Hardware Entry</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Ticket Number:
          <input
            type="text"
            name="ticketNumber"
            value={formData.ticketNumber}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Equipment:
          <input
            type="text"
            name="equipment"
            value={formData.equipment}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Optional Equipment:
          <input
            type="text"
            name="optionalEquipment"
            value={formData.optionalEquipment}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Serial Number:
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Date of Assigning:
          <input
            type="date"
            name="dateOfAssigning"
            value={formData.dateOfAssigning}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Assigned By:
          <input
            type="text"
            name="assignedBy"
            value={formData.assignedBy}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Hardware Model:
          <input
            type="text"
            name="hardwareModel"
            value={formData.hardwareModel}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Team:
          <input
            type="text"
            name="team"
            value={formData.team}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Status Condition:
          <input
            type="text"
            name="statusCondition"
            value={formData.statusCondition}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HardwareForm;
