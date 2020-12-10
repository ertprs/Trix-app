import React from "react";

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="burger-icon">
        <span>&#9776;</span>
      </div>
      <div className="cash-btn">
        <button className="btn btn-outline">Cashout</button>
      </div>
    </nav>
  );
};

export default Nav;
