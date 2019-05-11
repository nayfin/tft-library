import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlSyncStatePageComponent } from './url-sync-state-page.component';

describe('UrlSyncStatePageComponent', () => {
  let component: UrlSyncStatePageComponent;
  let fixture: ComponentFixture<UrlSyncStatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlSyncStatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlSyncStatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
