import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  title = 'app';

  linksToExamples = [
    {
      title: 'Home',
      path: 'home',
      description: `Overview of search components`,
    },
    {
      title: 'Autocomplete',
      path: 'autocomplete-chiplist',
      description: `Example of autocomplete chiplist`
    },
  ];

  onLinkSelected(item: any) {
    this.sidenav.close();
  }
}
