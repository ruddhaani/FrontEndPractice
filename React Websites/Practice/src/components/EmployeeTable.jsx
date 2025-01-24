import React, { useEffect, useState } from "react";

const EmployeeTable = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const [totalCount, setTotalCount] = useState(0);
  const [createStudentFormData, setCreateStudentFormData] = useState({
    name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(pageNumber = 1 , pageSize = 2) {
    try {
      const response = await fetch(
        `http://localhost:5152/api/Student?PageNumber=${pageNumber}&PageSize=${pageSize}`
      );
      const paginatedData = await response.json();
      setEmployeeList(paginatedData);
      setTotalPages(response.headers.get("X-Total-Pages"));
      setTotalCount(response.headers.get("X-Total-Count"));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  let paginationArray = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationArray.push(i);
  }

  async function handleSubmit(e){
    e.preventDefault();
    const response = await fetch('http://localhost:5152/api/Student' , {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(createStudentFormData)
    })

    if(!response.ok){
      console.log(response.status);
    }

    await fetchData(pageNumber);
  }

  function handleChange(e){
    setCreateStudentFormData({...createStudentFormData, [e.target.name] : e.target.value})
  }

  async function deleteStudent(studentId) {
    const response = await fetch(`http://localhost:5152/api/Student/${studentId}` , {
      method : 'DELETE',
    })

    if(!response.ok){
      console.log(response.status);
    }

    
    fetchData(pageNumber);
  }

  async function handlePageChange(e){
      console.log(e.target.innerText);
      await fetchData(e.target.innerText);
      setPageNumber(e.target.innerText);
  }

  return (
    <div>
      <div>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              id="studentName"
              placeholder="Name"
              onChange={handleChange}
            />
          </div>
          <div>
            <input type="email" name="email" id="studentEmail" placeholder="Email" onChange={handleChange} />
          </div>
          <div>
            <input
              type="text"
              name="department"
              id="studentDepartment"
              placeholder="Department"
              onChange={handleChange}
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
                <button>Update</button> <button onClick={()=>{
                  deleteStudent(employee.studentId)
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {paginationArray.map((page) => {
          return <button onClick={handlePageChange}>{page}</button>;
        })}
      </div>
    </div>
  );
};

export default EmployeeTable;
