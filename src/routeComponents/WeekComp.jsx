import React, { useContext, useMemo } from "react";
import icons from "../../public/icons/icons.js";
import myContext from "../Contexts/myContext.jsx";
import myState from "../Contexts/myState.jsx";

const WeekComp = () => {
  const [, , , , details, , , unit] = useContext(myState);
  const [, , , , convertTemp] = useContext(myContext);

  const weekData = useMemo(() => details?.days?.slice(0, 7) || [], [details]);

  return (
    <div className="cards-week">
      {weekData.map((day) => {
        const iconData = icons[day.icon] || icons["default"];
        return (
          <div key={day.datetime} className="card-week">
            <h6>
              {new Date(day.datetime).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </h6>
            <img src={iconData.icon} alt={day.icon} className="img" />
            <p>{convertTemp(day.temp, unit)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default WeekComp;
