import { map } from 'rxjs/operators';


export const valueIn = (values: string[]) => {
  return map( (value: string) => {
    return values.includes(value);
  });
};
