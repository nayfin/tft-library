import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';

import { <%= classify(name) %>Store, <%= classify(name) %>State } from './<%= dasherize(name) %>.store';
import { <%= singular(classify(name)) %> } from './<%= singular(dasherize(name)) %>.model';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>Query extends QueryEntity<<%= classify(name) %>State, <%= singular(classify(name)) %>> {

  <%= camelize(name) %>$: Observable<<%= singular(classify(name)) %>[]> = this.selectAll();

  constructor(
    protected store: <%= classify(name) %>Store,
    protected <%= camelize(name) %>Service: <%= classify(name) %>Service,
  ) {
    super(store);
    <%= camelize(name) %>Service.fetch();

  }

}
