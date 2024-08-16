import React from 'react';

const StockTable = ({ stockData }) => {
  return (
    <div className="w-full p-4">
      <h3 className="text-xl font-bold mb-4">Stock Information</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Product</th>
              <th className="py-2 px-4 border-b">Brand Name</th>
              <th className="py-2 px-4 border-b">Model Name</th>
              <th className="py-2 px-4 border-b">Warrenty Till</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Total Stock</th>
              <th className="py-2 px-4 border-b">In Use</th>
              <th className="py-2 px-4 border-b">Not Working</th>
              <th className="py-2 px-4 border-b">Available</th>
              <th className="py-2 px-4 border-b">Comment</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{new Date(item.timestamp.toDate()).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">{item.product}</td>
                <td className="py-2 px-4 border-b">{item.brandName}</td>
                <td className="py-2 px-4 border-b">{item.modelName}</td>
                <td className="py-2 px-4 border-b">{item.warrantyValid}</td>
                <td className="py-2 px-4 border-b">{item.location}</td>
                <td className="py-2 px-4 border-b">{item.totalStock}</td>
                <td className="py-2 px-4 border-b">{item.inUse}</td>
                <td className="py-2 px-4 border-b">{item.notWorking}</td>
                <td className="py-2 px-4 border-b">{item.available}</td>
                <td className="py-2 px-4 border-b">{item.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;
