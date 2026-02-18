import React from "react";
import  MyContext  from "../Contexts/myContext.jsx";

const Contexts = ({ children }) => {
  const getAirQualityDescription = (aqi) => {
    if (aqi === undefined || aqi === null) return "No data";
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  const getHumidityDescription = (humidity) => {
    if (humidity === undefined || humidity === null) return "No data";
    if (humidity < 30) return "Low";
    if (humidity <= 60) return "Comfortable";
    return "High";
  };
  const getUVDescription = (uv) => {
    if (uv === undefined || uv === null) return "No data";
    if (uv <= 2) return "Low";
    if (uv <= 5) return "Moderate";
    if (uv <= 7) return "High";
    if (uv <= 10) return "Very High";
    return "Extreme";
  };
  const getVisibilityDescription = (visibility) => {
    if (visibility === undefined || visibility === null) return "No data";
    if (visibility < 5) return "Low clarity";
    if (visibility <= 10) return "clear";
    return "Very good";
  };
  const convertTemp = (temp, unit) => {
  if (temp === undefined || temp === null) return "";
  if (unit === "C") return `${temp.toFixed(1)} °C`;
  return `${((temp * 9) / 5 + 32).toFixed(1)} °F`;
};
  return (
    <MyContext.Provider
      value={[
        getAirQualityDescription,
        getHumidityDescription,
        getUVDescription,
        getVisibilityDescription,
        convertTemp
      ]}
    >
      {children}
    </MyContext.Provider>
    
  );
};

export default Contexts;
