import React, { useContext, useEffect, useMemo, useState } from "react";
import myState from "../Contexts/myState";
import MyContext from "../Contexts/myContext";
import Routings from "../Routings/Routings";
import icons from "../../public/icons/icons";
import WeatherContext from "../Contexts/WeatherContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Weather_UI = () => {
  const inputRef = React.useRef(null);
  const [input, setInput] = useState("");
  const [, setCity, currentTime, weekName, details, , Hour, unit, setUnit] =
    useContext(myState);
  const [
    getAirQualityDescription,
    getHumidityDescription,
    getUVDescription,
    getVisibilityDescription,
    convertTemp,
  ] = useContext(MyContext);

  const [loading, , fetchData] = useContext(WeatherContext);

  const weatherData = useMemo(() => {
    const condition = details?.currentConditions?.icon;
    return icons[condition] || icons["default"];
  }, [details]);

  useEffect(() => {
  if (!loading && details) {
    setInput("");
  }
}, [loading, details]);

  return (
    <div
      className="container-fluid min-vh-100 d-flex flex-column"
      style={{ backgroundImage: `url(${weatherData.background})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-3 dev-design">
            <input
              type="text"
              placeholder="Type city here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!input.trim()) return;
                  setCity(input.trim());
                  fetchData();
                }
              }}
              className="form-control"
            />

            <button
              className="btn-dev"
              onClick={() => {
                if (!input.trim()) return;
                setCity(input.trim());
                fetchData();
              }}
              disabled={loading}
            >
              Search
            </button>

            {details && (
              <div className="details-design">
                <img
                  src={weatherData.icon}
                  alt={weatherData.condition}
                  className="img-icon"
                />
                <h1>{convertTemp(details.currentConditions?.temp, unit)}</h1>
                <h6>
                  {weekName} {currentTime}
                </h6>
                <hr />
                <span className="text-design d-grid justify-content-center text-black">
                  <p>{details.currentConditions?.conditions}</p>
                  <p>perc : {details.currentConditions?.precip ?? "Null"}</p>
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
                    unit === "C" ? "btn rounded-5 btn-dark" : "btn-light"
                  }`}
                  onClick={() => {
                    setUnit("C");
                    toast.info("Switched to Celsius");
                  }}
                >
                  °C
                </button>

                <button
                  onClick={() => {
                    setUnit("F");
                    toast.info("Switched to Fahrenheit");
                  }}
                  className={`btn-nav ${
                    unit === "F" ? "btn rounded-5 btn-dark" : "btn-light"
                  }`}
                >
                  °F
                </button>
              </div>

              <Routings />
            </nav>

            <h4 className="mt-5 ms-1">Today's Highlights</h4>

            <div className="row">
              {[
                {
                  title: "UV Index",
                  value: details?.currentConditions?.uvindex,
                  desc: getUVDescription(details?.currentConditions?.uvindex),
                },
                {
                  title: "Wind Status",
                  value: details?.currentConditions?.windspeed,
                  desc: "km/h",
                },
                {
                  title: "Sunset",
                  value: Hour(details?.currentConditions?.sunset),
                  desc: Hour(details?.currentConditions?.sunrise),
                },
                {
                  title: "Humidity",
                  value: details?.currentConditions?.humidity,
                  desc: getHumidityDescription(
                    details?.currentConditions?.humidity,
                  ),
                },
                {
                  title: "Visibility",
                  value: details?.currentConditions?.visibility,
                  desc: getVisibilityDescription(
                    details?.currentConditions?.visibility,
                  ),
                },
                {
                  title: "Air Quality",
                  value: details?.currentConditions?.feelslike,
                  desc: getAirQualityDescription(
                    details?.currentConditions?.feelslike,
                  ),
                },
              ].map((item, index) => (
                <div className="col-lg-4" key={index}>
                  <div className="card-des">
                    <h6>{item.title}</h6>
                    <h2 className="text-center">{item.value}</h2>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
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
export default Weather_UI;
