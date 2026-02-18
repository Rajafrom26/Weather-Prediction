import React, { useEffect, useState } from "react";
import  MyState  from "../Contexts/myState";



const SearchContext = ({ children }) => {
  const [weekName, setWeekName] = useState(
    new Date().toLocaleDateString("en-US", { weekday: "long" })
  );
  const [currentTime, setTime] = useState(new Date().toLocaleTimeString());
  const [query, setQuery] = useState("Bengaluru,KA");

  const [details, setDetails] = useState([]);

  const [unit, setUnit] = useState("C");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date().toLocaleTimeString();
      setTime(date.split(":").slice(0, 2).join(":"));
      const now = new Date().toLocaleDateString("en-US", { weekday: "long" });
      setWeekName(now);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const Hour = (timeString = "") => {
    if (!timeString || !timeString.includes(":")) return timeString;
    const [hour, minute] = timeString.split(":");
    let h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minute} ${ampm}`;
  };
  return (
    <MyState.Provider
      value={[
        query,
        setQuery,
        currentTime,
        weekName,
        details,
        setDetails,
        Hour,
        unit,
        setUnit
      ]}
    >
      {children}
    </MyState.Provider>
  );
};

export default SearchContext;
