import React, { useEffect, useState } from "react";

const EmployeeTable = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [PageSize, setPageSize] = useState(2);
  const [totalCount, setTotalCount] = useState(0);
  const [createStudentFormData, setCreateStudentFormData] = useState({
    name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:5152/api/Student?PageNumber=1&PageSize=2"
        );
        const paginatedData = await response.json();
        setEmployeeList(paginatedData);
        setTotalPages(response.headers.get("X-Total-Pages"));
        setTotalCount(response.headers.get("X-Total-Count"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  let paginationArray = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationArray.push(i);
  }

  return (
    <div>
      <div>
        <br />
        <form action="">
          <div>
            <input
              type="text"
              name=""
              id="studentName"
              placeholder="Name"
              onChange={(event) => {
                setCreateStudentFormData({...createStudentFormData, 'name' : event.target.value});
                console.log(createStudentFormData);
              }}
            />
          </div>
          <div>
            <input type="email" name="" id="studentEmail" placeholder="Email" />
          </div>
          <div>
            <input
              type="text"
              name=""
              id="studentDepartment"
              placeholder="Department"
            />
          </div>
          <br />
          <input type="submit" value="Add Student" />
        </form>
        <br />
      </div>
      <hr />
      <br />
      <table>
        <thead>
          <tr>
            <th>Student Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee) => (
            <tr key={employee.studentId}>
              <td>{employee.studentId}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>
                <button>Update</button> <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {paginationArray.map((page) => {
          return <button>{page}</button>;
        })}
      </div>
    </div>
  );
};

export default EmployeeTable;
