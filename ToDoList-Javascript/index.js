// let todoBoxElement = document.createElement("div");
// todoBoxElement.classList

let toDoList = [
    {
        "task" : "Complete C Homework.",
        "urgency" : "Immediate" 
    },
    {
        "task" : "Complete C# Homework.",
        "urgency" : "Immediate" 
    },
]

let showToDoList = (index , searchText="") => {
    let containerElement = document.querySelector(".container");
    containerElement.innerHTML = "";

    for (let key in toDoList) {
        if(toDoList[key].task.toLowerCase().search(searchText.toLowerCase()) == -1){
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
                <button onclick="updateTask(${key}, 0)">Update</button>
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
                    <button onclick="updateTask(${key}, 1)">Update</button>
                    <button onclick="deleteTask(${key})">Delete</button>
                </div>
            `;
        }

        todoBoxElement.innerHTML = innerHTMLString;
        containerElement.appendChild(todoBoxElement);
    }
};

showToDoList(-1);

let addToList = ()=>{
    let task = document.getElementById("task").value;
    let urgency = document.getElementById("urgency").value;

    let newTask = {
        "task" : task,
        "urgency" : urgency
    }

    toDoList.push(newTask);

    document.getElementById("task").value = "";
    document.getElementById("urgency").value = "";

    showToDoList(-1);
}

let deleteTask = (index)=>{
    toDoList.splice(index,1);

    showToDoList(-1);

}

let updateTask = (index , flag) =>{
    if(flag === 0){
        showToDoList(index);
    }else{
        let task = document.getElementById("updatedTask").value;
        let urgency = document.getElementById("updatedUrgency").value;

        let taskOld = toDoList[index];

        taskOld.task = task;
        taskOld.urgency = urgency;
        showToDoList(-1);
    }
}

let searchTask = ()=>{
    let searchText = document.getElementById("searchBox").value;

    showToDoList(-1,searchText);
}