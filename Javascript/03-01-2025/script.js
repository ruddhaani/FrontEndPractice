// let newElement = document.createElement("h1");
// newElement.classList.add("h1content");
// newElement.textContent = "Hello World!";

// let box = document.getElementById("box");
// // box.appendChild(newElement);
// box.insertAdjacentElement("afterbegin" , newElement) // has four options 1.beforebegin 2.beforeend 3. afterbegin 4.afterend

// let para2 = document.getElementById("p2");

// // box.removeChild(para2);

// para2.remove();

// // box.style = "background-color: green; color:red;"


let personList = [
  {
    "name" : "Ani",
    "age" : 22,
    "city" : "Pune",
  },
  {
    "name" : "Snehal",
    "age" : 21,
    "city" : "Mumbai",
  },
  {
    "name" : "Sejal",
    "age" : 25,
    "city" : "Pune",
  },
  {
    "name" : "Random",
    "age" : 22,
    "city" : "Delhi",
  }
];


let addPerson = ()=>{
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let city = document.getElementById("city").value;

    personList.push({
        "name" : name,
        "age" : age,
        "city" : city
    });

    console.log(personList);
    showPerson();
}

let showPerson = ()=>{
    let container = document.querySelector(".container");
    container.innerHTML = "";
    for(let i in personList){
        let newElement = document.createElement("div");
        newElement.innerHTML = `<ul>
                <li>Name: ${personList[i].name}</li>
                <li>Age: ${personList[i].age}</li>
                <li>City: ${personList[i].city}</li>
                <button onclick="deletePerson(${i})">Delete</button>
            </ul>`;
        
        container.appendChild(newElement);
    }
}

showPerson();

let deletePerson = (index)=>{
    personList.splice(index , 1);
    showPerson();
}
