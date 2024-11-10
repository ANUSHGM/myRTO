import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  checker: boolean = false;

  constructor(private router: Router, private authStateService: AuthService) {}

  ngOnInit() {
    this.authStateService.check$.subscribe((value) => {
      this.checker = value;
    });
  }

  logout() {
    localStorage.removeItem('loggedInEmail'); // Clear stored email
    this.router.navigate(['/login']); // Redirect to login page
    this.authStateService.updateCheck(false); // Reset check value on logout
}}
