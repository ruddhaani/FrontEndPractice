import { Component } from '@angular/core';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../services/employee.service';
import { HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PageArrayPipe } from '../../pipes/page-array.pipe';

@Component({
  selector: 'app-employee',
  imports: [
    CreateEmployeeComponent,
    CommonModule,
    PageArrayPipe
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  employee : Employee [] = [];
  pageNumber : number = 1;
  pageSize : number = 2;
  searchText  : string = "";
  totalCount : number = 0;
  totalPages : number = 0;

  constructor(private employeeService : EmployeeService){

  }

  ngOnInit(){
    this.fetchEmployees();
  }

  fetchEmployees(){
    this.employeeService.getEmployee(this.pageNumber , this.pageSize , this.searchText).subscribe({
      next : (response : any) => {
        this.totalCount = response.headers.get('X-Total-Count');
        this.totalPages = response.headers.get('X-Total-Pages');
        console.log(this.totalCount , this.totalPages);
        this.employee = response.body;
      }
    })
  }
}
