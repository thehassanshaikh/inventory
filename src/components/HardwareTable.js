import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const HardwareTable = () => {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'hardwareAssignments'));
        const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'hardwareAssignments', id));
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEdit = (item) => {
    setEditing(true);
    setCurrentData(item);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateDoc(doc(db, 'hardwareAssignments', id), updatedData);
      setData(data.map(item => (item.id === id ? { ...item, ...updatedData } : item)));
      setEditing(false);
      setCurrentData(null);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    // <div className="md:p-2 lg-p-4">
    <div className="overflow-x-auto p-4">
      {editing && currentData ? (
        <EditForm
          currentData={currentData}
          handleUpdate={handleUpdate}
          setEditing={setEditing}
        />
      ) : (
        <table className="min-w-full divide-y-2 divide-gray-200 bg-gray-50 text-sm p-2 rounded">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">TimeStamp</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">First Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Last Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Ticket Number</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Equipment</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Optional Equipment</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Serial Number</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date of Assigning</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Assigned By</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Hardware Model</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Location</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Team</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status Condition</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map(item => (
              <tr key={item.id}>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.timestamp.toDate().toLocaleString()}</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{item.firstName}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.lastName}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.ticketNumber}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.equipment}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.optionalEquipment}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.serialNumber}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.dateOfAssigning}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.assignedBy}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.hardwareModel}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.location}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.team}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.statusCondition}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.status}</td>
                <td>
                  <button className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 m-1" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 m-1" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    
  // </div>

  
  );
};

const EditForm = ({ currentData, handleUpdate, setEditing }) => {
  const [formData, setFormData] = useState(currentData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(currentData.id, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* <!-- First Row --> */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input type="text" id="firstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="team" className="block text-sm font-medium text-gray-700">Team</label>
          <input type="text" id="team" name="team" placeholder="Team" value={formData.team} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input type="text" id="location" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
        </div>

        {/* <!-- Second Row --> */}
        <div>
          <label htmlFor="ticketNumber" className="block text-sm font-medium text-gray-700">Ticket Number</label>
          <input type="text" id="ticketNumber" name="ticketNumber" placeholder="Ticket Number" value={formData.ticketNumber} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="equipment" className="block text-sm font-medium text-gray-700">Equipment</label>
          <input type="text" id="equipment" name="equipment" placeholder="Equipment" value={formData.equipment} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="optionalEquipment" className="block text-sm font-medium text-gray-700">Optional Equipment</label>
          <input type="text" id="optionalEquipment" name="optionalEquipment" placeholder="Optional Equipment" value={formData.optionalEquipment} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="hardwareModel" className="block text-sm font-medium text-gray-700">Hardware Model</label>
          <input type="text" id="hardwareModel" name="hardwareModel" placeholder="Hardware Model" value={formData.hardwareModel} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
        </div>

        {/* <!-- Third Row --> */}
        <div>
          <label htmlFor="dateOfAssigning" className="block text-sm font-medium text-gray-700">Date of Assigning</label>
          <input type="date" id="dateOfAssigning" name="dateOfAssigning" placeholder="Date of Assigning" value={formData.dateOfAssigning} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="assignedBy" className="block text-sm font-medium text-gray-700">Assigned By</label>
          <input type="text" id="assignedBy" name="assignedBy" placeholder="Assigned By" value={formData.assignedBy} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="statusCondition" className="block text-sm font-medium text-gray-700">Status Condition</label>
          <input type="text" id="statusCondition" name="statusCondition" placeholder="Status Condition" value={formData.statusCondition} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <input type="text" id="status" name="status" placeholder="Status" value={formData.status} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
        </div>
      </div>

      <div className="flex space-x-4">
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" type="submit">Update</button>
        <button type="button" onClick={() => setEditing(false)} className="bg-gray-600 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">Cancel</button>
      </div>
    </form>
  );
};

export default HardwareTable;
