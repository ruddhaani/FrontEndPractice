import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter',
  imports: [
    FormsModule
  ],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input() count : number = 0;

  // data = {
  //   name : "Aniruddha",
  //   email : "ramaneaniruddha22@gmail.com",
  //   salary : 10000
  // }

  incrementByOne(){
    this.count++;
  }
}

// function convertToNum(value : string){
//     return Number(value);
// }
