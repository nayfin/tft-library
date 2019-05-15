import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
@Component({
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
 })
 export class ControlErrorComponent {
  _text: string;
  _hide = true;

  @Input() set text(value: string) {
    if (value !== this._text) {
      this._text = value;
      this._hide = !value;
      this.cdr.detectChanges();
    }
  }

  constructor(private cdr: ChangeDetectorRef) { }

}
