import { CommonModule } from '@angular/common';
import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [FormsModule, CommonModule,ReactiveFormsModule,],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent implements ControlValueAccessor {
 @Input() label: string;
 @Input() type: string = 'text';
 
 obj: string = '';
 onChange = (value: string) => {};
 onTouched = () => {};


 constructor(@Self() public ngControl: NgControl) {
  this.ngControl.valueAccessor = this;
 }
 
 
  writeValue(obj: any): void {
    this.obj = obj || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
     this.onTouched = fn;
  }
  

}
