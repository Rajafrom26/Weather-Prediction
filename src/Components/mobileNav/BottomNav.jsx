import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { WiDaySunny } from "react-icons/wi";
import { FaCalendarWeek, FaSearch } from "react-icons/fa";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import myState from "../../Contexts/myState";

const BottomNav = ({ focusSearch }) => {
  const [, , , , , , , unit, setUnit] = useContext(myState);

  return (
    <nav className="glass-bottom-nav">
      <NavLink
        to="/today"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <WiDaySunny size={22} />
        <span>Today</span>
      </NavLink>

      <button
        className={`nav-item ${unit === "C" ? "active" : ""}`}
        onClick={() => setUnit("C")}
      >
        <TbTemperatureCelsius size={20} />
        <span>°C</span>
      </button>

      <button className="nav-item search-btn" onClick={focusSearch}>
        <FaSearch size={18} />
        <span>Search</span>
      </button>

      <NavLink
        to="/"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <FaCalendarWeek size={22} />
        <span>Week</span>
      </NavLink>

      <button
        className={`nav-item ${unit === "F" ? "active" : ""}`}
        onClick={() => setUnit("F")}
      >
        <TbTemperatureFahrenheit size={20} />
        <span>°F</span>
      </button>
    </nav>
  );
};

export default BottomNav;
