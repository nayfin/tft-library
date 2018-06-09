import { Component, Inject, forwardRef, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
// import { parseNumberInput } from 'angular-instantsearch';
import { connectRefinementList } from 'instantsearch.js/es/connectors';
// import { MatAutocompleteSelectedEvent } from '@angular/material';

export interface RefinementListState {
  canRefine: boolean;
  // canToggleShowMore: boolean;
  createURL: Function;
  // isShowingMore: boolean;
  items: {}[];
  refine: Function;
  searchForItems: Function;
  isFormSearch: boolean;
}

export interface RefinementListItem {
  isRefined: boolean;
  value: string;
}

@Component({
  selector: 'tft-filter-chiplist',
  templateUrl: './filter-chiplist.component.html',
  styleUrls: ['./filter-chiplist.component.scss']
})
export class FilterChiplistComponent extends BaseWidget implements OnInit {

  // Title of chip list if needed
  @Input() public title: string | null = null;
  // attribute of search index to search and filter on
  @Input() public attributeName: string;
  // or: results include any of the filter items | and: results include all of the filter items
  @Input() public operator: 'or' | 'and' = 'or';
  // callback function to filter the attribute items as they are returned
  @Input() public transformItems?: Function;
  // name of parameter on item holding image url path
  // e.g. if the item has a path to an image and it is located on item.imageUrl enter 'imageUrl'
  @Input() public imageUrlParam = 'image';
  // placeholder for chiplist
  @Input() public placeholder = 'Type to search';
  // any validators to pass into searchbox
  @Input() public validators: Validators[] = [];
  // Text inside of clear button
  @Input() public displaySubmitChipsButton = false;
  @Input() public selectTitle = 'SELECT';
  // Text inside of clear button
  @Input() public displayClearButton = false;
  @Input() public clearTitle = 'CLEAR';
  // Resets state of instantSearch's autocomplete mechanisms on submission of selected item
  @Input() public clearOnSubmit = true;
  // Selecting item emits the submit event with the item's value
  @Input() areChipsRemovable = true;
  // Tab to select chip
  @Input() addChipOnBlur = true;

  // TODO: should we keep this around? What can it be used for?
  @Input() chipSelectable = true;

  // TODO: where is this limiting?
  @Input() public limitMin: number | string = 10;
  @Input() public limitMax: number | string;
  // TODO: what options do we get with sortBy?
  @Input() public sortBy: string[] | ((item: object) => number);

  // TODO: replace this with something less expensive e.g. only listen for changes on change to input element

  // get hits() {
  //   return !!this.state && !!this.state.indices ? this.state.indices[0].hits : []; // this.state.indices[0].hits;
  // }

  // selected: any;

  searchQuery = '';
  chips = [];

  formContainer: FormGroup;

  public state: RefinementListState = {
    canRefine: false,
    // canToggleShowMore: boolean;
    createURL: () => undefined,
    // isShowingMore: boolean;
    items: [],
    refine: () => undefined,
    searchForItems: () => undefined,
    isFormSearch: false,
  };

  constructor (
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent,
    private fb: FormBuilder
    ) {
    super('RefinementList');
    this.formContainer = this.fb.group({
      'autocomplete': [null, [Validators.required, ...this.validators]]
    });
  }

  // public ngOnInit() {
  //   this.createWidget(connectRefinementList);
  //   super.ngOnInit();
  // }
  get items() {
    return this.transformItems instanceof Function
      ? this.transformItems(this.state.items)
      : this.state.items;
  }
  get selectedItems() {
    return this.items.filter( item => item.isRefined );
  }
  get remainingItems() {
    return this.items.filter( item => !this.selectedItems.includes(item) );
  }
  ngOnInit() {
    super.createWidget(connectRefinementList, {
      limit: this.parseNumberInput(this.limitMin),
      showMoreLimit: this.parseNumberInput(this.limitMax),
      attributeName: this.attributeName,
      sortBy: this.sortBy,
      escapeFacetValues: true
    });
    super.ngOnInit();
  }

  public refine(
    item: RefinementListItem,
  ) {
    if (this.state.canRefine) {
      // update UI directly, it will update the checkbox state
      item.isRefined = !item.isRefined;
      // refine through Algolia API
      this.state.refine(item.value);
    }
  }

  handleSubmit(event: MouseEvent) {
    event.preventDefault();
    this.state.searchForItems(this.searchQuery);
  }

  handleChange(value: string) {
    this.searchQuery = value;
    this.state.searchForItems(value);
  }

  handleSelect(event: any) {
    this.refine(event.option.value);
    this.chips.push(event.option.value);
    this.searchQuery = '';
    // this.formContainer.get('autocomplete').reset();
  }

  removeChip(chip) {
    this.refine(chip);
    this.chips.splice(this.chips.indexOf(chip), 1);
  }
  mapToName(val) {
    return val ? val.name : '';
  }
  // TODO: this needs to be abstracted
  parseNumberInput(input?: number | string) {
    return typeof input === 'string' ? parseInt(input, 10) : input;
  }

}
