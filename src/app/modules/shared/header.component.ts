import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone:false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']  // Changed from .sass to .scss to match our setup
})
export class HeaderComponent {
  currentUser: User | null = null;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser = this.authService.getCurrentUser();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentUser = this.authService.getCurrentUser();
      });
  }

  

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}