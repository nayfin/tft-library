import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoliaAttributionComponent } from './algolia-attribution.component';

describe('AlgoliaAttributionComponent', () => {
  let component: AlgoliaAttributionComponent;
  let fixture: ComponentFixture<AlgoliaAttributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgoliaAttributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoliaAttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
