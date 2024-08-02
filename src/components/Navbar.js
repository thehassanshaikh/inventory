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
            exact
            className="text-gray-300 hover:text-white"
            activeClassName="text-white"
          >
            Form
          </NavLink>
          <NavLink
            to="/table"
            className="text-gray-300 hover:text-white"
            activeClassName="text-white"
          >
            Table
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
