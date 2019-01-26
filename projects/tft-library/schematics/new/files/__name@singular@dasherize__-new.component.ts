import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { <%= classify(name) %>Service, <%= singular(classify(name)) %> } from '../../state';

@Component({
  selector: '<%= selector %>-new',
  templateUrl: './<%= singular(dasherize(name)) %>-new.component.html',
  styleUrls: ['./<%= singular(dasherize(name)) %>-new.component.<%= styleext %>']
})
export class <%= singular(classify(name)) %>NewComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private <%= camelize(name) %>Service: <%= classify(name) %>Service
  ) { }

  ngOnInit() { }

  create<%= classify(name) %>(<%= singular(camelize(name)) %>Form: FormGroup) {
    if (<%= singular(camelize(name)) %>Form.valid) {
      this.<%= camelize(name) %>Service.add(<%= singular(camelize(name)) %>Form.value);
      this.router.navigate(['../list'], {relativeTo: this.route});
    }
  }

}
