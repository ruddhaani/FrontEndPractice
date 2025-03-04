import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , 
    EmployeeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'observable-practice';
}
