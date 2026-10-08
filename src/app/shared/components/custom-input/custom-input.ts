import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [CommonModule, FormsModule],

  templateUrl: './custom-input.html',
  styleUrl: './custom-input.css',
})
export class CustomInput {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() errorMessage: string | null = null;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;

  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.valueChange.emit(inputValue);
  }
}
