import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisedButtonComponent } from './raised-button.component';

describe('RaisedButtonComponent', () => {
  let component: RaisedButtonComponent;
  let fixture: ComponentFixture<RaisedButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaisedButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
