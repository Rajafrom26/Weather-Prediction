import React, { useState, useEffect, useCallback, useContext, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import myState from "../Contexts/myState.jsx";
import WeatherContext from "../Contexts/WeatherContext.jsx";

const WeatherData = ({ children }) => {
  const [query,,,,,setDetails,,,,
  ] = useContext(myState);

  const [loading, setLoading] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  const fetchWeather = useCallback(async (cityParam = query) => {

    const loaderStart = Date.now();
    setLoading(true);

     let toastId;
    if (!initialRender) {
      toastId = toast.loading(`Fetching weather for ${cityParam}...`);
    }

    try {
      const { data } = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityParam}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`,
      );
      
      setDetails(data);
        if (!initialRender) {
        toast.success(`Weather updated for ${data.resolvedAddress}`, {
          id: toastId,
        });
      }

    } catch {
      if (toastId) {
        toast.error("City not found or network error", { id: toastId });
      } else {
        toast.error("Unable to fetch weather data");
      }
    } finally {
      if (initialRender) {
        const elapsed = Date.now() - loaderStart;
        const remaining = 5000 - elapsed;

        if (remaining > 0) {
          await new Promise(resolve => setTimeout(resolve, remaining));
        }
      }

      setLoading(false);
      setInitialRender(false);
    }
  }, [query, setDetails, initialRender]);

  // prevent duplicate network calls caused by StrictMode mounting twice
  const fetchedOnceRef = useRef(false);

  useEffect(() => {
    if (fetchedOnceRef.current) return;
    if (query) {
      fetchWeather();
      fetchedOnceRef.current = true;
    }
  }, [query, fetchWeather]);

  return (
    <WeatherContext.Provider
      value={[
        loading,
        initialRender,
        fetchWeather,
      ]}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherData;

// `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`,
//
