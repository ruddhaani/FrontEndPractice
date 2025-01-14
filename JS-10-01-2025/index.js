let apiEndPoint = "http://localhost:5036/api/Employees/";

let containerElement = document.querySelector(".container");

async function getEmployees(searchText = null, pageNumber = 1, pageSize = 2) {
    try {
        const queryParams = new URLSearchParams({
            PageNumber: pageNumber,
            PageSize: pageSize,
        });

        if (searchText) {
            queryParams.append("SearchText", searchText);
        }

        const response = await fetch(`${apiEndPoint}?${queryParams.toString()}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch Employee: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}


async function getEmployeesById(id) {
    try {
        const response = await fetch(`${apiEndPoint}${id}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function updateEmployeeInDB(id, name, email, salary) {
    try {
        const response = await fetch(`${apiEndPoint}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: name,
                Email: email,
                Salary: salary
            })
        });

        if (!response.ok) {
            throw new Error(`Error : ${response.status}`);
        }

        return await response;
    } catch (error) {
        console.log(error);
    }
}


const addEmployeeToDB = async (name, email, salary) => {
    try {
        const response = await fetch("http://localhost:5036/api/Employees", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: name,
                Email: email,
                Salary: salary
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

//Delete Employee

async function deleteEmployeeFromDB(id) {
    try {
        let employeeId = Number(id);
        const response = await fetch(`${apiEndPoint}${employeeId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`error: ${response.status}`);
        }

        return await response;
    } catch (error) {
        console.log(error);
    }
}

async function addEmployee() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let salary = Number(document.getElementById("salary").value);

    if (name === "" && email === "" && salary <= 0) {
        alert("Please add valid data");
        return;
    }

    await addEmployeeToDB(name, email, salary);
    showEmployees();

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("salary").value = "";
}

async function deleteEmployee(id) {
    let employeeId = Number(id);

    await deleteEmployeeFromDB(employeeId);
    showEmployees();
}

async function showEmployees(searchText = null, id = -1, index = -1, pageNumber = 1, pageSize = 2) {
    let employees = await getEmployees(searchText, pageNumber, pageSize);

    containerElement.innerHTML = "";
    for (var emp in employees) {
        let employee = employees[emp];

        if (id > 0 && employee.employeeId != id) {
            continue;
        }

        let employeeList = document.createElement("div");
        employeeList.classList.add("EmployeeList");
        employeeList.innerHTML = `<ul>
                <li>Employee Id: ${employee.employeeId}</li>                
                <li>Name: ${employee.name}</li>
                <li>Email: ${employee.email}</li>
                <li>Salary: ${employee.salary}</li>
            </ul>
            <button onclick="deleteEmployee(${employee.employeeId})">Delete Employee</button>
            <br>
            <button onclick="updateEmployee(${emp}, 0, ${employee.employeeId})">Update Employee</button>
        `;

        if (index >= 0 && index < employees.length && index == emp) {
            employeeList.innerHTML = `<ul>
                <li>Employee Id: ${employee.employeeId}</li>                
                <li>Name: <input type="text" name="UpdatedName" id="UpdatedName" value="${employee.name}"></li>
                <li>Email: <input type="text" name="UpdatedEmail" id="UpdatedEmail" value="${employee.email}"></li>
                <li>Salary: <input type="text" name="UpdatedSalary" id="UpdatedSalary" value="${employee.salary}"></li>
            </ul>
            <button onclick="deleteEmployee(${employee.employeeId})">Delete Employee</button>
            <br>
            <button onclick="updateEmployee(${emp}, 1, ${employee.employeeId})">Update Employee</button>
        `;
        }

        containerElement.appendChild(employeeList);
    }
}

async function searchWithName() {
    let searchText = document.getElementById("search").value;

    showEmployees(searchText);

}

async function showEmployeeById() {
    let id = Number(document.getElementById('searchById').value);
    console.log(id);

    showEmployees("", id);

    document.getElementById('searchById').value = "";
}

async function updateEmployee(index, flag, id) {
    if (flag == 0) {
        await showEmployees("", -1, index);
        console.log(index);
    } else {
        let _name = document.getElementById("UpdatedName").value;
        let _email = document.getElementById("UpdatedEmail").value;
        let _salary = Number(document.getElementById("UpdatedSalary").value);

        await updateEmployeeInDB(id, _name, _email, _salary);
        showEmployees();
    }
}

showEmployees();