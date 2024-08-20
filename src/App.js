import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HardwareForm from './components/HardwareForm';
import HardwareTable from './components/HardwareTable';
import StockManagement from './components/StockManagement';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="flex justify-center min-h-screen bg-gray-200">
        <Routes>
          <Route path="/" element={<HardwareForm />} />
          <Route path="/table" element={<HardwareTable />} />
          <Route path="/stock-management" element={<StockManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
