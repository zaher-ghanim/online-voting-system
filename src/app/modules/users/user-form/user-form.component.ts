import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  currentUserId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isAdmin: [false]
    });
  }

  ngOnInit(): void {
    this.currentUserId = this.route.snapshot.paramMap.get('id');
    if (this.currentUserId) {
      this.isEditMode = true;
      const user = this.userService.getUserById(this.currentUserId);
      if (user) {
        this.userForm.patchValue({
          username: user.username,
          isAdmin: user.isAdmin
        });
        // Don't pre-fill password for security reasons
      }
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = {
        id: this.isEditMode && this.currentUserId ? this.currentUserId : Math.random().toString(36).substr(2, 9),
        username: this.userForm.value.username,
        password: this.userForm.value.password,
        isAdmin: this.userForm.value.isAdmin
      };

      if (this.isEditMode) {
        const users = this.userService.getAllUsers().filter(u => u.id !== this.currentUserId);
        const usernameExists = users.some((u: User) => u.username === user.username);

        if (usernameExists) {
          alert(" User not created, username already exists.");
          return;
        }
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
      }
      else {
        this.userService.createUser(user);
      }

      this.router.navigate(['/users']);
    }
  }
}