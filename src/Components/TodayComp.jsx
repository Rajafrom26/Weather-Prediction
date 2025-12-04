import React, { useContext } from 'react';
import { myState } from './SearchContext';
import icons from "../../public/icons/icons";


const TodayComp = () => {
  const [, , , , details, , Hour] = useContext(myState);

  return (
    <div className='cards row m-4'>
      {details?.days?.[0]?.hours?.map((hour, i) => {
        const iconData = icons[hour.icon] || icons["default"];
        return (
          <div key={i} className='hour-card col-lg-1'>
            <p>{Hour(hour.datetime)}</p>
            <img src={iconData.icon} alt={hour.icon} />
            <p>{hour.temp}°</p>
          </div>
        );
      })}
    </div>
  );
};

export default TodayComp