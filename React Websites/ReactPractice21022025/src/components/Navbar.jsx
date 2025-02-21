import React from 'react'
import { Link } from 'react-router'

export const Navbar = () => {
  return (
    <div>
        <div>
            <Link to="">Home</Link>
            <Link to="about">About</Link>
            <Link to="stopwatch">Stopwatch</Link>
            <Link to="counter">Counter</Link>

        </div>
    </div>
  )
}
