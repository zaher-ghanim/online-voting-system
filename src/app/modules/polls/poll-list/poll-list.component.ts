import { Component } from '@angular/core';
import { Poll, PollOption } from '../../../models/poll.model';
import { AuthService } from '../../../services/auth.service';
import { PollService } from '../../../services/poll.service';

@Component({
  selector: 'app-poll-list',
  standalone: false,
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.sass'],
})
export class PollListComponent {
  polls: Poll[] = [];
  isAdmin: boolean = false;

  constructor(
    private pollService: PollService,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin();
    this.loadPolls();
  }

  loadPolls(): void {
    this.polls = this.pollService.getAllPolls();
  }

  togglePollStatus(pollId: string, isActive: boolean): void {
    this.pollService.togglePollStatus(pollId, isActive);
    this.loadPolls();
  }

  deletePoll(pollId: string): void {
    const polls = this.pollService.getAllPolls().filter((p) => p.id !== pollId);
    localStorage.setItem('polls', JSON.stringify(polls));
    this.loadPolls();
  }

  getTotalVotes(options: PollOption[]): number {
    return options.reduce((total, option) => total + option.votes, 0);
  }
}
