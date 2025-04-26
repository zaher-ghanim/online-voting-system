import { Injectable } from '@angular/core';
import { Votes } from '../models/votes.model';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  constructor() { }

  getAllVotes(): Votes[] {
    return JSON.parse(localStorage.getItem('votes') || '[]');
  }

  hasUserVotedInPoll(userId: string, pollId: string): boolean {
    const votes = this.getAllVotes();
    return votes.some(v => v.userid === userId && v.pollid === pollId);
  }

  recordVote(userId: string, pollId: string): void {
    const votes = this.getAllVotes();
    votes.push({ userid: userId, pollid: pollId });
    localStorage.setItem('votes', JSON.stringify(votes));
  }
}
