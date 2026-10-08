// shared/components/app-button/app-button.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'danger' | 'secondary';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-button.html',
})
export class AppButton {
  @Input() label: string = '';
  @Input() variant: ButtonVariant = 'primary';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';

  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
