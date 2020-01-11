import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() { }
  toFormGroup(controls: any) {
    let group: any = {};
    controls.forEach(cntrl => {
      group[cntrl.key] = cntrl.required ? new FormControl(cntrl.value || '', Validators.required)
        : new FormControl(cntrl.value || '');
    });
    return new FormGroup(group);
  }
  toFormControl(cntrl: any) {
    let group: any = {};
    group[cntrl.key] = cntrl.required ? new FormControl(cntrl.value || '', Validators.required)
      : new FormControl(cntrl.value || '');
    return new FormGroup(group);
  }
}
