import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'array'
})
export class ArrayPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): any {
    let arr = [];
    for(let i = 1; i <= value; i++){
      arr.push(i);
    }

    return arr;
  }

}
