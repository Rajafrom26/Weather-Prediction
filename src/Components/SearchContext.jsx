import React, { children, createContext, useEffect, useState } from "react";

export const myState = createContext();

const SearchContext = ({ children }) => {
  const [weekName, setWeekName] = useState(
    new Date().toLocaleDateString("en-US", { weekday: "long" })
  );
  const [currentTime, setTime] = useState(new Date().toLocaleTimeString());
  const [query, setQuery] = useState("Bengaluru,KA");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date().toLocaleTimeString();
      setTime(date.split(":").slice(0, 2).join(":"));
      const now = new Date().toLocaleDateString("en-US", { weekday: "long" });
      setWeekName(now);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <myState.Provider value={[query, setQuery, currentTime, weekName]}>
      {children}
    </myState.Provider>
  );
};

export default SearchContext;
