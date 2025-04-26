import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

 
  createUser(user: User): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if username already exists
    const usernameExists = users.some((u: User) => u.username === user.username);

    if (usernameExists) {
      alert(" User not created, username already exists.");
    return;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }


  getAllUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  getUserById(id: string): User | undefined {
    const users = this.getAllUsers();
    return users.find(user => user.id === id);
  }

  updateUserHasVoted(userId: string): void {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex].hasVoted = true;
      localStorage.setItem('users', JSON.stringify(users));
    }
  }
}