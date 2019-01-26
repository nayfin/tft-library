import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { <%= singular(classify(name)) %>, <%= classify(name) %>Query, <%= classify(name) %>Service } from '../../state';

@Component({
  selector: '<%= selector %>-list',
  templateUrl: './<%= dasherize(name) %>-list.component.html',
  styleUrls: ['./<%= dasherize(name) %>-list.component.<%= styleext %>']
})
export class <%= classify(name) %>ListComponent implements OnInit {
  <%= camelize(name) %>$: Observable<<%= singular(classify(name)) %>[]>;
  isLoading$: Observable<boolean>;

  displayedColumns = ['id', 'name', 'actions'];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private <%= camelize(name) %>Query: <%= classify(name) %>Query,
    private <%= camelize(name) %>Service: <%= classify(name) %>Service
  ) { }

  ngOnInit() {
    this.<%= camelize(name) %>$ = this.<%= camelize(name) %>Query.selectAll();
    this.isLoading$ = this.<%= camelize(name) %>Query.selectLoading();

    // this.<%= camelize(name) %>Service.get();
  }

  add<%= singular(camelize(name)) %>() {
    this.router.navigate(['../new'], {relativeTo: this.route});
    // this.<%= camelize(name) %>Service.add(<%= singular(camelize(name)) %>);
  }

  edit(id: string) {
    this.<%= camelize(name) %>Service.setActive<%= singular(classify(name)) %>(id);
    this.router.navigate(['../edit'], {relativeTo: this.route});
    // this.<%= camelize(name) %>Service.update(id, <%= singular(camelize(name)) %>);
  }

  remove(id: string) {
    console.log(`Removing`);
    this.<%= camelize(name) %>Service.remove(id);
  }

  copy(id: string) {
    this.<%= camelize(name) %>Service.setActive<%= singular(classify(name)) %>(id);
    this.router.navigate(['../copy'], {relativeTo: this.route});
  }
}
