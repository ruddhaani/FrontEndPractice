import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pageArray'
})
export class PageArrayPipe implements PipeTransform {

  pageArray : number [] = [];

  transform(value: number, ...args: unknown[]): number [] {
    for(let i = 1; i<=value ; i++){
      this.pageArray.push(i);
    }

    return this.pageArray;
  }

}
