import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';

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
    status: 'Working'
  });

  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);

  useEffect(() => {
    const fetchEquipmentOptions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'hardwareStock'));
        const products = querySnapshot.docs.map(doc => doc.data().product);
        const uniqueProducts = [...new Set(products)]; // Remove duplicates
        setEquipmentOptions(uniqueProducts);
      } catch (e) {
        console.error("Error fetching equipment options: ", e);
      }
    };

    fetchEquipmentOptions();
  }, []);

  useEffect(() => {
    if (formData.equipment) {
      const fetchModelOptions = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'hardwareStock'));
          const models = querySnapshot.docs
            .filter(doc => doc.data().product === formData.equipment)
            .map(doc => doc.data().modelName);
          const uniqueModels = [...new Set(models)]; // Remove duplicates
          setModelOptions(uniqueModels);
        } catch (e) {
          console.error("Error fetching model options: ", e);
        }
      };

      fetchModelOptions();
    } else {
      setModelOptions([]);
    }
  }, [formData.equipment]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = Timestamp.fromDate(new Date());

    try {
        // Add assignment to hardwareAssignments collection
        await addDoc(collection(db, 'hardwareAssignments'), {
            ...formData,
            timestamp
        });

        // Fetch current stock data for the selected product and model
        const stockSnapshot = await getDocs(collection(db, 'hardwareStock'));
        const stockDocs = stockSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const itemToUpdate = stockDocs.find(doc => doc.product === formData.equipment && doc.modelName === formData.hardwareModel);

        if (itemToUpdate) {
            const { id, inUse, available } = itemToUpdate;

            // Update stock counts
            const newInUse = inUse + 1;
            const newAvailableStock = available - 1;

            // Update the stock document in Firestore
            await updateDoc(doc(db, 'hardwareStock', id), {
                inUse: newInUse,
                available: newAvailableStock,
            });
        }

        // Clear form fields after submission
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
            status: 'Working'
        });
        setModelOptions([]);
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
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" id="firstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="mt-1 block w-full border-gray-200 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
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
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
            >
              <option value="">Select Location</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Philippines">Philippines</option>
            </select>
          </div>

          {/* <!-- Second Row --> */}
          <div>
            <label htmlFor="ticketNumber" className="block text-sm font-medium text-gray-700">Ticket Number</label>
            <input type="text" id="ticketNumber" name="ticketNumber" placeholder="Ticket Number" value={formData.ticketNumber} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="equipment" className="block text-sm font-medium text-gray-700">Equipment</label>
            <select
              id="equipment"
              name="equipment"
              value={formData.equipment}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
            >
              <option value="">Select Equipment</option>
              {equipmentOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="hardwareModel" className="block text-sm font-medium text-gray-700">Model Name</label>
            <select
              id="hardwareModel"
              name="hardwareModel"
              value={formData.hardwareModel}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
            >
              <option value="">Select Model</option>
              {modelOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label for="serialNumber" className="block text-sm font-medium text-gray-700">Serial Number</label>
            <input type="text" id="serialNumber" name="serialNumber" placeholder="Serial Number" value={formData.serialNumber} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm" />
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
            <label htmlFor="statusCondition" className="block text-sm font-medium text-gray-700">
              Status Condition
            </label>
            <select
              id="statusCondition"
              name="statusCondition"
              value={formData.statusCondition}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
            >
              <option value="">Select Status Condition</option>
              <option value="New">New</option>
              <option value="Old">Old</option>
              <option value="Borrowed">Borrowed</option>
            </select>
          </div>

        </div>

        <button className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HardwareForm;
