import { FormControl, ValidatorFn } from '@angular/forms';
export interface formField{
    label: string;
    type: string;
    placeholder: string;
    control: FormControl;
    validators?: ValidatorFn[]; //Allow validators
}