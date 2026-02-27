import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WeekComp from '../routeComponents/WeekComp'
import TodayComp from '../routeComponents/TodayComp'

function Routings () {
  return (
    <Routes>
      <Route path='/' element={<WeekComp />} />
      <Route path='/today' element={<TodayComp />} />

    </Routes>
  )
}


export default Routings
