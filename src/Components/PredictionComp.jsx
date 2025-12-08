import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { myState } from "./SearchContext";
import icons from "../../public/icons/icons";
import { Link } from "react-router-dom";
import Routings from "../Routings/Routings";
import { myContext } from "./Contexts";

const PredictionComp = () => {

    const inputRef = useRef(null)    


  const [
    city,
    setCity,
    currentTime,
    weekName,
    details,
    setDetails,
    Hour,
    unit,
    setUnit,
  ] = useContext(myState);

  const [aqi, humidity, uvindex, visibility, convertTemp] =
    useContext(myContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  try {
    const { data } = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`
    );
    setDetails(data);
    if(inputRef.current) {
      inputRef.current.value = "" ;
    }
  } catch (error) {
    console.log(error);
    alert(`Could not find weather data for "${city}". Please check the spelling.`);
    if(inputRef.current) {
      inputRef.current.value = "" ;
    }
  }
};
  const condition = details?.currentConditions?.icon;
  const weatherData = icons[condition] || icons["default"];

  return (
    <div
      className="container-fluid"
      style={{ backgroundImage: `url(${weatherData.background})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-3 dev-design">
            <input
              type="text"
              name="city"
              placeholder="Type city here"
              ref={inputRef}
              onChange={(e) => setCity(e.target.value)}
              className="form-control ms-3 p-2"
            />
            <button
              className="btn btn-primary btn-dev"
              onClick={fetchData}
            ></button>

            {details && (
              <div className="details-design">
                <img
                  src={weatherData.icon}
                  alt={condition}
                  className="img-icon"
                />
                <h1>{convertTemp(details.currentConditions?.temp, unit)}</h1>
                <h6>
                  {weekName} {currentTime}
                </h6>
                <hr />
                <span className="text-design d-grid justify-content-center text-black">
                  <p>{details.currentConditions?.conditions}</p>
                  <p>perc : {details.currentConditions?.precip || "Null"}</p>
                </span>
                <footer className="adress">{details.resolvedAddress}</footer>
              </div>
            )}
          </div>
          <div className="contain col-lg-9 bg-body-tertiary">
            <nav className="row navbar">
              <div className="col-md-9 medium">
                <Link to="/today" className="today-nav">
                  Today
                </Link>
                <Link to="/" className="week-nav">
                  Week
                </Link>
              </div>
              <div className="col-md-3 medium">
                <button
                  className={`btn-nav me-2 ${
                    unit === "C" ? "btn-dark" : "btn-outline-primary"
                  }`}
                  onClick={() => setUnit("C")}
                >
                  °C
                </button>

                <button
                  className={`btn-nav ${
                    unit === "F" ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setUnit("F")}
                >
                  °F
                </button>
              </div>
              <Routings />
            </nav>

            <h4 className="mt-5 ms-1">Today's Highlights</h4>
            <div className="row">
              <div className="col-lg-4">
                <div className="card-des">
                  <h6>UVIndex</h6>
                  <h2 className="text-center">
                    {details?.currentConditions?.uvindex}
                  </h2>
                  <p>{uvindex(details?.currentConditions?.uvindex)}</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card-des">
                  <h6>wind status</h6>
                  <h2 className="text-center">
                    {details?.currentConditions?.windspeed}
                  </h2>
                  <p>km/h</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card-des">
                  <h6>Sunrise&sunset</h6>
                  <h2 className="text-center">
                    {Hour(details?.currentConditions?.sunset)}
                  </h2>
                  <p>{Hour(details?.currentConditions?.sunrise)}</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card-des">
                  <h6>Humidity</h6>
                  <h2 className="text-center">
                    {details?.currentConditions?.humidity}
                  </h2>
                  <p>{humidity(details?.currentConditions?.humidity)}</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card-des">
                  <h6>Visibility</h6>
                  <h2 className="text-center">
                    {details?.currentConditions?.visibility}
                  </h2>
                  <p>{visibility(details?.currentConditions?.visibility)}</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card-des">
                  <h6>AirQuality</h6>
                  <h2 className="text-center">
                    {details?.currentConditions?.feelslike}
                  </h2>
                  <p>{aqi(details?.currentConditions?.feelslike)}</p>
                </div>
              </div>
            </div>
            <footer className="d-flex justify-content-center mt-4">
              Weather Predicted app by @rajkumar puli
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionComp;
