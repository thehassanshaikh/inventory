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
    <div className='min-h-screen flex items-center'>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-4 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
          {/* <!-- First Row --> */}
          <div>
            <label for="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" id="firstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="mt-1 block w-full border-gray-200 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
          </div>
          <div>
            <label for="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
          </div>
          <div>
            <label for="team" className="block text-sm font-medium text-gray-700">Team</label>
            <input type="text" id="team" name="team" placeholder="Team" value={formData.team} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
          </div>
          <div>
            <label for="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" id="location" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
          </div>

          {/* <!-- Second Row --> */}
          <div>
            <label for="ticketNumber" className="block text-sm font-medium text-gray-700">Ticket Number</label>
            <input type="text" id="ticketNumber" name="ticketNumber" placeholder="Ticket Number" value={formData.ticketNumber} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
          </div>
          <div>
            <label for="equipment" className="block text-sm font-medium text-gray-700">Equipment</label>
            <input type="text" id="equipment" name="equipment" placeholder="Equipment" value={formData.equipment} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
          </div>
          <div>
            <label for="optionalEquipment" className="block text-sm font-medium text-gray-700">Optional Equipment</label>
            <input type="text" id="optionalEquipment" name="optionalEquipment" placeholder="Optional Equipment" value={formData.optionalEquipment} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
          </div>
          <div>
            <label for="serialNumber" className="block text-sm font-medium text-gray-700">Serial Number</label>
            <input type="text" id="serialNumber" name="serialNumber" placeholder="Serial Number" value={formData.serialNumber} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
          </div>
          <div>
            <label for="hardwareModel" className="block text-sm font-medium text-gray-700">Hardware Model</label>
            <input type="text" id="hardwareModel" name="hardwareModel" placeholder="Hardware Model" value={formData.hardwareModel} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
          </div>

          {/* <!-- Third Row --> */}
          <div>
            <label for="dateOfAssigning" className="block text-sm font-medium text-gray-700">Date of Assigning</label>
            <input type="date" id="dateOfAssigning" name="dateOfAssigning" placeholder="Date of Assigning" value={formData.dateOfAssigning} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
          </div>
          <div>
            <label for="assignedBy" className="block text-sm font-medium text-gray-700">Assigned By</label>
            <input type="text" id="assignedBy" name="assignedBy" placeholder="Assigned By" value={formData.assignedBy} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
          </div>
          <div>
            <label for="statusCondition" className="block text-sm font-medium text-gray-700">Status Condition</label>
            <input type="text" id="statusCondition" name="statusCondition" placeholder="Status Condition" value={formData.statusCondition} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
          </div>
          <div>
            <label for="status" className="block text-sm font-medium text-gray-700">Status</label>
            <input type="text" id="status" name="status" placeholder="Status" value={formData.status} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
          </div>
        </div>

        <button className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HardwareForm;
