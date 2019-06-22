import { Directive, forwardRef, Attribute, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateEqual],[validateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true }
    ]
})
export class EqualValidator implements Validator {
    
    @Input('validateEqual') public validateEqual: string;

    validate(c: AbstractControl): { [key: string]: any } {
        let userValue = c.value;
        let expectedValue = this.validateEqual;
        if (userValue !== expectedValue) {
            return {
                validateEqual: false
            }
        }
        return null;
    }
}