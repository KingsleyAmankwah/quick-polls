export interface PollMetadata {
  color?: string;
  icon?: string;
  description?: string;
}

export interface PollOption {
  id?: string;
  text: string;
  votes: number;
  metadata: PollMetadata;
}

export interface Poll {
  id: string;
  question: string;
  created: Date;
  totalVotes: number;
  options: {
    id: string;
    text: string;
    votes: number;
  }[];
}

export interface CreatePollDto {
  question: string;
  identifier: string;
  data: Record<string, unknown>;
  options: Array<{
    text: string;
    data: Record<string, unknown>;
  }>;
}

export interface VoteResponse {
  success: boolean;
  updatedPoll: Poll;
  message?: string;
}

export interface PollApiResponse {
  status: string;
  statusCode: number;
  data: {
    docs: PollResponse[];
    totalDocs: number;
    offset: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
}

export interface PollResponse {
  data: string | null;
  identifier: string;
  question: string;
  created_at: string;
  updated_at: string;
  id: string;
  entity: string;
  options: {
    data: string | null;
    text: string;
    votes_count: number;
    poll_id: string;
    created_at: string;
    updated_at: string;
    id: string;
    entity: string;
  }[];
}
