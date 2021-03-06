import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DesignModule } from '../design/design.module';

import { HeaderComponent } from './header/header.component';
import { SidenavNavigationComponent } from './sidenav-navigation/sidenav-navigation.component';

const CORE_COMPONENTS = [
  HeaderComponent,
  SidenavNavigationComponent,
];

@NgModule({
  imports: [
    CommonModule,
    DesignModule,
    RouterModule,
  ],
  declarations: CORE_COMPONENTS,
  exports: CORE_COMPONENTS,
})

export class CoreModule { }
