import { Component, Input } from '@angular/core';
import { Employee } from '../../models/employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-employee',
  imports: [
    FormsModule
  ],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
    CreateEmployeeFormData : Employee = new Employee(-1 , "" , "" , 0);
    @Input() pageNumber : number = 1;
    @Input() pageSize : number = 2;
    @Input() searchText : string = "";

    constructor(private employeeService:EmployeeService){

    }

    createEmployee(){
      this.employeeService.createEmployee(this.CreateEmployeeFormData).subscribe({
        "next" : (response: HttpResponse<Employee>) => {
          console.log(response.body);
        },
        "error" : (error : Error) => {
            console.log(error);
        },
        "complete" : () => {
          console.log("all data received");
        }
      });

      this.employeeService.getEmployees(this.pageNumber , this.pageSize , this.searchText);

    }
}
