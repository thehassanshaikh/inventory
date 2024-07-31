import React from 'react';
import HardwareForm from './components/HardwareForm';
import HardwareTable from './components/HardwareTable';

function App() {
  return (
    <div className="App">
      <h1>Hardware Management System</h1>
      <HardwareForm />
      <HardwareTable />
    </div>
  );
}

export default App;
