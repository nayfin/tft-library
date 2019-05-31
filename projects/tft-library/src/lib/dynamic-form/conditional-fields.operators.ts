import { map } from 'rxjs/operators';


export function valueIn (values: string[]) {
  return map( (value: string) => {
    // console.log({values, value});
    return values.includes(value);
  });
}

