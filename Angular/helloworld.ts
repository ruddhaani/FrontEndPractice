function Component(metadata : any){
    function ComponentDecorator(target : Function){
        console.log("This class is component class");
        console.log(metadata.selector);
    }

    return ComponentDecorator;
}

function Input(metadata : any){
    function InputDecorator(target : any , property:any){
        console.log(property);
    }

    return InputDecorator;
}





@Component({
    "selector" : "app-employee",
    "templateUrl" : "../employee.html",
    "styleUrl" : "../employee.css",
    "imports"  : [

    ]
})
class Employee{
    employeeId: number;
    @Input ({
        "greeting" : "Hello"
    }) 
    name : string;
    email : string;
    salary: number;

    constructor(employeeId:number , name : string , email: string , salary : number){
        this.employeeId = employeeId;
        this.name = name;
        this.email = email;
        this.salary = salary;
        console.log("Constructor is called");
    }
}

let employee : Employee = new Employee(1, "Ram" , "ram124@gmail.com" , 10000);
//console.log(employee);