import React, { useEffect, useState } from 'react';

const EmployeeTable = () => {
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5152/api/Student?PageNumber=1&PageSize=2");
        const paginatedData = await response.json();
        setEmployeeList(paginatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Student Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee) => (
            <tr key={employee.studentId}>
              <td>{employee.studentId}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
