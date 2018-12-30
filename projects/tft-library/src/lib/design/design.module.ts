import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  MatToolbarModule,
  MatIconModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatCheckboxModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatTabsModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatBadgeModule,
  MatTableModule,
} from '@angular/material';

const TFT_DESIGN_MODULES = [
  MatPaginatorModule,
  FlexLayoutModule,
  MatToolbarModule,
  MatIconModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatCheckboxModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatTabsModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatBadgeModule,
  MatTableModule
  // DragDropModule
];

@NgModule({
  imports: TFT_DESIGN_MODULES,
  exports: TFT_DESIGN_MODULES
})

export class DesignModule {
}
