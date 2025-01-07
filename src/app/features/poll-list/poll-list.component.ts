import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { PollsService } from '../../services/polls.service';

import { Poll } from '../../model/poll.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll-list',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './poll-list.component.html',
  styleUrl: './poll-list.component.css',
})
export class PollListComponent implements OnInit {
  polls: Poll[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private pollsService: PollsService, public router: Router) {}

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls(): void {
    this.isLoading = true;
    this.error = null;

    this.pollsService.getPolls().subscribe({
      next: (polls) => {
        this.polls = polls;
        console.log('Polls:', polls);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading polls:', error);
        this.error = 'Failed to load polls. Please try again.';
        this.isLoading = false;
      },
    });
  }
}
