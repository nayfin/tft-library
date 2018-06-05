import { Component, Inject, forwardRef, OnInit, Input } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectRefinementList } from 'instantsearch.js/es/connectors';


export interface FilterListState {
  canRefine: boolean;
  canToggleShowMore: boolean;
  createURL: Function;
  isShowingMore: boolean;
  items: {}[];
  refine: Function;
  toggleShowMore: Function;
  searchForItems: Function;
  isFormSearch: boolean;
}

export interface FilterListItem {
  isRefined: boolean;
  value: string;
}

@Component({
  selector: 'tft-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss']
})
export class FilterSelectComponent extends BaseWidget implements OnInit {

  @Input() title: string | null = 'Filter results';
  @Input() multiple = true;
  @Input() attribute: string;

  state: {
    items: { label: string; value: string; isRefined?: boolean }[];
    createURL: () => string;
    refine: (value: string) => void;
    canRefine: boolean;
    isShowingMore: boolean;
    toggleShowMore: () => void;
    canToggleShowMore: boolean;
  };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('RefinementList');
  }

  public ngOnInit() {
    this.createWidget(connectRefinementList, { attributeName: this.attribute });
    super.ngOnInit();
  }

  public refine(
    event: MouseEvent,
    item: FilterListItem
  ) {
    event.preventDefault();
    event.stopPropagation();

    if (this.state.canRefine) {
      // if multi-select is deactivated clear refinements so that only last selected 
      if (!this.multiple) {
        this.clearFilter();
      }
      // update UI directly, it will update the checkbox state
      item.isRefined = !item.isRefined;

      // refine through Algolia API
      this.state.refine(item.value);
    }
  }

  clearFilter() {
    this.state.items.forEach( (item, i, arr) => {
      if ( item.isRefined === true ) {
        item.isRefined = false;
        this.state.refine(item.value);
      }
    });
  }
}
