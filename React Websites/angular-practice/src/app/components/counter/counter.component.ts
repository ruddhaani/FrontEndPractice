import { Component, Input } from '@angular/core';
import { Event } from '@angular/router';
import { every } from 'rxjs';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input() count : number = 0;

  incrementByOne(){
    this.count++;
  }

  
}

function convertToNumber(value: string){
  return Number(value);
}
