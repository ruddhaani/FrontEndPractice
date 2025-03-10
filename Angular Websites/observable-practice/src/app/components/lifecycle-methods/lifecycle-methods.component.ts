import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lifecycle-methods',
  imports: [],
  templateUrl: './lifecycle-methods.component.html',
  styleUrl: './lifecycle-methods.component.css'
})
export class LifecycleMethodsComponent {
  @Input() count !: Number;
  
  ngOnChange(changes : SimpleChanges){
    console.log("ngOnChanges called");
  }

  ngOnInit(){
    console.log("ngOnInit called");
  }

  ngDoCheck(){
    console.log("ngDoCheck called");
  }

  ngAfterContentInit(){
    console.log("ngAfterContentInit called");
  }

  ngAfterContentChecked(){
    console.log("ngAfterContentChecked called");
  }

  ngAfterViewInit(){
    console.log("ngAfterViewInit called");
  }

  ngAfterViewChecked(){
    console.log("ngAfterViewChecked called");
  }

  ngDestroy(){
    console.log("ngDestroy called");
  }

}
