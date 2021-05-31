import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from 'src/app/views/user/shared/user.service';
import {User} from "../shared/user.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      result => this.users = result,
      error => alert('Erro ao carregar Funcionários!')
    )
  }

  getLenghtCompanies(user: any) {
    return user.companies.length
  }

  createUser() {
    this.router.navigate(['/usuarios/new'])
  }

  deleteUser(user: any) {
    const mustDelete = confirm('Deseja deletar?');

    if (mustDelete) {
      this.userService.deleteUser(user.id).subscribe(
        () => this.users = this.users.filter(element => element != user)
      )
    }
  }

  back() {
    this.router.navigate(['/'])
  }

}
