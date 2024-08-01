import React from 'react';
import HardwareForm from './components/HardwareForm';
import HardwareTable from './components/HardwareTable';
import StockStatus from './components/StockStatus';
import StockManagement from './components/StockManagement';

function App() {
  return (
    <div>
      <StockStatus />
      <StockManagement />
      <HardwareForm />
      <HardwareTable />
    </div>
  );
}

export default App;
