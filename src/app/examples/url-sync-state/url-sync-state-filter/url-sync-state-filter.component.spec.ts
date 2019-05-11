import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlSyncStateFilterComponent } from './url-sync-state-filter.component';

describe('UrlSyncStateFilterComponent', () => {
  let component: UrlSyncStateFilterComponent;
  let fixture: ComponentFixture<UrlSyncStateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlSyncStateFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlSyncStateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
