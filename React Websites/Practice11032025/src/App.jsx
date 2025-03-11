import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout'
import { BrowserRouter } from 'react-router'
import Home from './components/Home'
import Stopwatch from './components/Stopwatch'

function App() {

  return (
    <>
     <Home></Home>
     <Stopwatch></Stopwatch>
    </>
  )
}

export default App
