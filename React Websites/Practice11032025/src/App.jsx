import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout'
import { BrowserRouter, createBrowserRouter } from 'react-router'
import Home from './components/Home'
import Stopwatch from './components/Stopwatch'
import { RouterProvider } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [allowAccess , setAllowAccess] = useState(false);

  let router = createBrowserRouter([
    {
      path: "/",
      element : <Layout />,
      children : [
        {
          path : "",
          element : <Home></Home>
        },
        {
          path : 'stopwatch',
          element : (
          <ProtectedRoute isAllowed={setAllowAccess}>
          <Stopwatch setAllowAccess={setAllowAccess}/>
          </ProtectedRoute>
          )
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
