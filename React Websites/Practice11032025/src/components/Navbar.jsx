import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = ({setAllowAcces}) => {
    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li onClick={() => setAllowAcces(true)}><Link to="/stopwatch">Stopwatch</Link></li>
            </ul>
        </div>
    )
}

export default Navbar