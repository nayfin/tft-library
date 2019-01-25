import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { <%= classify(name) %>Service, <%= singular(classify(name)) %>, <%= classify(name) %>Query } from '../../state';

@Component({
  selector: '<%= selector %>-copy',
  templateUrl: './<%= singular(dasherize(name)) %>-copy.component.html',
  styleUrls: ['./<%= singular(dasherize(name)) %>-copy.component.<%= styleext %>']
})
export class <%= singular(classify(name)) %>CopyComponent implements OnInit {

  copied<%= singular(classify(name)) %>: Partial<<%= singular(classify(name)) %>>;
  new<%= singular(classify(name)) %>: Partial<<%= singular(classify(name)) %>>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private <%= camelize(name) %>Service: <%= classify(name) %>Service,
    private <%= camelize(name) %>Query: <%= classify(name) %>Query
  ) { }

  ngOnInit() {
    this.copied<%= singular(classify(name)) %> = this.<%= camelize(name) %>Query.getActive();
    const { name, id, ...prepared<%= singular(classify(name)) %> } = { ...this.copied<%= singular(classify(name)) %> };
    this.new<%= singular(classify(name)) %> = prepared<%= singular(classify(name)) %>;
  }

  create<%= classify(name) %>(<%= singular(camelize(name)) %>Form: FormGroup) {
    if (<%= singular(camelize(name)) %>Form.valid) {
      this.<%= camelize(name) %>Service.add(<%= singular(camelize(name)) %>Form.value);
      this.router.navigate(['../list'], {relativeTo: this.route});
    }
  }
}
