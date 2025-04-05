import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null = null;

  constructor() { }

login(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.username === username && u.password === password);

    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    }
    return this.currentUser;
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.isAdmin || false;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}
