import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SearchContext from "./useContexts/SearchContext.jsx";
import Contexts from "./useContexts/Contexts.jsx";
import WeatherData from "./useContexts/WeatherData.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SearchContext>
        <Contexts>
          <WeatherData>
            <App />
          </WeatherData>
        </Contexts>
      </SearchContext>
    </BrowserRouter>
  </StrictMode>,
);
