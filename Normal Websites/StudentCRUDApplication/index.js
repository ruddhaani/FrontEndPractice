let students = [];
let totalPages = 0;

let baseUrl = "http://localhost:5152/api/Student";

let containerElement = document.getElementById("container");

async function LoadStudentsFromDb(searchText = null , pageNumber = 1 , pageSize = 2) {
    try {
        let queryParams = new URLSearchParams({
            PageNumber : pageNumber,
            PageSize : pageSize
        });

        if(searchText){
            queryParams.append("SearchText" , searchText);
        }

        const response = await fetch(`${baseUrl}?${queryParams}`);

        if(!response.ok){
            console.log(response.status);
        }

        students = await response.json();

        totalPages = await response.headers.get('X-Total-Pages');
        console.log(totalPages);
        console.log(students);
    } catch (error) {
        console.log(error);
    }
}

async function AddStudentInDb(name , email , department) {
    try {
        const response = await fetch(`${baseUrl}` , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                Name: name,
                Email: email,
                Department: department
            })
        });

        if(!response.ok){
            console.log(response.status);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}


async function DeleteStudentFromDb(id) {
    try {
        const response = await fetch(`${baseUrl}/${id}` , {
            method : 'DELETE'
        });

        if(!response.ok){
            console.log(response.status);
        }
    } catch (error) {
        console.log(error);
    }
}



async function UpdateStudentInDb(id , name , email ,department){
    try {
        const response = await fetch(`${baseUrl}` , {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                StudentId : id,
                Name : name,
                Email : email,
                Department : department
            })
        });

        if(!response.ok){
            console.log(response.status);
        }
    } catch (error) {
        console.log(error);
    }
}

async function ShowStudents(searchText = null , pageNumber = 1 , pageSize = 2 , id = -1) {

    containerElement.innerHTML = "";

    await LoadStudentsFromDb(searchText , pageNumber , pageSize);

    let tableElement = document.createElement("table");

    tableElement.innerHTML = `<tr>
            <th>Student Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
        </tr>`;

    for(i in students){
        let student = students[i];

        let tableRowElement = document.createElement("tr");
        let innerHTMLString = `<td>${student.studentId}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.department}</td>
            <td><button onclick="UpdateStudent(${searchText}, ${pageNumber} , ${pageSize} , 0 ,${student.studentId})">Update</button> <button onclick="DeleteStudent(${student.studentId})">Delete</button></td>`;

        if(id >= 0 && id == student.studentId){
            innerHTMLString = `<td><input type="number" name="updated-id" id="updated-id" value="${student.studentId}" readonly></td>
            <td><input type="text" name="updated-name" id="updated-name" value="${student.name}"></td>
            <td><input type="text" name="updated-email" id="updated-email" value="${student.email}"></td>
            <td><input type="text" name="updated-department" id="updated-department" value="${student.department}"></td>
            <td><button onclick="UpdateStudent(${searchText}, ${pageNumber} , ${pageSize} ,1,${student.studentId})">Update</button> <button onclick="DeleteStudent(${student.studentId})">Delete</button></td>`;
        }

        tableRowElement.innerHTML = innerHTMLString;

        tableElement.appendChild(tableRowElement);
    }

    containerElement.appendChild(tableElement);

    for(let i = 1 ; i<=totalPages ; i++){
        let button = document.createElement("button");
        button.innerText = i;

        button.addEventListener('click' , ()=>{
            ShowStudents(searchText , i , pageSize , id);
        })

        containerElement.appendChild(button);
    }
}

async function  DeleteStudent(id) {
    await DeleteStudentFromDb(id);
    await ShowStudents()
}

async function AddStudent() {
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    department = document.getElementById("department").value;

    await AddStudentInDb(name , email , department);
    await ShowStudents();
}

async function UpdateStudent(searchText , pageNumber , pageSize ,flag , id) {
    if(flag === 0){
        ShowStudents(searchText, pageNumber , pageSize , id);
    }else{
        let _name = document.getElementById("updated-name").value;
        let _email = document.getElementById("updated-email").value;
        let _department = document.getElementById("updated-department").value;

        await UpdateStudentInDb(id , _name , _email , _department);
        await ShowStudents(searchText , pageNumber , pageSize);
    }
}

ShowStudents();