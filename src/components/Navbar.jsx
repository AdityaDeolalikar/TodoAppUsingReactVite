import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between py-2 text-white bg-blue-800">
      <div className="logo">
        <span className="text-xl font-bold mx-9">Logo</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className="transition-all cursor-pointer duration-50 hover:font-bold">Home</li>
        <li className="transition-none cursor-pointer duration-50 hover:font-bold">Your Tasks</li>
      </ul>
    </nav>
  );
};

export default Navbar;
