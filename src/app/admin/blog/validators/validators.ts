import { ValidatorFn, FormGroup, ValidationErrors, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

/*
 * Validators for posts creation - Blog
 *
 */


/*
 * imageValidator
 * Checks if the header image has been uploaded
 * when header_mode is set up as "image"
 * 
 */ 

export const imageValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  
  const header_mode = control.get('header_mode');
  const image = control.get('image');

  if ( header_mode.value === 'image' && (!image.get('s').value.url || !image.get('m').value.url || !image.get('l').value.url) )
    return { 'imageRequired': true };
  else
    return null;
};


/**
 * videoValidator
 * Checks if the video has been added
 * when header_mode is set up as "video"
 * 
 */

export const videoValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  
  const header_mode = control.get('header_mode');
  const image = control.get('video');

  if ( header_mode.value === 'video' && (!image.value.url || !image.value.embed || !image.value.frame) )
    return { 'videoRequired': true };
  else
    return null;
};


/**
 * ErrorStateMatcher
 * Set up the way errors are shown. When using mat-error
 * within mat-form-field the errors are shown according
 * to the state of the form controls.
 * 
 * Here we can tweak the way these errors are shown and when.
 * 
 * Errors will be shown when input value is invalid and the input
 * has been touched by the user.
 *
 */

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.touched || control.dirty));
  }
}

export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    console.log(control);
    return control.invalid && (control.touched || control.dirty);
  }
}


