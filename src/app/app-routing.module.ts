import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect root to /login
  // { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }, {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'polls',
    loadChildren: () => import('./modules/polls/polls.module').then(m => m.PollsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
