import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WeekComp from '../Components/WeekComp'

function Routings () {
  return (
    <Routes>
      <Route path='/' element={<WeekComp />} />
    </Routes>
  )
}


export default Routings
