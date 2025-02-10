import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-details',
  imports: [],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})

export class EmployeeDetailsComponent {
  count : number = 0;

  incrementby1(){
    this.count += 1;
  }
  
}