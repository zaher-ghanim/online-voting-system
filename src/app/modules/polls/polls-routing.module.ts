import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollListComponent } from './poll-list/poll-list.component';
import { PollFormComponent } from './poll-form/poll-form.component';
import { AdminGuard } from '../../guards/admin.guard';

const routes: Routes = [
  { path: '', component: PollListComponent },
  { path: 'create', component: PollFormComponent, canActivate: [AdminGuard] },
  { path: 'edit/:id', component: PollFormComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollsRoutingModule {}
