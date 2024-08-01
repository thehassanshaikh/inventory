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
    <div>
      {editing && currentData ? (
        <EditForm
          currentData={currentData}
          handleUpdate={handleUpdate}
          setEditing={setEditing}
        />
      ) : (
        <table>
          <thead>
            <tr>
              <th>TimeStamp</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Ticket Number</th>
              <th>Equipment</th>
              <th>Optional Equipment</th>
              <th>Serial Number</th>
              <th>Date of Assigning</th>
              <th>Assigned By</th>
              <th>Hardware Model</th>
              <th>Location</th>
              <th>Team</th>
              <th>Status Condition</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.timestamp.toDate().toLocaleString()}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.ticketNumber}</td>
                <td>{item.equipment}</td>
                <td>{item.optionalEquipment}</td>
                <td>{item.serialNumber}</td>
                <td>{item.dateOfAssigning}</td>
                <td>{item.assignedBy}</td>
                <td>{item.hardwareModel}</td>
                <td>{item.location}</td>
                <td>{item.team}</td>
                <td>{item.statusCondition}</td>
                <td>{item.status}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
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
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
      <input type="text" name="ticketNumber" value={formData.ticketNumber} onChange={handleChange} required />
      <input type="text" name="equipment" value={formData.equipment} onChange={handleChange} required />
      <input type="text" name="optionalEquipment" value={formData.optionalEquipment} onChange={handleChange} />
      <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} required />
      <input type="date" name="dateOfAssigning" value={formData.dateOfAssigning} onChange={handleChange} required />
      <input type="text" name="assignedBy" value={formData.assignedBy} onChange={handleChange} required />
      <input type="text" name="hardwareModel" value={formData.hardwareModel} onChange={handleChange} required />
      <input type="text" name="location" value={formData.location} onChange={handleChange} required />
      <input type="text" name="team" value={formData.team} onChange={handleChange} required />
      <input type="text" name="statusCondition" value={formData.statusCondition} onChange={handleChange} required />
      <input type="text" name="status" value={formData.status} onChange={handleChange} required />
      <button type="submit">Update</button>
      <button onClick={() => setEditing(false)}>Cancel</button>
    </form>
  );
};

export default HardwareTable;
