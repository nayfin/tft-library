import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteChiplistComponent } from './autocomplete-chiplist.component';

describe('AutocompleteChiplistComponent', () => {
  let component: AutocompleteChiplistComponent;
  let fixture: ComponentFixture<AutocompleteChiplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteChiplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteChiplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
