import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './assets/Navbar'
import Table from './components/Table'

function App() {
  // const [count, setCount] = useState(0)

  let employee1 = {
    "id" : 1,
    "name" : "Ani",
    "email" :  "ramaneaniruddh22@gmail.com",
    "salary" : 10000
  }

  let employee2 = {
    "id" : 2,
    "name" : "Snehal",
    "email" :  "snehal@gmail.com",
    "salary" : 10000
  }

  return (
    <>
    <Navbar />
    <Table employee = {employee1} employee2 = {employee2}/>
    </>
  )
}

export default App
