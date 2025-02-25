import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee',
  imports: [CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  employees: string[] = [];

  employeeObservable: Observable<string> = new Observable<string>((observable) => {
    setTimeout(() => {
      observable.next("Ram");
    }, 1000)

    setTimeout(() => {
      observable.next("Shyam");
    }, 2000)

    setTimeout(() => {
      observable.next("Seeta");
    }, 3000)

    setTimeout(() => {
      observable.next("Geeta");
    }, 4000)
  });

  ngOnInit() {
    this.employeeObservable.subscribe({
      "next": (data: string) => {
        console.log(data);
        this.employees.push(data);
      },
      "error": () => {

      },
      "complete": () => {

      }
    });
  }
}
