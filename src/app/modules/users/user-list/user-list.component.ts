import { Component } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass'],
})
export class UserListComponent {
  users: User[] = [];
  currentUserId: string | undefined;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.currentUserId = this.authService.getCurrentUser()?.id;
    this.loadUsers();
  }
  displayedColumns: string[] = ['username', 'role', 'actions'];

  loadUsers(): void {
    this.users = this.userService.getAllUsers();
  }

  deleteUser(userId: string): void {
    if (userId === this.currentUserId) {
      alert('You cannot delete your own account while logged in!');
      return;
    }

    if (confirm('Are you sure you want to delete this user?')) {
      const users = this.userService
        .getAllUsers()
        .filter((u) => u.id !== userId);
      localStorage.setItem('users', JSON.stringify(users));
      this.loadUsers();
    }
  }
}
