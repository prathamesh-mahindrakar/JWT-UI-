import { Component } from '@angular/core';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {

  message: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.forUser();
  }

  forUser() {
    this.userService.forUser().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      },
      (error) => {
        console.log(error);
        alert('Error occurred while fetching user data');
      }
    );

  }
}