import { CommonModule } from '@angular/common';
import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [FormsModule, CommonModule,ReactiveFormsModule,],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent implements ControlValueAccessor {
 @Input() label: string;
 @Input() type: string = 'text';
 
 
 constructor(@Self() public ngControl: NgControl) {
  this.ngControl.valueAccessor = this;
 }
 
 
  writeValue(obj: any): void {
    
  }
  registerOnChange(fn: any): void {
    
  }
  registerOnTouched(fn: any): void {

  }
  

}
