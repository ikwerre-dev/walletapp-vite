import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Splash from './pages/Splash'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />

    </Routes>
  )
}

export default App
