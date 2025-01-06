// let todoBoxElement = document.createElement("div");
// todoBoxElement.classList

let containerElement = document.querySelector(".container");

let toDoList = [
    {
        "task": "Complete C Homework.",
        "urgency": "Immediate"
    },
    {
        "task": "Complete C# Homework.",
        "urgency": "Immediate"
    },
]

let showToDoList = (index, searchText = "", pageNumber = 1, pageSize = 2) => {
    containerElement.innerHTML = "";

    let filteredElementCount = toDoList.filter((x) => x.task.toLowerCase().search(searchText.toLowerCase) == -1).length;
    console.log(filteredElementCount);

    let fromIndex = (pageNumber-1) * pageSize;
    let toIndex = Math.min(fromIndex + pageSize - 1 , filteredElementCount - 1);

    let totalPages = Math.floor(filteredElementCount / pageSize);
    let count = -1;

    if(filteredElementCount % pageSize != 0){
        totalPages ++;
    }

    for (let key in toDoList) {
        if (toDoList[key].task.toLowerCase().search(searchText.toLowerCase()) == -1) {
            continue;
        }

        count++;

        if(!(count >=fromIndex && count <=toIndex)){
            continue;
        }

        let todoBoxElement = document.createElement("div");
        todoBoxElement.classList.add("toDoBox");
        let innerHTMLString = `
            <div class="toDoContent">
                <h3>Task : ${toDoList[key].task}</h3>
                <h4>Urgency : ${toDoList[key].urgency}</h4>
            </div>
            <div class="toDoButtons">
                <button onclick="updateTask(${key}, 0 , ${pageNumber} , ${searchText})">Update</button>
                <button onclick="deleteTask(${key})">Delete</button>
            </div>
        `;

        if (index >= 0 && index < toDoList.length && index === parseInt(key)) {
            innerHTMLString = `
                <div class="toDoContent">
                    <h3>Task : <input type="text" id="updatedTask" value="${toDoList[key].task}"></h3>
                    <h4>Urgency : <input type="text" id="updatedUrgency" value="${toDoList[key].urgency}"></h4>
                </div>
                <div class="toDoButtons">
                    <button onclick="updateTask(${key}, 1 , ${pageNumber} , ${searchText})">Update</button>
                    <button onclick="deleteTask(${key})">Delete</button>
                </div>
            `;
        }

        todoBoxElement.innerHTML = innerHTMLString;
        containerElement.appendChild(todoBoxElement);
    }

    for(let i = 1 ; i <=totalPages ; i++){
        let buttonElement = document.createElement("button");
        buttonElement.innerHTML = `${i}`;
        buttonElement.addEventListener('click' , getPage);
        containerElement.appendChild(buttonElement);
        
    }
};

showToDoList(-1);

let addToList = () => {
    let task = document.getElementById("task").value;
    let urgency = document.getElementById("urgency").value;

    let newTask = {
        "task": task,
        "urgency": urgency
    }

    toDoList.push(newTask);

    document.getElementById("task").value = "";
    document.getElementById("urgency").value = "";

    showToDoList(-1);
}

let deleteTask = (index) => {
    toDoList.splice(index, 1);

    showToDoList(-1);

}

let updateTask = (index, flag , pageNumber ,searchText) => {
    if (flag === 0) {
        showToDoList(index , searchText , pageNumber = pageNumber );
    } else {
        let task = document.getElementById("updatedTask").value;
        let urgency = document.getElementById("updatedUrgency").value;

        let taskOld = toDoList[index];

        taskOld.task = task;
        taskOld.urgency = urgency;
        showToDoList(-1 , searchText , pageNumber = pageNumber);
    }
}

let searchTask = () => {
    let searchText = document.getElementById("searchBox").value;

    showToDoList(-1, searchText);
}

function getPage(event){
    console.log(event.target.textContent);
    let pageNumber = Number(event.target.textContent);

    showToDoList(-1 ,"",pageNumber ,2);
}