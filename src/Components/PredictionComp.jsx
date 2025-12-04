import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { myState } from "./SearchContext";
import icons from "../../public/icons/icons";
import { Link } from "react-router-dom";
import Routings from "../Routings/Routings";

const PredictionComp = () => {
  const [city, setCity, currentTime, weekName, details, setDetails] =
    useContext(myState);

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
      <img src={weatherData.background} alt={condition} className="img-fluid" />
      <div className="contain">
        <div className="row">
          <div className="col-lg-3 dev-design position-relative">
            <input
              type="text"
              name="city"
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
                  <p>perc : {details.currentConditions?.precip || "Null"}</p>
                </span>
                <footer className="position-absolute bottom-0 p-3">
                  {details.resolvedAddress}
                </footer>
              </div>
            ) : (
              <h2>Enter Correct city: instead of {city}</h2>
            )}
          </div>
          <div className="container-lg col-lg-9 bg-body-tertiary position-relative">
            <Link to="/today">Today</Link>
            <Link to="/">Week</Link>
            {/* <Link to="/">°C</Link>
            <Link to="/fahrenheit">°F</Link> */}
            <Routings />

            <h4 className="mt-5 ms-1">Today's Highlights</h4>
            <div className="row">
              <div className="col-lg-4">
                <div className="card-des">
                  <h6>UVIndex</h6>
                  <h2 className="text-center">
                    {details?.currentConditions?.uvindex}
                  </h2>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card-des">
                  <h6>wind status</h6>
                  <h2 className="text-center">
                    {details?.currentConditions?.windspeed}
                  </h2>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card-des">
                  <h6>Sunrise&sunset</h6>
                  <h2 className="text-center">
                    {details?.currentConditions?.sunset}
                  </h2>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card-des">
                  <h6>Humidity</h6>
                  <h2 className="text-center">
                    {details?.currentConditions?.humidity}
                  </h2>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card-des">
                  <h6>Visibility</h6>
                  <h2 className="text-center">
                    {details?.currentConditions?.visibility}
                  </h2>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card-des">
                  <h6>AirQuality</h6>
                  <h2 className="text-center">
                    {details?.currentConditions?.feelslike}
                  </h2>
                </div>
              </div>
            </div>
            <footer className="d-flex justify-content-center mt-4">Weather Predicted app by @rajkumar puli</footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionComp;
