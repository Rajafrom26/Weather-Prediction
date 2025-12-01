import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { myState } from "./SearchContext";
import icons from "../../public/icons/icons";

const PredictionComp = () => {
  const [details, setDetails] = useState(null);
  const [city, setCity, currentTime, weekName] = useContext(myState);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`
    );
    setDetails(data);
  };

  const condition = details?.currentConditions?.icon;
  const weatherData = icons[condition] || icons["default"];

  return (
    
      <div className="container-fluid">
        <img
          src={weatherData.background}
          alt={condition}
          className="img-fluid"
        />
            <div className="contain">
              <div className="row">
                <div className="col-lg-3 dev-design position-relative">
                <input
                  type="text"
                  placeholder="Type city here"
                  onChange={(e) => setCity(e.target.value)}
                  className="form-control ms-3 p-2"
                />
                <button
                  className="btn btn-primary btn-dev"
                  onClick={fetchData}
                ></button>

                {details || details !== details ? (
                  <div className="details-design">
                    {/* <h4>Weather for {city}</h4> */}
                    <img
                      src={weatherData.icon}
                      alt={condition}
                      className="img-icon"
                    />
                    <h1>{details.currentConditions?.temp} °C</h1>
                    <h6>
                      {weekName} {currentTime}
                    </h6>
                    <hr />
                    <span className="text-design d-grid justify-content-center text-black">
                      <p>{details.currentConditions?.conditions}</p>
                      <p>
                        perc : {details.currentConditions?.precip || "Null"}
                      </p>
                    </span>
                    <footer className="position-absolute bottom-0 p-3">
                      {details.resolvedAddress}
                    </footer>
                  </div>
                ) : (
                  <h2>Enter Correct city: instead of {city}</h2>
                )}
                </div>
                <div className="col-lg-9 bg-body-tertiary">
                  <h1>Hello world</h1>
                </div>
              </div>
              </div>
            </div>
  );
};

export default PredictionComp;
