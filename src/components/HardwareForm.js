import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

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
    status: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = Timestamp.fromDate(new Date());
    try {
      await addDoc(collection(db, 'hardwareAssignments'), {
        ...formData,
        timestamp
      });
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
        status: ''
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
      <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
      <input type="text" name="ticketNumber" placeholder="Ticket Number" value={formData.ticketNumber} onChange={handleChange} required />
      <input type="text" name="equipment" placeholder="Equipment" value={formData.equipment} onChange={handleChange} required />
      <input type="text" name="optionalEquipment" placeholder="Optional Equipment" value={formData.optionalEquipment} onChange={handleChange} />
      <input type="text" name="serialNumber" placeholder="Serial Number" value={formData.serialNumber} onChange={handleChange} required />
      <input type="date" name="dateOfAssigning" placeholder="Date of Assigning" value={formData.dateOfAssigning} onChange={handleChange} required />
      <input type="text" name="assignedBy" placeholder="Assigned By" value={formData.assignedBy} onChange={handleChange} required />
      <input type="text" name="hardwareModel" placeholder="Hardware Model" value={formData.hardwareModel} onChange={handleChange} required />
      <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
      <input type="text" name="team" placeholder="Team" value={formData.team} onChange={handleChange} required />
      <input type="text" name="statusCondition" placeholder="Status Condition" value={formData.statusCondition} onChange={handleChange} required />
      <input type="text" name="status" placeholder="Status" value={formData.status} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default HardwareForm;
