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

      setProduct('');
      setQuantity('');
      setBrandName('');
      setModelName('');
      setLocation('');
      setWarrantyValid('');
      setComment('');

      const querySnapshot = await getDocs(collection(db, 'hardwareStock'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStockData(data);
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
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select Product</option>
              <option value="Mouse">Mouse</option>
              <option value="Monitor">Monitor</option>
              <option value="Keyboard">Keyboard</option>
              <option value="Headphone">Headphone</option>
              <option value="Camera">Camera</option>
              <option value="Others">Others</option>
            </select>
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
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Warranty Valid</label>
            <input
              type="text"
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
