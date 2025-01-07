import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PollsService } from '../../services/polls.service';
import { Router } from '@angular/router';
import { CreatePollDto } from '../../model/poll.interface';
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-poll',
  standalone: true,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './create-poll.component.html',
  styleUrl: './create-poll.component.css',
})
export class CreatePollComponent {
  pollForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private pollsService: PollsService,
    public router: Router
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.pollForm = this.fb.group({
      question: ['', [Validators.required, Validators.minLength(5)]],
      description: [''],
      options: this.fb.array([]),
    });

    // Add initial two options
    this.addOption();
    this.addOption();
  }

  get options(): FormArray {
    return this.pollForm.get('options') as FormArray;
  }

  addOption(): void {
    const optionGroup = this.fb.group({
      text: ['', Validators.required],
      metadata: this.fb.group({
        color: ['#000000'],
        description: [''],
      }),
    });
    this.options.push(optionGroup);
  }

  removeOption(index: number): void {
    this.options.removeAt(index);
  }

  getErrorMessage(field: string): string {
    const control = this.pollForm.get(field);
    if (!control?.errors || !control.touched) return '';

    if (control.errors['required']) return `${field} is required`;
    if (control.errors['minlength']) {
      return `${field} must be at least ${control.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }

  getOptionErrorMessage(index: number): string {
    const control = this.options.at(index).get('text');
    if (!control?.errors || !control.touched) return '';

    if (control.errors['required']) return 'Option text is required';
    return '';
  }

  onSubmit(): void {
    if (this.pollForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const formValue = this.pollForm.value;
      const createPollDto: CreatePollDto = {
        question: formValue.question,
        identifier: `poll_${Date.now()}`,
        data: {},
        options: formValue.options.map(
          (option: {
            text: string;
            metadata: { color: string; description: string };
          }) => ({
            text: option.text,
            data: {
              color: option.metadata.color,
              description: option.metadata.description,
            },
          })
        ),
      };

      this.pollsService.createPoll(createPollDto).subscribe({
        next: () => this.router.navigate(['']),
        error: (error) => console.error('Error creating poll:', error),
        complete: () => (this.isSubmitting = false),
      });
    }
  }
}
