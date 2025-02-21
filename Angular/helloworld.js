var Employee = /** @class */ (function () {
    function Employee(employeeId, name, email, salary) {
        this.employeeId = employeeId;
        this.name = name;
        this.email = email;
        this.salary = salary;
    }
    return Employee;
}());
var employee = new Employee(1, "Ram", "ram124@gmail.com", 10000);
console.log(employee);
