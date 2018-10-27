import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss'],
})
export class UtilsComponent implements OnInit {

  numbers = [1, 2, 3, 4, 5, 6];
  obj = {
    a: 1,
    b: 2
  };
  a = 7;
  b = 13;
  ngOnInit() {
  }

  addMajorTom(value: string) {
    return value + ' Major Tom';
  }

  multiply(a: number, b: number) {
    return a * b;
  }

  multiplybyTwo(value: number) {
    return value * 2;
  }
  // will not update on change when passed an array
  sumArray(value: any[]): number {
    return value.reduce( (prev, curr) => prev += curr);
  }

  sumObject(value: {} ) {
    return Object.keys(value).reduce((prev, curr) => {
      return +prev + +value[curr];
    }, 0);
  }

  updateObject(val: number) {
    this.obj.a = val;
  }

  isEven(num, message) {
    console.log({message, num});
    // logging the calls method that calls the function to allow perfomance comparison
    return num % 2 === 0;
  }

  isDivisableBy(dividend, divisor) {
    return dividend % divisor === 0;
  }

  addNextNumber(value: number) {
    const lastNumber = this.getGreatesNumber();
    if (!Number.isNaN(value)) {
      this.numbers.push(+value);
    }
  }

  getGreatesNumber() {
    return this.numbers[this.numbers.length - 1];
  }

}
