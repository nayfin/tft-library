import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { <%= classify(name) %>Service, <%= singular(classify(name)) %>, <%= classify(name) %>Query } from '../../state';

@Component({
  selector: '<%= selector %>-edit',
  templateUrl: './<%= singular(dasherize(name)) %>-edit.component.html',
  styleUrls: ['./<%= singular(dasherize(name)) %>-edit.component.<%= styleext %>']
})
export class <%= singular(classify(name)) %>EditComponent implements OnInit {
  <%= singular(camelize(name)) %>: <%= singular(classify(name)) %>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private <%= camelize(name) %>Service: <%= classify(name) %>Service,
    private <%= camelize(name) %>Query: <%= classify(name) %>Query

  ) { }

  ngOnInit() {
    this.<%= singular(camelize(name)) %> = this.<%= camelize(name) %>Query.getActive();
  }

  update<%= classify(name) %>(<%= camelize(name) %>Form: FormGroup) {
    if (<%= camelize(name) %>Form.valid) {
      this.<%= camelize(name) %>Service.update( this.<%= singular(camelize(name)) %>.id, <%= camelize(name) %>Form.value);
      this.router.navigate(['../list'], {relativeTo: this.route});
    }
  }
}
