import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Container/Home'
import Records from '../Components/Records'
const index = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </div>
  )
}

export default index
