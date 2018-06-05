import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavNavigationComponent } from './sidenav-navigation.component';

describe('SidenavNavigationComponent', () => {
  let component: SidenavNavigationComponent;
  let fixture: ComponentFixture<SidenavNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
