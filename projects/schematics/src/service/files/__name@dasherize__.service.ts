import { Injectable } from '@angular/core';<% if (!plain) { %>
import { Observable } from 'rxjs';
import { FirestoreService } from '../../data-service/firestore.service';<% } %>
import { <%= classify(name) %>Store } from './<%= dasherize(name) %>.store';<% if (!plain) { %>
import { <%= singular(classify(name)) %> } from './<%= singular(dasherize(name)) %>.model';<% } %>

@Injectable({ providedIn: 'root' })
export class <%= classify(name) %>Service {

  <% if (!plain) { %>
  <%= camelize(name) %>$: Observable<<%= singular(classify(name)) %>[]>;
  <% } %>

  constructor(
    private <%= camelize(name) %>Store: <%= classify(name) %>Store,<% if (!plain) { %>
    private firestoreService: FirestoreService,
<% } %>) {<% if (!plain) { %>
    this.<%= camelize(name) %>$ = this.firestoreService.col$('<%= camelize(name) %>');
<% } %>}
<% if (!plain) { %>
  fetch() {
    this.<%= camelize(name) %>$.subscribe( (<%= camelize(name) %>: <%= singular(classify(name)) %>[]) => {
      this.<%= camelize(name) %>Store.set(<%= camelize(name) %>);
    });
  }
  setActive<%= singular(classify(name)) %>(id: string) {
    this.<%= camelize(name) %>Store.setActive(id);
  }

  async add(<%= singular(camelize(name)) %>: <%= singular(classify(name)) %>) {
    try {
      // we update the database, which timestamps the data and adds an id before sending back
      const added<%= singular(classify(name)) %> = await this.firestoreService.add('<%= camelize(name) %>', <%= singular(camelize(name)) %>);
      // we use the addedSpecies because it is timestamped and has an id
      this.<%= camelize(name) %>Store.add(added<%= singular(classify(name)) %>);
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, <%= singular(camelize(name)) %>: Partial<<%= singular(classify(name)) %>>) {
    try {
      const updated<%= singular(classify(name)) %> = await this.firestoreService.update('<%= camelize(name) %>', id, <%= singular(camelize(name)) %>);
      this.<%= camelize(name) %>Store.update(id, <%= singular(camelize(name)) %>);
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string) {
    try {
      await this.firestoreService.remove('<%= singular(camelize(name)) %>', id);
      this.<%= camelize(name) %>Store.remove(id);
    } catch (err) {
      throw err;
    }
  }<% } %>
}
