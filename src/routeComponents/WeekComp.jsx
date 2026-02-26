import React, { useContext } from "react";
import icons from "../../public/icons/icons.js";
import myContext from "../Contexts/myContext.jsx";
import  myState  from "../Contexts/myState.jsx";

const WeekComp = () => {
  const [, , , , details, , , unit ] = useContext(myState);
  const [, , , , convertTemp] = useContext(myContext)

  return (
    <div className="row cards-week">
  {details?.days?.slice(0, 7).map((day, index) => {
    const iconData = icons[day.icon] || icons["default"];
    return (
      <div key={index} className="col-lg-1 card-week"> 
        <h6>{new Date(day.datetime).toLocaleDateString("en-US", { weekday: "short" })}</h6>
        <img src={iconData.icon} alt={day.icon} className="img" />
        <p>{convertTemp(day.temp, unit)}</p>
      </div>
    );
  })}
</div>
  );
};

export default WeekComp;
