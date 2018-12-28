import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupListComponent } from './form-group-list.component';

describe('FormGroupListComponent', () => {
  let component: FormGroupListComponent;
  let fixture: ComponentFixture<FormGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
