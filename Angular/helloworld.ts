class Employee{
    employeeId: number;
    name : string;
    email : string;
    salary: number;

    constructor(employeeId:number , name : string , email: string , salary : number){
        this.employeeId = employeeId;
        this.name = name;
        this.email = email;
        this.salary = salary;
    }
}

let employee : Employee = new Employee(1, "Ram" , "ram124@gmail.com" , 10000);
console.log(employee);