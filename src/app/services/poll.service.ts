import { Injectable } from '@angular/core';
import { Poll } from '../models/poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  constructor() { }

  createPoll(poll: Poll): void {
    const polls = JSON.parse(localStorage.getItem('polls') || '[]');
    polls.push(poll);
    localStorage.setItem('polls', JSON.stringify(polls));
  }

  getAllPolls(): Poll[] {
    const polls = JSON.parse(localStorage.getItem('polls') || '[]');
    return polls.sort((a: Poll, b: Poll) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getPollById(id: string): Poll | undefined {
    const polls = this.getAllPolls();
    return polls.find(poll => poll.id === id);
  }

  vote(pollId: string, optionId: string): void {
    const polls = this.getAllPolls();
    const pollIndex = polls.findIndex(p => p.id === pollId);

    if (pollIndex !== -1) {
      const optionIndex = polls[pollIndex].options.findIndex(o => o.id === optionId);
      if (optionIndex !== -1) {
        polls[pollIndex].options[optionIndex].votes++;
        localStorage.setItem('polls', JSON.stringify(polls));
      }
    }
  }

  togglePollStatus(pollId: string, isActive: boolean): void {
    const polls = this.getAllPolls();
    const pollIndex = polls.findIndex(p => p.id === pollId);

    if (pollIndex !== -1) {
      polls[pollIndex].isActive = isActive;
      localStorage.setItem('polls', JSON.stringify(polls));
    }
  }

  generatePollId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  generateOptionId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}