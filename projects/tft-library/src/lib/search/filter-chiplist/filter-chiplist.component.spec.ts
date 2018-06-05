import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterChiplistComponent } from './filter-chiplist.component';

describe('FilterChiplistComponent', () => {
  let component: FilterChiplistComponent;
  let fixture: ComponentFixture<FilterChiplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterChiplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterChiplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
