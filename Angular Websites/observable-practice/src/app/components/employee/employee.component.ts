import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ArrayPipe } from '../../pipes/array.pipe';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [
    CommonModule,
    ArrayPipe,
    CreateEmployeeComponent,
    ReactiveFormsModule
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

  employeeService: EmployeeService = inject(EmployeeService);
  employees: Employee[] = [];
  pageNumber: number = 1;
  pageSize: number = 2;
  searchText: string = "";
  totalCount: number = 0;
  totalPages: number = 0;
  updateEmployeeFlag: boolean = false;
  updateEmployeeId: number = -1;
  updateEmployeeFormData: FormGroup = new FormGroup({
    "name": new FormControl("", [Validators.required, Validators.minLength(4)]),
    "email": new FormControl("", [Validators.required]),
    "salary": new FormControl(0, [Validators.required])
  });

  ngOnInit() {
    this.loadEmployees();
  }

  onChangePage(page: number) {
    this.pageNumber = page;
    this.loadEmployees();
  }

  loadEmployees() {
    this.getEmployees();
    this.employeeService.paginatedData$.subscribe({
      "next": (paginatedData: any) => {
        this.employees = paginatedData.body;
        this.totalCount = paginatedData.headers.get("X-Total-Count");
        this.totalPages = paginatedData.headers.get("X-Total-Pages");
        console.log(this.totalCount, this.totalPages, this.employees);
      },
      "error": (error: HttpErrorResponse) => {
        console.log(error);
      },

      "complete": () => {
        console.log("All employees fetched")
      }

    });
  }

  getEmployees() {
    this.employeeService.getEmployees(this.pageNumber, this.pageSize, this.searchText)
  }

  showUpdateEmployeeFlag(employee: Employee) {
    // Close the form if clicked again
    if (this.updateEmployeeId === employee.id) {
      this.updateEmployeeId = -1;
      this.updateEmployeeFlag = false;
      return;
    }
  
    this.updateEmployeeId = employee.id;
    this.updateEmployeeFlag = true;
  
    this.updateEmployeeFormData.setValue({
      name: employee.name,
      email: employee.email,
      salary: employee.salary
    });
  }
  

  updateEmployee() {
    this.employeeService.updateEmployees(this.updateEmployeeId, this.updateEmployeeFormData.value)
      .subscribe({
        next: (response: HttpResponse<any>) => {
          console.log(response.status);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
        complete: () => {
          // Reset form and flags
          this.updateEmployeeFormData.reset();
          this.updateEmployeeId = -1;
          this.updateEmployeeFlag = false;
          
          // Refresh employee list
          this.loadEmployees();
        }
      });
  }
  
}
