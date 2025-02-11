import { Component, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter',
  imports: [FormsModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input() count : number = 0;

  incrementByOne(){
    this.count++;
  }

  handleInput(e : Event){
      console.log(e);
      this.count = Number((e.target as HTMLInputElement).value);
  }
}

function convertToNumber(value: string){
  return Number(value);
}
