import React, { useContext, useMemo } from "react";
import icons from "../../public/icons/icons";
import myState from "../Contexts/myState";
import myContext from "../Contexts/myContext";
const TodayComp = () => {
  const [, , , , details, , Hour, unit] = useContext(myState);
  const [, , , , convertTemp] = useContext(myContext);

  const hourlyData = useMemo(() => details?.days?.[0]?.hours || [], [details]);

  return (
    <div className="cards row m-4">
      {hourlyData.map((hour) => {
        const iconData = icons[hour.icon] || icons["default"];
        return (
          <div key={hour.datetime} className="hour-card col-lg-1">
            <p>{Hour(hour.datetime)}</p>
            <img src={iconData.icon} alt={hour.icon} />
            <p>{convertTemp(hour.temp, unit)}</p>
          </div>
        );
      })}
    </div>
  );
};
export default TodayComp;
