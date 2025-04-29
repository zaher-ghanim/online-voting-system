import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollsRoutingModule } from './polls-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PollListComponent } from './poll-list/poll-list.component';
import { PollFormComponent } from './poll-form/poll-form.component';
import { SharedModule } from '../shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PollListComponent, PollFormComponent],
  imports: [
    CommonModule,
    PollsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class PollsModule {}
[];
