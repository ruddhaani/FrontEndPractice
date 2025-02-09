import React, { useEffect, useState } from 'react'

const EmployeeTable = () => {

    const [employeeList, setEmployeeList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [searchText, setSearchText] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    let pagesArr = [];
    for (let i = 1; i <= totalPages; i++) {
        pagesArr.push(i);
    }
    const [totalCount, setTotalCount] = useState(0);
    const [addEmployee , setAddEmployee] = useState({
        "name" : "",
        "email" : "",
        "salary" : 0, 
    })
    const [updateEmployeeId , setUpdateEmployeeId] = useState(-1);
    const [isUpdating , setIsUpdating] = useState(false);
    const [updateEmployeeData , setUpdateEmployeeData] = useState({
        "name" : "",
        "email" : "",
        "salary" : 0
    });

    useEffect(() => {
        loadData();
    }, [pageNumber]);

    console.log(totalPages);
    async function loadData() {
        let baseUrl = `http://localhost:5248/api/Employee?PageNumber=${pageNumber}&PageSize=${pageSize}`;

        if (searchText != null) {
            baseUrl = `http://localhost:5248/api/Employee?PageNumber=${pageNumber}&PageSize=${pageSize}&SearchText=${searchText}`;
        }

        const response = await fetch(baseUrl);

        if (response.ok) {
            let data = await response.json();
            setEmployeeList(data);
            setTotalCount(await response.headers.get('X-Total-Count'));
            setTotalPages(await response.headers.get('X-Total-Pages'));
        }
    }

    function handleAddEmployeeChanges(event){
        event.preventDefault();
        setAddEmployee({...addEmployee , [event.target.name] : event.target.value});
        console.log(addEmployee);
    }

    async function handleDelete(id){
        const response = await fetch(`http://localhost:5248/api/Employee/${id}` , {
            method : 'DELETE'
        });

        if(response.ok){
            loadData();
        }

        if((((totalCount) - ((pageNumber - 1) * pageSize)) == 1) && pageNumber > 1){
            setPageNumber(pageNumber - 1);
        }
    }

    async function handleUpdateChanges(event) {
        setUpdateEmployeeData({...updateEmployeeData , [event.target.name] : event.target.value})
    }

    async function handleUpdate(id) {
        const response = await fetch(`http://localhost:5248/api/Employee/${id}` , {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(updateEmployeeData),
        });

        if(response.ok){
            await loadData();
            setIsUpdating(false);
            setUpdateEmployeeId(-1);
            setUpdateEmployeeData({
                "name" : "",
                "email" : "",
                "salary" : 0
            });
        }
    }

    async function handleAddEmployee(event){
        event.preventDefault();
        const response = await fetch(`http://localhost:5248/api/Employee` , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(addEmployee),
        });

        if(response.ok){
            await loadData();
        }
    }

    return (
        <>
            <div><h1>Employee Details</h1></div>
            <div>
                <h3>Create Employee</h3>
                <form action="">
                    <input type="text" name="name" id="name" placeholder='Enter name....' value={addEmployee.name} onChange={handleAddEmployeeChanges} onClick={handleUpdateChanges}/>
                    <br />
                    <input type="email" name="email" id="email" placeholder='Enter email....' value={addEmployee.email} onChange={handleAddEmployeeChanges} onClick={handleUpdateChanges}/>
                    <br />
                    <input type="number" name="salary" id="salary" placeholder='Enter salary....' value={addEmployee.salary} onChange={handleAddEmployeeChanges} onClick={handleUpdateChanges}/>
                    <br />
                    <button onClick={handleAddEmployee}>Add Employee</button>
                </form>
            </div>
            <br />
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
                            employeeList.map((employee) => {
                                let condition = employee.id == updateEmployeeId && isUpdating;
                                return (
                                    <tr>
                                        <td>{employee.id}</td>
                                        {condition ?<td><input type="text" value={updateEmployeeData.name} name='name' onChange={handleUpdateChanges}/></td> :<td>{employee.name}</td>}
                                        {condition ? <td><input type="email" value={updateEmployeeData.email} name='email' onChange={handleUpdateChanges}/></td> :<td>{employee.email}</td>}
                                        {condition ? <td><input type="number" value={updateEmployeeData.salary} name='salary' onChange={handleUpdateChanges}/></td> : <td>{employee.salary}</td>}
                                        <td>{condition?<button onClick={() => {
                                            handleUpdate(employee.id);
                                        }}>Update</button> :<button onClick={
                                            () => {
                                                setIsUpdating(true);
                                                setUpdateEmployeeId(employee.id);
                                                setUpdateEmployeeData({
                                                    "name" : employee.name,
                                                    "email" : employee.email,
                                                    "salary" : employee.salary,
                                                })
                                            }
                                        }>Update</button>}
                                        <button onClick={() => {
                                            handleDelete(employee.id)
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
                    pagesArr.map((page) => {
                        return (
                            <button onClick={() => setPageNumber(page)}>{page}</button>
                        )
                    })
                }
            </div>
        </>
    )
}

export default EmployeeTable