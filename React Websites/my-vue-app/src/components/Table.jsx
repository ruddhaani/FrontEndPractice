import React from 'react'

function Table({employee2}) {
  return (
    <table>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Salary</th>
        </tr>
        <tr>
            <td>{employee2.id}</td>
            <td>{employee2.name}</td>
            <td>{employee2.email}</td>
            <td>{employee2.salary}</td>
        </tr>
    </table>
  )
}

export default Table