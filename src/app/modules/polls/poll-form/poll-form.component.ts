import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Poll } from '../../../models/poll.model';
import { AuthService } from '../../../services/auth.service';
import { PollService } from '../../../services/poll.service';

@Component({
  selector: 'app-poll-form',
  standalone: false,
  templateUrl: './poll-form.component.html',
  styleUrls: ['./poll-form.component.sass'],
})
export class PollFormComponent implements OnInit {
  pollForm: FormGroup;
  isEditMode = false;
  currentPollId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private pollService: PollService,
    private authService: AuthService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.pollForm = this.fb.group({
      question: ['', Validators.required],
      options: this.fb.array(
        [this.createOption(), this.createOption()],
        Validators.minLength(2)
      ),
    });
  }

  ngOnInit(): void {
    this.currentPollId = this.route.snapshot.paramMap.get('id');
    if (this.currentPollId) {
      this.isEditMode = true;
      const poll = this.pollService.getPollById(this.currentPollId);
      if (poll) {
        this.pollForm.patchValue({
          question: poll.question,
        });
        this.options.clear();
        poll.options.forEach((option) => {
          this.options.push(
            this.fb.group({
              text: [option.text, Validators.required],
            })
          );
        });
      }
    }
  }

  get options(): FormArray {
    return this.pollForm.get('options') as FormArray;
  }

  createOption(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
    });
  }

  addOption(): void {
    this.options.push(this.createOption());
  }

  removeOption(index: number): void {
    if (this.options.length > 2) {
      this.options.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.pollForm.valid) {
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser) return;

      const poll: Poll = {
        id:
          this.isEditMode && this.currentPollId
            ? this.currentPollId
            : this.pollService.generatePollId(),
        question: this.pollForm.value.question,
        options: this.pollForm.value.options.map((option: any) => ({
          id: this.pollService.generateOptionId(),
          text: option.text,
          votes: 0,
        })),
        createdBy: currentUser.username,
        createdAt: new Date(),
        isActive: true,
      };

      if (this.isEditMode) {
        const polls = this.pollService
          .getAllPolls()
          .filter((p) => p.id !== this.currentPollId);
        polls.push(poll);
        localStorage.setItem('polls', JSON.stringify(polls));
      } else {
        this.pollService.createPoll(poll);
      }

      this.router.navigate(['/polls']);
    }
  }
}
