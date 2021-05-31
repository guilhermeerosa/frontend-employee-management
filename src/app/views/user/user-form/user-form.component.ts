import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {CompanyService} from 'src/app/views/company/shared/company.service';
import {UserService} from 'src/app/views/user/shared/user.service';
import {User} from "../shared/user.model";
import {switchMap} from "rxjs/operators";
import { Company } from '../../company/shared/company.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, AfterContentChecked {

  currentAction: string = '';
  userForm!: FormGroup;
  pageTitle: string = '';
  submittingForm: boolean = false;
  user: User = new User();

  companies: Company[] = [];

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildUserForm();
    this.loadUser();
    this.loadCompanies();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == 'new') {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  cancel() {
    this.router.navigate(['/usuarios']);
  }

  loadCompanies() {
    this.companyService.getCompanies().subscribe(
      (result) => {
        this.companies = result;
      },
      (error) => {
        alert('Erro ao carregar Empresas')
      })
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new"
    } else {
      this.currentAction = "edit"
    }
  }

  private buildUserForm() {
    this.userForm = this.formBuilder.group({
      id: [null],
      login: [null, [Validators.required]],
      name: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      email: [null, [Validators.required]],
      address: [null, [Validators.required]],
      password: [null, [Validators.required]],
      companies: [null]
    })
  }

  private loadUser() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.userService.getUser(params.get("id")))
      )
        .subscribe(
          (user) => {
            this.user = user
            this.userForm.patchValue(user) //preenchendo o formulario
          }
        )
    }
  }

  private setPageTitle() {
    if (this.currentAction == "new") {
      this.pageTitle = 'Cadastro de Funcionário'
    } else {
      this.pageTitle = 'Detalhes do Funcionário'
    }
  }

  private createUser() {
    const user: User = Object.assign(new User(), this.userForm.value);
    this.userService.createUser(user).subscribe(
      user => {
        alert('Solicitação processada com sucesso.')
        // this.toastr.success('Solicitação processada com sucesso.')
        this.router.navigate(['/usuarios'])},
      error => alert('Ocorreu um erro ao processar a solicitação')
      // this.toastr.error('Ocorreu um erro ao processar a solicitação')
    )
  }

  private updateUser(){
    const user: User = Object.assign(new User(), this.userForm.value);
    this.userService.updateUser(user).subscribe(
      user => {
        alert('Solicitação processada com sucesso.')
        // this.toastr.success('Solicitação processada com sucesso.')
        this.router.navigate(['/usuarios/'+ user.id])},
      error => alert('Ocorreu um erro ao processar a solicitação')
      // this.toastr.error('Ocorreu um erro ao processar a solicitação')
    )
  }
}
