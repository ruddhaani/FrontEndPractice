import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'remainder'
})
export class RemainderPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
