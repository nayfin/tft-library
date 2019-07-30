import { map } from 'rxjs/operators';


export function valueIn (values: string[]) {
  return map( (value: string) => {
    if (value) {
      return values.some(v => {
        if (isRegex(v)) {
          const trimmedStringForRegex = v.substr(1, v.length - 2);
          const regex = new RegExp(trimmedStringForRegex);
          return regex.test(value);
        } else {
          return v === value;
        }
      });
    } else {
      return false;
    }
  });
}

function isRegex(string: string) {
  return string[0] === '/' && string[string.length - 1] === '/';
}
