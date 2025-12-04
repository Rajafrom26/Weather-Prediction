import React, { useContext } from "react";
import { myState } from "./SearchContext";
import icons from "../../public/icons/icons";

const WeekComp = () => {
  const [, , , , details] = useContext(myState);

  return (
    <div className="card-row">
  {details?.days?.slice(0, 7).map((day, index) => {
    const iconData = icons[day.icon] || icons["default"];
    return (
      <div key={index} className="card text-center">
        <h6>{new Date(day.datetime).toLocaleDateString("en-US", { weekday: "short" })}</h6>
        <img src={iconData.icon} alt={day.icon} className="img" />
        <p>{day.temp}°C</p>
      </div>
    );
  })}
</div>
  );
};

export default WeekComp;
