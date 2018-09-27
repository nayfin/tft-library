import { Pipe, PipeTransform } from '@angular/core';

/**
 * pipe allows clean component specific transformation of value without having to create a seperate pipe
 * for each set of transformation logic to improve performance. also useful for when same logic needed in template and component.ts
 * @param value the value to transform
 * @param callback the transformation function to run on value
 * @param config optionally accept configuration object that can be passed to callback function when it runs.
 * useful if callback passed needs more data than just the value
 * @example
 * // if we were to run this callback directly in the template performance would suffer. YAY pipes!!!
 * {{ 'hello' | callback : (value) => value + ' world' }}
 */
@Pipe({
  name: 'callback'
})
export class CallbackPipe implements PipeTransform {

  transform(value: any, callback: PipeCallback, config: any = null ): any {
    return callback(value, config);
  }

}

export type PipeCallback = (value: any, config?: any) => any;
