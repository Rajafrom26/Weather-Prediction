import React from "react";
import PredictionComp from "./Components/weatherApp/PredictionComp.jsx";
import '../src/index.css'
import '../src/responsive.css'
import { Toaster } from "sonner";


function App() {

  return(
    <>
    <PredictionComp />
    <Toaster position="top-center" richColors />
    </>
  )
}

export default App;
