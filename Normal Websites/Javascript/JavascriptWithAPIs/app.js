const fetchData = async ()=>{
    try {
        const response = await fetch("http://localhost:5036/api/Employees");
        if(!response.ok){
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}

// fetchData();

const addData = async ( name , email , salary)=> {
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

// addData("Swara" , "swara@gmail.com" , 1029503);


const fetchDataWithID = async (employeeId)=>{
    try {
        const response = await fetch(`http://localhost:5036/api/Employees/${employeeId}`);

        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// fetchDataWithID(1002)

const updateData = async (id , name , email , salary) => {
    try {
        const response = await fetch(`http://localhost:5036/api/Employees/${id}` , {
            method : 'PUT',
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                Name : name,
                Email : email,
                Salary : salary
            })
        });

        if(!response.ok){
            throw new Error(`error: ${response.status}`);
        }

        const data = await response;
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// updateData(1002, "Swarali" , "swarali@gmail.com" , 12345);

// fetchData();

const deleteData = async (employeeId) => {
    try {
        const response = await fetch(`http://localhost:5036/api/Employees/${employeeId}` , {
            method: 'DELETE',
        })

        if(!response.ok){
            throw new Error(`error : ${response.status}`);
        }

        console.log(await response);
    } catch (error) {
        console.log(error);
    }
}

// deleteData(1002);

fetchData();