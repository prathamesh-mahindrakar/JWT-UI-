import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../services/user-service';
import { UserAuth } from '../services/user-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private userService: UserService, private userAuth: UserAuth, private router: Router) { }

  onLogin(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe((response: any) => {
      console.log('Login successful', response);

      this.userAuth.setToken(response.token);
      this.userAuth.setRoles(response.user.role);


      const role = response.user.role[0].roleName;
      if (role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/user']);
      }


    }, error => {
      console.error('Login failed', error);
    });
  }

}
