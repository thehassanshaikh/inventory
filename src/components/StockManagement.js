import React, { useState, useEffect } from 'react';
import { db, Timestamp, addDoc, collection, getDocs } from '../firebase';
import StockTable from './StockTable';

const StockManagement = () => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [brandName, setBrandName] = useState('');
  const [modelName, setModelName] = useState('');
  const [location, setLocation] = useState('');
  const [warrantyValid, setWarrantyValid] = useState('');
  const [comment, setComment] = useState('');
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'hardwareStock'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStockData(data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the product already exists in the database
      const querySnapshot = await getDocs(collection(db, 'hardwareStock'));
      const existingProduct = querySnapshot.docs.find(doc => {
        const data = doc.data();
        return (
          data.product === product &&
          data.brandName === brandName &&
          data.location === location
        );
      });

      if (existingProduct) {
        alert('Product with the same Product, Brand Name, and Location already exists.');
        return; // Stop the function if the product already exists
      }

      // If the product doesn't exist, proceed to add it to the database
      await addDoc(collection(db, 'hardwareStock'), {
        timestamp: Timestamp.now(),
        product,
        quantity: parseInt(quantity, 10),
        brandName,
        modelName,
        location,
        warrantyValid,
        comment,
        totalStock: parseInt(quantity, 10),
        inUse: 0,
        notWorking: 0,
        available: parseInt(quantity, 10),
      });

      // Clear form fields
      setProduct('');
      setQuantity('');
      setBrandName('');
      setModelName('');
      setLocation('');
      setWarrantyValid('');
      setComment('');

      // Fetch updated stock data and update state
      const updatedSnapshot = await getDocs(collection(db, 'hardwareStock'));
      const updatedData = updatedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStockData(updatedData);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="max-w-full mx-auto bg-white p-8 rounded-lg shadow-md flex">
      <div className="w-1/2 pr-4">
        <h2 className="text-2xl font-bold mb-6">Manage Hardware Stock</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Product</label>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
              placeholder="Enter Product Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Brand Name</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Model Name / Number</label>
            <input
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select Location</option>
              <option value="Mouse">Mumbai</option>
              <option value="Monitor">Philippines</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Warranty Valid</label>
            <input
              type="date"
              value={warrantyValid}
              onChange={(e) => setWarrantyValid(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows="3"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="w-1/2 pl-4">
        <StockTable stockData={stockData} />
      </div>
    </div>
  );
};

export default StockManagement;
