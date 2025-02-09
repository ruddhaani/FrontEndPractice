import React, { useEffect, useState } from 'react'

const EmployeeTable = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [searchText, setSearchText] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    let pagesArray = [];
    for (let i = 1; i <= totalPages; i++) {
        pagesArray.push(i);
    }
    const [totalCount, setTotalCount] = useState(0);
    const [addEmployeeData, setAddEmployeeData] = useState({
        "name": "",
        "email": "",
        "salary": 0,
    });
    const [updateEmployeeId, setUpdateEmployeeId] = useState(-1);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateEmployeeData, setUpdateEmployeeData] = useState({
        "name": "",
        "email": "",
        "salary": 0,
    });

    useEffect(() => {
        loadData();
    }, [pageNumber , searchText])

    async function loadData() {
        let baseUrl = `http://localhost:5248/api/Employee?PageNumber=${pageNumber}&PageSize=${pageSize}`;

        if (searchText != null) {
            baseUrl = `http://localhost:5248/api/Employee?PageNumber=${pageNumber}&PageSize=${pageSize}&SearchText=${searchText}`;
        }

        const response = await fetch(baseUrl);

        if (response.ok) {
            let data = await response.json();

            setTotalCount(await response.headers.get('X-Total-Count'));
            setTotalPages(await response.headers.get('X-Total-Pages'));
            setEmployeeList(data);
        }
    }

    function handleAddChanges(event) {
        event.preventDefault();
        setAddEmployeeData({ ...addEmployeeData, [event.target.name]: event.target.value });
    }

    async function handleAddData(event) {
        event.preventDefault();
        const response = await fetch(`http://localhost:5248/api/Employee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addEmployeeData),
        });

        if (response.ok) {
            await loadData();
            setAddEmployeeData({
                "name": "",
                "email": "",
                "salary": 0
            });
        }
    }

    async function handleDeleteData(id) {
        const response = await fetch(`http://localhost:5248/api/Employee/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            await loadData();
        }

        if (((((totalCount) - (pageNumber - 1) * pageSize)) == 1) && pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

    function handleUpdateChanges(event) {
        setUpdateEmployeeData({ ...updateEmployeeData, [event.target.name]: event.target.value });
        console.log(updateEmployeeData);
    }

    async function handleUpdateData(id) {
        const response = await fetch(`http://localhost:5248/api/Employee/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateEmployeeData),
        });

        if (response.ok) {
            await loadData();
            setIsUpdating(false);
            setUpdateEmployeeId(-1);
            setUpdateEmployeeData({
                "name": "",
                "email": "",
                "salary": 0,
            });
        }
    }

    function handleSearch(event){
        setSearchText(event.target.value);
    }

    return (
        <>
            <div>
                <h1>Employee Details</h1>
            </div>
            <br />

            <div>
                <h4>SearchText</h4>
                <input type="text" placeholder='enter text to search' onChange={handleSearch} />
            </div>

            <div>
                <h3>Create Employee</h3>
                <form action="">
                    <input type="text" name='name' value={addEmployeeData.name} placeholder='Enter name....' onChange={handleAddChanges} />
                    <br />
                    <input type="email" name='email' value={addEmployeeData.email} placeholder='Enter email...' onChange={handleAddChanges} />
                    <br />
                    <input type="number" name='salary' value={addEmployeeData.salary} onChange={handleAddChanges} />
                    <br />
                    <button onClick={handleAddData}>Add Employee</button>
                </form>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Salary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employeeList.map((emp) => {
                                let condition = isUpdating && updateEmployeeId == emp.id;
                                return (
                                    <tr>
                                        <td>{emp.id}</td>
                                        {condition ? <td><input type="text" name="name" id="name" value={updateEmployeeData.name} onChange={handleUpdateChanges} /></td> : <td>{emp.name}</td>}
                                        {condition ? <td><input type="email" name="email" id="email" value={updateEmployeeData.email} onChange={handleUpdateChanges} /></td> : <td>{emp.email}</td>}
                                        {condition ? <td><input type="number" name="salary" id="salary" value={updateEmployeeData.salary} onChange={handleUpdateChanges} /></td> : <td>{emp.salary}</td>}
                                        <td>{condition ? <button onClick={() => {
                                            handleUpdateData(emp.id);
                                        }}>Update</button> : <button onClick={() => {
                                            setIsUpdating(true);
                                            setUpdateEmployeeId(emp.id);
                                            setUpdateEmployeeData({
                                                "name": emp.name,
                                                "email": emp.email,
                                                "salary": emp.salary,
                                            })
                                        }}>Update</button>}

                                            <button onClick={() => {
                                                handleDeleteData(emp.id);
                                            }}>Delete</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div>
                {
                    pagesArray.map((page) => {
                        return (
                            <button onClick={
                                () => setPageNumber(page)
                            }>{page}</button>
                        )
                    })
                }
            </div>
        </>
    )
}

export default EmployeeTable