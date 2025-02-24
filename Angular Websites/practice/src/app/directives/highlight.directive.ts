import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private e : ElementRef) {
      this.e.nativeElement.style.backgroundColor = 'yellow';
      this.e.nativeElement.style.color = 'blue';
   }

}
