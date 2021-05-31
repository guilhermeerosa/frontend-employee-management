import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/views/user/shared/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{

  user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (result) => {
        this.user = result
      },
      (error) => {
        console.log(error)
      })
  }

}
