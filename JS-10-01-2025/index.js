let apiEndPoint = "http://localhost:5036/api/Employees/";

let containerElement = document.querySelector(".container");

async function getEmployees(){
    try {
        const response = await fetch(`${apiEndPoint}`);

        if(!response.ok){
            throw new Error(`Failed to fetch Employee: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
    }
}

// getEmployees();

const addEmployeeToDB = async ( name , email , salary)=> {
    try {
        const response = await fetch("http://localhost:5036/api/Employees" , {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json', 
            },
            body: JSON.stringify({
                Name : name,
                Email : email,
                Salary : salary
            })
        });
    
        if(!response.ok){
            throw new Error(`Error: ${response.status}`); 
        }
    
        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

//Delete Employee

async function deleteEmployeeFromDB(id){
    try {
        let employeeId = Number(id);
        const response = await fetch(`${apiEndPoint}${employeeId}`,{
            method: 'DELETE',
        });

        if(!response.ok){
            throw new Error(`error: ${response.status}`);
        }

        return await response;
    } catch (error) {
        console.log(error);
    }
}

async function addEmployee(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let salary = Number(document.getElementById("salary").value);

    if(name === "" || email === "" || salary <= 0){
        alert("Please add valid data");
        return;
    }

    await addEmployeeToDB(name , email , salary);
    showEmployees();
}

async function deleteEmployee(id) {
    let employeeId = Number(id);

    await deleteEmployeeFromDB(employeeId);
    await showEmployees();
}

async function showEmployees(){
    let employees = await getEmployees();

    containerElement.innerHTML = "";
    for(var emp in employees){
        let employee = employees[emp];

        let employeeList = document.createElement("div");
        employeeList.classList.add("EmployeeList")
        employeeList.innerHTML = `<ul>
                <li>Employee Id: ${employee.employeeId}</li>                
                <li>Name: ${employee.name}</li>
                <li>Email: ${employee.email}</li>
                <li>Salary: ${employee.salary}</li>
            </ul>
            <button onclick="deleteEmployee(${employee.employeeId})">Delete Employee</button>
            `

        containerElement.appendChild(employeeList);
        
    }
}

showEmployees();