let employees = [];

let baseUrl = `http://localhost:5150/api/employee/`;

let totalPages = 0;

let containerElement = document.getElementById("container");

async function LoadEmployeeData(searchText = null , pageNumber = 1 , pageSize = 2) {
    try {
        const queryParams = new URLSearchParams({
            PageNumber : pageNumber,
            pageSize : pageSize
        })

        if(searchText) {
            queryParams.append("SearchText" , searchText);
        }
        const response = await fetch(`${baseUrl}?${queryParams.toString()}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch Employee: ${response.status}`);
        }

        employees = await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function updateEmployeeInDB(employeeId , name , department , salary){
    try {
        const response = await fetch(`${baseUrl}` , {
            method :'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                EmployeeId : employeeId,
                Name : name,
                Department : department,
                Salary : salary
            })
        });

        if(!response.ok){
            console.log(response.status);
        }
    } catch (error) {
        console.log(error);
    }
}

// updateEmployeeInDB(3 , "Ani" , "ds" , 3343);

async function DeleteEmployeeFromDb(id){
    try {
        let employeeId = Number(id);
        const response = await fetch(`${baseUrl}?id=${employeeId}` , {
            method : 'DELETE'
        });


        if(!response.ok){
            console.log(response.status);
        }
    } catch (error) {
        console.log(error)
    }
}

async function addEmployeeToDB(name , department , salary){
    try {
        const response = await fetch(`${baseUrl}` , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                Name : name,
                Department : department,
                Salary : salary
            })
        });

        const data = await response.json();
    } catch (error) {
        console.log(error);
    }
}

// addEmployee("Aniii" , "IDGAF" , 100000);

async function ShowEmployees(searchText = null, id = -1, index = -1, pageNumber = 1, pageSize = 10) {
    await LoadEmployeeData(searchText , pageNumber , pageSize);

    containerElement.innerHTML = "";
    let tableElement = document.createElement("table");
    tableElement.innerHTML = `
        <tr>
        <th>Employee Id</th>
        <th>Name</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Actions</th>
        </tr>
    `;

    for (i in employees){
        let employee = employees[i];

        if(id >= 0  && employee.employeeId != id){
            continue;
        }

        let employeeTR = document.createElement("tr");

        employeeTR.innerHTML = `
            <td>${employee.employeeId}</td>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td><button onclick="DeleteEmployee(${employee.employeeId})">Delete</button> <button>Update</button></td>
        `

        tableElement.appendChild(employeeTR);
    }

    containerElement.appendChild(tableElement);
}

async function addEmployee() {
    name = document.getElementById("name").value;
    department = document.getElementById("department").value;
    salary = document.getElementById("salary").value;

    await addEmployeeToDB(name , department , salary);

    await ShowEmployees();
}

async function DeleteEmployee(id){
    let employeeId = Number(id)
    await DeleteEmployeeFromDb(employeeId);
    await ShowEmployees();
}


async function UpdateEmployee(flag , id , index){
    if(flag == 0){
        ShowEmployees("" , -1 , index);
    }
}

ShowEmployees();

