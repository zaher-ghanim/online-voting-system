import { Component } from '@angular/core';
import { Poll, PollOption } from '../../models/poll.model';
import { PollService } from '../../services/poll.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent {
  polls: Poll[] = [];
  currentUser: User | null = null;

  constructor(
    private pollService: PollService,
    private authService: AuthService,
    private voteService: VoteService
  ) {
    this.currentUser = this.authService.getCurrentUser();
    this.polls = this.pollService.getAllPolls();
  }
  hasVotedInPoll(pollId: string): boolean {
    if (!this.currentUser) return false;
    return this.voteService.hasUserVotedInPoll(this.currentUser.id, pollId);
  }

  vote(pollId: string, optionId: string): void {
    if (this.currentUser && !this.currentUser.hasVoted) {
      this.pollService.vote(pollId, optionId);
      this.voteService.recordVote(this.currentUser.id, pollId);

      // Update user's voting status
      this.authService.logout();
      this.authService.login(
        this.currentUser.username,
        this.currentUser.password
      );
      this.currentUser = this.authService.getCurrentUser();

      this.polls = this.pollService.getAllPolls();
    }
  }

  getTotalVotes(options: PollOption[]): number {
    return options.reduce((total, option) => total + option.votes, 0);
  }
}
