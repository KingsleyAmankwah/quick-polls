import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonVariant } from './button.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [ngClass]="[
        'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant]
      ]"
      (click)="onClick.emit($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
  imports: [CommonModule],
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<MouseEvent>();

  readonly variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
}
