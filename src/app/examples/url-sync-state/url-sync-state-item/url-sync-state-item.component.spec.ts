import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlSyncStateItemComponent } from './url-sync-state-item.component';

describe('UrlSyncStateItemComponent', () => {
  let component: UrlSyncStateItemComponent;
  let fixture: ComponentFixture<UrlSyncStateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlSyncStateItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlSyncStateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
