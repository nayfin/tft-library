import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UrlSyncStatePageComponent } from './url-sync-state-page/url-sync-state-page.component';
import { UrlSyncStateFilterComponent } from './url-sync-state-filter/url-sync-state-filter.component';
import { UrlSyncStateListComponent } from './url-sync-state-list/url-sync-state-list.component';
import { UrlSyncStateItemComponent } from './url-sync-state-item/url-sync-state-item.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: UrlSyncStatePageComponent }
];

@NgModule({
  declarations: [
    UrlSyncStatePageComponent,
    UrlSyncStateFilterComponent,
    UrlSyncStateListComponent,
    UrlSyncStateItemComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UrlSyncStateModule { }
