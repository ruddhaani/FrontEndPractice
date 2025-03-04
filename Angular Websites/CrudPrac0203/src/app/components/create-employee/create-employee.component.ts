import { Component, EventEmitter, Output } from '@angular/core';
import { Employee } from '../../model/employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-employee',
  imports: [FormsModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  createEmployeeFormData : Employee = new Employee(-1, "" , "" , 0);
  @Output() onEmployeeCreation : EventEmitter<null> = new EventEmitter();

  constructor(private employeeService: EmployeeService){}
    handleSubmit(){
      this.employeeService.createEmployee(this.createEmployeeFormData).subscribe({
        next :  (response : HttpResponse<any>) => {
          console.log(response);
        },
        error : (error : HttpErrorResponse) => {
          console.log(error);
        },
        complete : () => {
          this.onEmployeeCreation.emit(null);
        }
      });
    }
}
