import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { AnyFieldConfig } from '../dynamic-field-config';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConditionalFieldsService } from '../conditional-fields.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'tft-field-container',
  templateUrl: './field-container.component.html',
  styleUrls: ['./field-container.component.scss']
})
export class FieldContainerComponent implements OnInit {

  @Input() config: AnyFieldConfig;
  @Input() group: FormGroup;

  showField: Observable<boolean>;

  constructor(
    private conditionalFields: ConditionalFieldsService,
  ) { }

  ngOnInit() {
    this.showField = this.conditionalFields.connectShowField(this.group, this.config);
  }

}
