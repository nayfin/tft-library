import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TftLibraryComponent } from './tft-library.component';

describe('TftLibraryComponent', () => {
  let component: TftLibraryComponent;
  let fixture: ComponentFixture<TftLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TftLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TftLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
