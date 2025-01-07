import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  template: `
    <div class="space-y-1">
      <label
        *ngIf="label"
        [for]="id"
        class="block text-sm font-medium text-gray-700"
      >
        {{ label }}
      </label>
      <input
        [id]="id"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        (input)="onChange($event)"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <p *ngIf="error" class="text-sm text-red-600">{{ error }}</p>
    </div>
  `,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() id = `input-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() error = '';
  @Output() valueChange = new EventEmitter<string>();

  onChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.propagateChange(this.value);
  };
  onTouched = () => {};
  propagateChange = (_: string) => {};
  isDisabled = false;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
