import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autocomplete-chiplist',
  templateUrl: './autocomplete-chiplist.component.html',
  styleUrls: ['./autocomplete-chiplist.component.scss']
})
export class AutocompleteChiplistComponent implements OnInit {

  selected: any = {};

  searchConfig = {
    apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
    appId: 'latency',
    indexName: 'instant_search'
  };

  constructor() { }

  ngOnInit() {
  }

  handleSelect(selected: any) {
    console.log('handleSelect selected:', selected);
    this.selected = selected;
  }
}
