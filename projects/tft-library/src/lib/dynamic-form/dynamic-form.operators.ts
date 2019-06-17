import { map } from 'rxjs/operators';


export function valueIn (values: string[]) {
  return map( (value: string) => {
    return values.includes(value);
  });
}

