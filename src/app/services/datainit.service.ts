import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatainitService {

  // constructor(private http: HttpClient) { }

  initializeData(): void {
    if (!localStorage.getItem('users')) {
      const initialUsers: User[] = [
        {
          id: 'admin1',
          username: 'admin',
          password: 'admin',
          isAdmin: true
        },
        {
          id: 'v1',
          username: 'voter1',
          password: 'voter1',
          isAdmin: false
        }
      ];
      localStorage.setItem('users', JSON.stringify(initialUsers));
      localStorage.setItem('polls', JSON.stringify([]));
    }
  }
}
