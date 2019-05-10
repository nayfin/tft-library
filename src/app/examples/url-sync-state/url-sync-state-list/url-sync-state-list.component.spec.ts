import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlSyncStateListComponent } from './url-sync-state-list.component';

describe('UrlSyncStateListComponent', () => {
  let component: UrlSyncStateListComponent;
  let fixture: ComponentFixture<UrlSyncStateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlSyncStateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlSyncStateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
