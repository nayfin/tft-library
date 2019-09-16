import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteFieldComponent } from './autocomplete-field.component';

describe('AutocompleteFieldComponent', () => {
  let component: AutocompleteFieldComponent;
  let fixture: ComponentFixture<AutocompleteFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
