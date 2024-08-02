import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">Hardware Management</div>
        <div className="flex space-x-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) => 
              isActive ? 'text-white' : 'text-gray-300 hover:text-white'}
          >
            Form
          </NavLink>
          <NavLink
            to="/table"
            className={({ isActive }) => 
              isActive ? 'text-white' : 'text-gray-300 hover:text-white'}
          >
            Table
          </NavLink>
          <NavLink
            to="/stock-management"
            className={({ isActive }) => 
              isActive ? 'text-white' : 'text-gray-300 hover:text-white'}
          >
            Stock Management
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
