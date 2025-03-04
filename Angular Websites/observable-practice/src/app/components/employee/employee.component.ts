import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ArrayPipe } from '../../pipes/array.pipe';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';

@Component({
  selector: 'app-employee',
  imports: [
    CommonModule,
    ArrayPipe,
    CreateEmployeeComponent
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  // employees: string[] = [];

  // employeeObservable: Observable<string> = new Observable<string>((observable) => {
  //   setTimeout(() => {
  //     observable.next("Ram");
  //   }, 1000)

  //   setTimeout(() => {
  //     observable.next("Shyam");
  //   }, 2000)

  //   setTimeout(() => {
  //     observable.next("Seeta");
  //   }, 3000)

  //   setTimeout(() => {
  //     observable.next("Geeta");
  //   }, 4000)

  //   //once error is emitted no further data is emmited
  //   // setTimeout(()=>{
  //   //   observable.error("Error");
  //   // } , 2500)

  //   setTimeout(() => {
  //     observable.complete();
  //   }, 3500);
  // });

  // ngOnInit() {
  //   this.employeeObservable.subscribe({
  //     "next": (data: string) => {
  //       console.log(data);
  //       this.employees.push(data);
  //     },
  //     "error": (error: any) => {
  //       console.log(error);
  //     },
  //     "complete": () => {
  //       console.log("completed");
  //     }
  //   });
  // }

  employeeService : EmployeeService = inject(EmployeeService);
  employees : Employee [] = [];
  pageNumber: number = 1;
  pageSize : number = 2;
  searchText : string = "";
  totalCount : number = 0;
  totalPages: number = 0;

  ngOnInit(){
    this.getEmployees();
    this.employeeService.paginatedData$.subscribe({
      "next" : (paginatedData : any) => {
          this.employees = paginatedData.body;
          this.totalCount = paginatedData.headers.get("X-Total-Count");
          this.totalPages = paginatedData.headers.get("X-Total-Pages");
          console.log(this.totalCount , this.totalPages , this.employees);
      },
      "error" : (error : HttpErrorResponse) => {
        console.log(error);
      },

      "complete" : () => {
        console.log("All employees fetched")
      }
      
    })
  }

  getEmployees(){
    this.employeeService.getEmployees(this.pageNumber , this.pageSize , this.searchText)
  }
}
