import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuth } from '../services/user-auth';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  constructor(private userAuth: UserAuth, private router: Router, public userService: UserService) { }

  public isLoggedIn(): boolean {
    return this.userAuth.isLoggedIn();
  }

  public logout(): void {
    this.userAuth.clear();
    this.router.navigate(['home']);
  }

}
