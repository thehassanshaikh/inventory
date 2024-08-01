import React, { useEffect, useState } from 'react';
import { db, doc, getDoc } from '../firebase';

const StockStatus = () => {
  const [stock, setStock] = useState({});

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const stockItems = ['mouse', 'monitor']; // List all your stock items here
        const stockData = {};

        for (const item of stockItems) {
          const stockDoc = await getDoc(doc(db, 'stockInventory', item));
          if (stockDoc.exists()) {
            stockData[item] = stockDoc.data();
          }
        }

        setStock(stockData);
      } catch (error) {
        console.error("Error fetching stock data: ", error);
      }
    };

    fetchStock();
  }, []);

  return (
    <div>
      <h2>Stock Status</h2>
      <ul>
        {Object.keys(stock).map(item => (
          <li key={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}: {stock[item]?.availableStock} available
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockStatus;
