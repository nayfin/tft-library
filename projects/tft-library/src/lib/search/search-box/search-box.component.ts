import { Component, Inject, forwardRef, OnInit, Input } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectSearchBox } from 'instantsearch.js/es/connectors';

@Component({
  selector: 'tft-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent extends BaseWidget implements OnInit {

  @Input() public placeholder = 'Search';
  @Input() public submitTitle = 'Submit';
  @Input() public resetTitle = 'Reset';
  @Input() public algoliaAttribution = true;
  @Input() public displayResetButton = false;
  @Input() public refineOnKeyUp = true;

  state: {
    query: string;
    refine: (value: string) => void;
  };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('SearchBox');
  }

  public ngOnInit() {
    super.createWidget(connectSearchBox);
    super.ngOnInit();
  }

  public handleChange(query: string) {
    // this.change.emit(query);
    this.state.query = query;
    if (this.refineOnKeyUp) {
      this.state.refine(query);
    }
  }

  public handleSubmit(event: MouseEvent, query: string) {
    // send submit event to parent component
    // this.submit.emit(event);
    event.preventDefault();
    this.state.refine(query);

  }

  public handleReset(event: MouseEvent) {
    // send reset event to parent component
    // this.reset.emit(event);

    // reset search
    this.state.refine('');
  }
}
