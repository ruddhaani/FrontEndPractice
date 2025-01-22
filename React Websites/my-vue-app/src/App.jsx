import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './assets/Navbar'
import Table from './components/Table'
import Counter from './components/Counter'
import { Voting } from './components/Voting'

function App() {
  // const [count, setCount] = useState(0)

  let employeeList = [{
    "id" : 1,
    "name" : "Ani",
    "email" :  "ramaneaniruddh22@gmail.com",
    "salary" : 10000
  }, {
    "id" : 2,
    "name" : "Snehal",
    "email" :  "snehal@gmail.com",
    "salary" : 10000
  }];



  return (
    <>
    <Navbar />

    <Table employees={employeeList} />

    <Counter />
    <Voting />
    </>
  )
}

export default App
