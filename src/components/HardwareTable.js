import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const HardwareTable = () => {
  const [data, setData] = useState([]);

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

  return (
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HardwareTable;
