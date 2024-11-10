import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
// import { MatErrorModule } from '@angular/material';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule
      ],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  check:boolean = true;

  constructor(private authService: AuthService, private router: Router   ) {}
  ngOnInit(): void {
    this.authService.updateCheck(false); // Set check to false initially (logged out)
  }


  onSubmit() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe((response: any) => {
       
        console.log(response.message)
          if (response.message === 1) {
            // Redirect to employee pag
            this.authService.updateCheck(true); // Set check to true on successful login
            this.router.navigate(['/employee']);
          } else if (response.message === 2) {
            // Redirect to manager page
            this.authService.updateCheck(true); // Set check to true on successful login

            this.router.navigate(['/manager']);

          } else {
            console.log('Invalid login');
            alert("Invalid login")

          }
          // Save the email for future use, if needed
          localStorage.setItem('loggedInEmail', this.email);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
    
  }}