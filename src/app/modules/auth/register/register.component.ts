import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isAdmin: [false],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        isAdmin: this.registerForm.value.isAdmin,
      };

      this.userService.createUser(user);
      this.router.navigate(['/auth/login']);
    }
  }
}
