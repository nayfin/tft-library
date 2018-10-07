import { Component, Inject, forwardRef, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectAutocomplete } from 'instantsearch.js/es/connectors';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tft-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent extends BaseWidget implements OnInit {



  /*
  *
  *  IMPORTANT: if you want to use an image in the header of the list
  *  autocomplete returns list of search results as user types. but you shape the objects that get returned.
  *  so if you want to use an image from the items in that list, you can store its url in a parameter of those items
  *  but you have to tell us where to look
  *  if that object has a parameter for a url path to an image, then set imageUrlParam a string of the name of the
  *  e.g.
  *
  * in your algolia index if you have an index of objects that look like this:
  *   [
  *    {id: "q3lk4fk", name: "cold-turkey", **imageUrl** : "www.imagelibrary.com/the/location/of/my/image.png"},
  *    {id: "q33k4f4", name: "tomato", **imageUrl**: "www.imagelibrary.com/the/location/of/your/image.png"},
  *     ...
  *   ]
  *
  *  then you need to tell tft-autocomplete where to look, by passing it the parameter name as a string to the
  *  imageUrlParam input
  *
  *    <tft-autocomplete [imageUrlParam]="'imageUrl'"></tft-autocomplete>
  *
  *
  *
  */
  @Input() public imageUrlParam = 'image';
  @Input() public placeholder = 'Type to search';
  @Input() public algoliaAttribution = true;
  @Input() public selectTitle = 'SELECT';
  // Text insid of clear button
  @Input() public clearTitle = 'CLEAR';
  // Do you want to display clear button?
  @Input() public displayClearButton = false;
  // Do you want to display the select button. MAKE SURE selectToSubmit IS NOT SET TO FALSE!!
  @Input() public displaySelectButton = false;
  // Resets state of instantSearch's autocomplete mechanisms on submission of selected item
  @Input() public clearOnSubmit = false;
  @Input() public validators: Validators[] = [];

  @Output() select = new EventEmitter();
  // will listen for changes on formControl then fire refine off with the controls value
  hits: Observable<any>;
  selected: any;
  formContainer: FormGroup;

  public state: {
    query: '';
    refine: (value: string) => void;
    indices: { hits: any[], index: string, label: string }[];
  };

  constructor (
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent,
    private fb: FormBuilder
    ) {
    super('Autocomplete');
    this.formContainer = this.fb.group({
      'autocomplete': [null, [Validators.required, ...this.validators]]
    });
  }

  public ngOnInit() {
    super.createWidget(connectAutocomplete);
    super.ngOnInit();

    this.hits = this.formContainer.get('autocomplete').valueChanges.pipe( map(val => {
      return this.handleChange(val);
    }) );
  }
  public handleChange( query: string ): any[] {
    this.formContainer.setErrors({'valueSelected': false});
    const refinement: any = this.state.refine(query);
    return refinement.lastResults.hits;
    // this.change.emit({query, hits});
  }

  public handleSelect( event: MatAutocompleteSelectedEvent ) {
    const item = event.option.value;
    this.select.emit({ item } );
    this.selected = item;
    // if ( this.selectToSubmit) {
    //   this.handleSubmit();
    // }
  }

  public handleSubmit(event: MouseEvent | KeyboardEvent) {
    // send submit event to parent component with selected item
    if ( event ) {
      event.preventDefault();
    }
    // this.submit.emit({ event, item : this.selected } );
    if ( this.clearOnSubmit ) {
      this.clearValue();
    }
  }

  public handleClear(event: MouseEvent | KeyboardEvent) {
    // send reset event to parent component
    // this.reset.emit(event);
    // TODO: should be able to kill the following line, enable clear button and test
    this.state.refine('');
    this.clearValue();
  }

  clearValue() {
    this.formContainer.get('autocomplete').reset();
  }
  // used to map selected items name to autocomplete input
  mapToName(val) {
    return val ? val.name : '';
  }

}
