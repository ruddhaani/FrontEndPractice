import React from 'react'

function Table({employees}) {

  let arr = [];

  for (let key in employees[0]){
    arr.push(key)
  }

  return (
    <table>
        {/* <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Salary</th>
        </tr> */}
        
        {/* {employees.map((employee) => {
            return (
              <tr>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.salary}</td>
              </tr>
            );
        })} */}

        <tr>
        {
          arr.map((keyValue) => {
            return (
              <th>{keyValue}</th>
            )
          })
        }
        </tr>

        {employees.map((employee) => (
                  
                      <tr>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.salary}</td>
                      </tr>
      
                ))}
    </table>
  )
}

export default Table