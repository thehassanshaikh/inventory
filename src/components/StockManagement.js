import React, { useState, useEffect } from 'react';
import { db, doc, getDoc, setStock, Timestamp } from '../firebase';

const StockManagement = () => {
  const [stocks, setStocks] = useState({});
  const [newStock, setNewStock] = useState({});

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const stockItems = ['mouse', 'monitor']; // List all your stock items here
        const stockData = {};

        for (const item of stockItems) {
          const stockDoc = await getDoc(doc(db, 'stockInventory', item));
          if (stockDoc.exists()) {
            stockData[item] = stockDoc.data();
          } else {
            stockData[item] = { totalStock: 0, availableStock: 0 }; // Default values
          }
        }

        setStocks(stockData);
      } catch (error) {
        console.error("Error fetching stock data: ", error);
      }
    };

    fetchStockData();
  }, []);

  const handleChange = (item, e) => {
    setNewStock({ ...newStock, [item]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const [item, quantity] of Object.entries(newStock)) {
        await setStock(item, parseInt(quantity, 10));
      }
      alert('Stock updated successfully!');
    } catch (error) {
      console.error("Error updating stock: ", error);
    }
  };

  return (
    <div>
      <h2>Stock Management</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(stocks).map(item => (
          <div key={item}>
            <label>
              {item.charAt(0).toUpperCase() + item.slice(1)} Stock:
              <input
                type="number"
                value={newStock[item] || stocks[item]?.totalStock || 0}
                onChange={(e) => handleChange(item, e)}
              />
            </label>
          </div>
        ))}
        <button type="submit">Update Stock</button>
      </form>
    </div>
  );
};

export default StockManagement;
