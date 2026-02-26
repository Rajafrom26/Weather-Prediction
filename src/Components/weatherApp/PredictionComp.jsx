import React, { useContext } from "react";
import Weather_UI from "../Weather_UI";
import WeatherLoader from "../WeatherLoader";
import WeatherContext from "../../Contexts/WeatherContext";
import { AnimatePresence, motion } from "framer-motion";

const PredictionComp = () => {

  const [loading,initialRender,,] = useContext(WeatherContext);

  const showLoader = loading && initialRender;


  return (
    <AnimatePresence mode="wait">
      {showLoader ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <WeatherLoader /> 
        </motion.div>
      ) : (
        <motion.div
          key="weather-ui"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Weather_UI />
        </motion.div>
      )}
    </AnimatePresence>
  )
};

export default PredictionComp;