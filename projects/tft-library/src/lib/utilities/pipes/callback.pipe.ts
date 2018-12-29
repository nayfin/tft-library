import { Pipe, PipeTransform } from '@angular/core';

/**
 * pipe allows clean component specific transformation of value without having to create a seperate pipe
 * for each set of transformation logic to improve performance. also useful for when same logic needed in template and component.ts
 * @param value the value to transform
 * @param callback the transformation function to run on value
 * useful if callback passed needs more data than just the value
 * @example
 * // if we were to run this callback directly in the template performance would suffer. YAY pipes!!!
 * {{ 'hello' | callback : (value) => value + ' world' }}
 */
@Pipe({
  name: 'callback'
})
export class CallbackPipe implements PipeTransform {

  transform(value: any | any[], callback: PipeCallback ): any {
    // check that parameters exist, but accept 0 as a value
    if ((!value && value !== 0) || !callback) { return ''; }
    // if value is an array, spread into callback arguments
    if (Array.isArray(value)) {
      return callback(...value);
    }
    return callback(value);
  }

}

export type PipeCallback = (...value: any[]) => any;
