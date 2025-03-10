import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout'
import { BrowserRouter } from 'react-router'

function App() {

  return (
    <>
     <BrowserRouter>
      <Layout></Layout>
     </BrowserRouter>
    </>
  )
}

export default App
