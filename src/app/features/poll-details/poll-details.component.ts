import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Poll, VoteResponse } from '../../model/poll.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PollsService } from '../../services/polls.service';

import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-poll-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './poll-details.component.html',
  styleUrl: './poll-details.component.css',
})
export class PollDetailsComponent implements OnInit {
  poll: Poll | null = null;
  isLoading = false;
  error: string | null = null;
  isSubmitting = false;
  voteForm!: FormGroup;
  hasVoted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private pollsService: PollsService
  ) {
    this.voteForm = this.fb.group({
      optionId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPoll();
  }

  loadPoll(): void {
    this.isLoading = true;
    this.error = null;

    this.route.params.subscribe({
      next: (params) => {
        this.pollsService.getPoll(params['id']).subscribe({
          next: (poll) => {
            this.poll = poll;
            this.isLoading = false;
          },
          error: (error) => {
            this.error = error;
            this.isLoading = false;
          },
        });
      },
      error: (error) => {
        this.error = error;
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.voteForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const poll_id = this.route.snapshot.params['id'];
      const option_id = this.voteForm.get('optionId')?.value;

      this.pollsService.votePoll(poll_id, option_id).subscribe({
        next: (response: VoteResponse) => {
          this.poll = response.updatedPoll;
          this.hasVoted = true;
          this.isSubmitting = false;
          this.router.navigate(['']);
          alert('Vote successfully done');
        },
        error: (error) => {
          this.error = error;
          this.isSubmitting = false;
        },
      });
    }
  }
}
