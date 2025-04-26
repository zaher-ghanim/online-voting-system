import { Component } from '@angular/core';
import { Poll, PollOption } from '../../models/poll.model';  // Updated path to match structure
import { PollService } from '../../services/poll.service';  // Updated path
import { AuthService } from '../../services/auth.service';  // Updated path
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']  // Changed from .sass to .scss
})
export class DashboardComponent {
  polls: Poll[] = [];
  currentUser: User | null = null;  // Initialize as null, set in constructor

  constructor(
    private pollService: PollService,
    private authService: AuthService,
    private voteService: VoteService
  ) {
    this.currentUser = this.authService.getCurrentUser();  // Moved here
    this.polls = this.pollService.getAllPolls();
  }
  hasVotedInPoll(pollId: string): boolean {
    if (!this.currentUser) return false;
    return this.voteService.hasUserVotedInPoll(this.currentUser.id, pollId);
  }


  vote(pollId: string, optionId: string): void {
    if (this.currentUser && !this.currentUser.hasVoted) {
      this.pollService.vote(pollId, optionId);
      this.voteService.recordVote(this.currentUser.id, pollId);  // Record the vote

      // Update user's voting status
      this.authService.logout();
      this.authService.login(this.currentUser.username, this.currentUser.password);
      this.currentUser = this.authService.getCurrentUser();  // Refresh current user

      this.polls = this.pollService.getAllPolls();  // Refresh polls
    }
  }

  getTotalVotes(options: PollOption[]): number {
    return options.reduce((total, option) => total + option.votes, 0);
  }
}