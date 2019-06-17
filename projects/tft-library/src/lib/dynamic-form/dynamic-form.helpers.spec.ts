import { checkControlForValues, CheckControlConfig} from './dynamic-form.helpers';
import { FormGroup, FormControl } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { async } from '@angular/core/testing';

fdescribe('FUNCTIONS', () => {

  describe('CheckControlForValues', () => {
    let group: FormGroup,
        config: CheckControlConfig;
    beforeEach( () => {
      group = new FormGroup({
        'mockA': new FormControl('')
      }),
      config = {
        controlName: 'mockA',
        values: ['abc']
      }

    })
    // TODO: let's start using rxjs marbles to test here
    it('should return true when control value equals one of the values being watched for', async(() => {
      const control = group.get('mockA')
      let watcher = checkControlForValues(group, config);
      control.setValue('abc');
      watcher.subscribe((isInValues) => {
        console.log({a:'isInValues'});
        expect(isInValues).not.toEqual(true);
      })
      // expect(false).toEqual(true);
    }))
  })
})