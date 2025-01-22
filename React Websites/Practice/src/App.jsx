import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Counter from './components/Counter'
import Table from './components/Table'

function App() {
  let employeeList = [{
    'name' : 'Aniruddha',
    'email' : 'ramaneaniruddh22@gmail.com',
    'department' : 'HR',
    'id' : 1
  }, {
    'name' : 'Snehal',
    'email' : 'snehal@gmail.com',
    'department' : 'IT',
    'id' : 2
  }];

  let studentList = [{
    'name' : 'Ani',
    'email' : 'ramaneani@gmail.com',
    'department' : 'BE IT',
    'id' : 101,
    'house' : 'blue'
  }, {
    'name' : 'Sneha',
    'email' : 'sneha@gmail.com',
    'department' : 'BE CSE',
    'id' : 102,
    'house' : 'red'
  }];
  return (
    <>
      <Navbar />
      <Counter />
      <Table list = {employeeList}/>
      <Table list = {studentList}/>
    </>
  )
}

export default App
