import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  CreatePollDto,
  Poll,
  PollApiResponse,
  PollResponse,
  VoteResponse,
} from '../model/poll.interface';
import { environment } from '../../environments/environment-dev';
interface ApiResponse<T> {
  data: T;
  status: string;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PollsService {
  private http = inject(HttpClient);
  private BASE_URL = environment.BASE_URL;

  createPoll(poll: CreatePollDto): Observable<CreatePollDto> {
    return this.http.post<CreatePollDto>(`${this.BASE_URL}/create/poll`, poll);
  }

  getPolls(): Observable<Poll[]> {
    return this.http.get<PollApiResponse>(`${this.BASE_URL}/get/polls`).pipe(
      map((response) =>
        response.data.docs.map((pollResponse) => ({
          id: pollResponse.id,
          question: pollResponse.question,
          created: new Date(pollResponse.created_at),
          totalVotes: pollResponse.options.reduce(
            (sum, option) => sum + option.votes_count,
            0
          ),
          options: pollResponse.options.map((option) => ({
            id: option.id,
            text: option.text,
            votes: option.votes_count,
          })),
        }))
      )
    );
  }

  getPoll(poll_id: string): Observable<Poll> {
    return this.http
      .get<ApiResponse<PollResponse>>(`${this.BASE_URL}/get/poll/${poll_id}`)
      .pipe(
        map((response) => {
          const pollResponse = response.data;
          return {
            id: pollResponse.id,
            question: pollResponse.question,
            created: new Date(pollResponse.created_at),
            totalVotes: pollResponse.options.reduce(
              (sum, option) => sum + option.votes_count,
              0
            ),
            options: pollResponse.options.map((option) => ({
              id: option.id,
              text: option.text,
              votes: option.votes_count,
            })),
          };
        })
      );
  }

  votePoll(poll_id: string, option_id: string): Observable<VoteResponse> {
    return this.http.post<VoteResponse>(`${this.BASE_URL}/create/vote`, {
      poll_id,
      option_id,
    });
  }
}
