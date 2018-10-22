import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDynamicFormComponent } from './my-dynamic-form.component';

describe('DynamicFormComponent', () => {
  let component: MyDynamicFormComponent;
  let fixture: ComponentFixture<MyDynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDynamicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
