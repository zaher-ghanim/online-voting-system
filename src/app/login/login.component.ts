import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent
 {

  constructor(private authService: AuthService, private router: Router) { }
  error = '';

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  title = 'Login';
  onSubmit(): void {
    if (this.loginForm.valid) {
      const userName = this.loginForm.value.userName ?? ''; // Ensures it'  s always a string
      const password = this.loginForm.value.password ?? '';

      if (this.authService.login(userName, password)) {
        console.log("valid");
      } else {
        console.log("Invalid username or password");
        this.error = 'Invalid username or password';

      }
    }
  }

  // we need to match the credentials provided by the user with the ones saved in the local storage
  // we need to save the creedentials somewhere and authorize the user
}
// titleChangedLogin(title: string): void {
//   console.log(this.title);
// }
// }
