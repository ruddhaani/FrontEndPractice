import React, { useEffect, useState } from "react";

const StudentTable = () => {
  const [studentList, setStudentList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [updateStudentFlag, setUpdateStudentFlag] = useState(true);
  const [updateStudentId, setUpdateStudentId] = useState(-1);
  const [updateStudentData, setUpdateStudentData] = useState({
    name: "",
    email: "",
    department: "",
  });
  const [addStudentData, setAddStudentData] = useState({
    name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    getStudentData(pageNumber);
  }, []);

  useEffect(() => {
    getStudentData(pageNumber);
  }, [pageNumber]);

  let totalPagesArray = [];

  for (let i = 1; i <= totalPages; i++) {
    totalPagesArray.push(i);
  }

  async function getStudentData(pageNumber = 1) {
    try {
      const response = await fetch(
        `http://localhost:5152/api/Student?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );

      setTotalPages(response.headers.get("X-Total-Pages"));
      setTotalCount(response.headers.get("X-Total-Count"));
      let data = await response.json();
      setStudentList(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteStudent(studentId) {
    try {
      const response = await fetch(
        `http://localhost:5152/api/Student/${studentId}`,
        {
          method: "DELETE",
        }
      );

      // i had written this logic : (((totalCount - (pageNumber - 1) * pageSize) === 0) && (pageNumber > 1)) ? setPageNumber(pageNumber - 1) : setPageNumber(pageNumber) )

      getStudentData(pageNumber);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setAddStudentData({ ...addStudentData, [e.target.name]: e.target.value });
    console.log(addStudentData);
  }

  function handleUpdateChange(e) {
    setUpdateStudentData({
      ...updateStudentData,
      [e.target.name]: e.target.value,
    });
    console.log(updateStudentData);
  }

  async function handleUpdate(studentId) {
    try {
      const response = await fetch(
        `http://localhost:5152/api/Student/${studentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateStudentData),
        }
      );

      setUpdateStudentFlag(false);
      setUpdateStudentId(-1);
      setUpdateStudentData({
        name: "",
        email: "",
        department: "",
      });

      await getStudentData(pageNumber);

    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5152/api/Student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addStudentData),
      });

      if (!response.ok) {
        console.log(response.status);
      }

      await getStudentData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <form action="">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Enter name.."
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="email"
              placeholder="Enter email.."
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="department"
              placeholder="Enter department.."
              onChange={handleChange}
            />
          </div>

          <input type="submit" value="Submit" onClick={handleSubmit} />
        </form>
      </div>
      <div>
        <table>
          <tr>
            <th>Student Id</th>
            <th>Student Name</th>
            <th>Student Email</th>
            <th>Student Department</th>
            <th>Actions</th>
          </tr>

          {studentList.map((student) => {
            let updateCondition =
              updateStudentFlag && updateStudentId === student.studentId;
            return (
              <tr>
                <td>{student.studentId}</td>
                {updateCondition ? (
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={updateStudentData.name}
                      onChange={handleUpdateChange}
                    ></input>
                  </td>
                ) : (
                  <td>{student.name}</td>
                )}

                {updateCondition ? (
                  <td>
                    <input
                      type="text"
                      name="email"
                      value={updateStudentData.email}
                      onChange={handleUpdateChange}
                    ></input>
                  </td>
                ) : (
                  <td>{student.email}</td>
                )}
                {updateCondition ? (
                  <td>
                    <input
                      type="text"
                      name="department"
                      value={updateStudentData.department}
                      onChange={handleUpdateChange}
                    ></input>
                  </td>
                ) : (
                  <td>{student.department}</td>
                )}
                {
                  updateCondition ? <td><button onClick={() => {handleUpdate(student.studentId)}}> Update </button> <button
                  onClick={() => {
                    deleteStudent(student.studentId);
                  }}
                >
                  Delete
                </button></td> :  <td>
                  <button
                    onClick={() => {
                      setUpdateStudentFlag(true);
                      setUpdateStudentId(student.studentId);
                      setUpdateStudentData({
                        name: student.name,
                        email: student.email,
                        department: student.department,
                      });
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      deleteStudent(student.studentId);
                    }}
                  >
                    Delete
                  </button>
                </td>
                }
                
              </tr>
            );
          })}
        </table>
        <div>
          {totalPagesArray.map((i) => {
            return (
              <button
                onClick={() => {
                  setPageNumber(i);
                }}
              >
                {i}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default StudentTable;
