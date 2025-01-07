let empData = [
    {
        "name": "Aniruddha",
        "empId": 294,
        "department": "IT"
    },
    {
        "name": "Rahul",
        "empId": 224,
        "department": "HR"
    },
    {
        "name": "Sejal",
        "empId": 374,
        "department": "UI/UX"
    },
    {
        "name": "Anand",
        "empId": 122,
        "department": "Data Analytics"
    }
]



let empTable = document.getElementById("employeeDetails")



function showEmployees(index, searchText="" , pageNumber = 1 , pageSize = 2) {
    let tableRowRemovable = document.querySelectorAll(".tableData");
    tableRowRemovable.forEach((x) => x.remove());

    let filteredElementCount = empData.filter((x)=>x.name.toLowerCase().search(searchText.toLowerCase()) != -1).length;
    console.log(filteredElementCount);

    let fromIndex = (pageNumber - 1) * pageSize;
    let toIndex = Math.min(fromIndex + pageSize - 1, filteredElementCount - 1);

    let totalPages = Math.floor(filteredElementCount/pageSize);
    let count = -1;

    if(filteredElementCount % pageSize != 0){
        totalPages ++;
    }

    for (emp in empData) {

        let employee = empData[emp];
        if(employee.name.toLowerCase().search(searchText.toLowerCase()) == -1){
            continue;
        }

        count ++;

        if(!(count >= fromIndex && count <= toIndex)){
            continue;
        }

        let tableRow = document.createElement("tr");
        tableRow.classList.add("tableData");

        let tableDataString = `<td>${employee.name}</td>
                        <td>${employee.empId}</td>
                        <td>${employee.department}</td>
                        <td id="editButtons">
                            <button onclick="updateData(${emp} , 0 , '${searchText}' , ${pageNumber})">Update</button> <button onclick="deleteData(${emp} , '${searchText}' , ${pageNumber})">Delete</button>
                        </td>`

        if (index >= 0 && index < empData.length && index == emp) {
            let name = employee.name;
            let empId = employee.empId;
            let department = employee.department;
            tableDataString = `<td><input type="text" name="name" id="updatedName" value=${name}></td>
                        <td><input type="number" name="empId" id="updatedEmpId" value = ${empId}></td>
                        <td><input type="text" name="department" id="updatedDepartment" value="${department}"></td>
                        <td id="editButtons">
                            <button onclick="updateData(${emp} , 1 , '${searchText}' , ${pageNumber})">Update</button> <button onclick="deleteData(${emp} , '${searchText}' , ${pageNumber})">Delete</button>
                        </td>`
        }

        tableRow.innerHTML = tableDataString;
        empTable.appendChild(tableRow);
    }

    document.getElementById("pagination").innerHTML = "";
    for(let i = 1 ; i <= totalPages ; i++){
        let buttonElement = document.createElement("button");
        buttonElement.innerHTML = `${i}`;
        buttonElement.addEventListener('click' , getPage);
        document.getElementById("pagination").appendChild(buttonElement);
    }

}

//Show Employee Function call
showEmployees(-1 , "");


//Add Data function
function addData() {
    let name = document.getElementById("name").value;
    let empId = document.getElementById("empId").value;
    let department = document.getElementById("department").value;

    if(name != "" && empId != "" && department != ""){
        let newData = {
            "name": name,
            "empId": empId,
            "department": department
        }
    
        empData.push(newData);
    }else{
        alert("Cannot add empty Data");
    }
    

    showEmployees(-1);

    document.getElementById("name").value = "";
    document.getElementById("empId").value = "";
    document.getElementById("department").value = "";
}

//Delete Data Function

function deleteData(index , searchText , pageNumber) {
    empData.splice(index, 1);
    showEmployees(-1 , searchText , pageNumber);

    
}


//Update Data Function

function updateData(index, flag , searchText , pageNumber) {
    if(flag === 0){
        showEmployees(index , searchText , pageNumber);
    }else{
        let updatedName = document.getElementById("updatedName").value;
        let updatedEmpId = document.getElementById("updatedEmpId").value;
        let updatedDepartment = document.getElementById("updatedDepartment").value;

        empData[index].name = updatedName;
        empData[index].empId = updatedEmpId;
        empData[index].department = updatedDepartment;
        showEmployees(-1 , searchText , pageNumber);
    }
}

//Search Data function 

function searchData(){
    let input = document.getElementById("searchBox").value;

    showEmployees(-1 , input);
}

function getPage(event){
    let pageNumber = Number(event.target.textContent);
    showEmployees(-1,"", pageNumber)
}