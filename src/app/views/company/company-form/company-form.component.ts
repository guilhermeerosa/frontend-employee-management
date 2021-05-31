import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CompanyService } from 'src/app/views/company/shared/company.service';
import { User } from '../../user/shared/user.model';
import { UserService } from '../../user/shared/user.service';
import { Company } from '../shared/company.model';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit, AfterContentChecked {

  currentAction: string = '';
  companyForm!: FormGroup;
  pageTitle: string = '';
  submittingForm: boolean = false;
  company: Company = new Company();

  users: User[] = [];

  constructor(
    private companyService: CompanyService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildUserForm();
    this.loadCompany();
    this.loadUsers();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == 'new') {
      this.createCompany();
    } else {
      this.updateCompany();
    }
  }

  cancel() {
    this.router.navigate(['/empresas']);
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (result) => {
        this.users = result;
      },
      (error) => {
        alert('Erro ao carregar Funcionários')
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
    this.companyForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      cnpj: [null, [Validators.required]],
      address: [null, [Validators.required]],
      users: [null]
    })
  }

  private loadCompany() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.companyService.getCompany(params.get("id")))
      )
        .subscribe(
          (company) => {
            this.company = company
            this.companyForm.patchValue(company) //preenchendo o formulario
          }
        )
    }
  }

  private setPageTitle() {
    if (this.currentAction == "new") {
      this.pageTitle = 'Cadastro de Empresa'
    } else {
      this.pageTitle = 'Detalhes da Empresa'
    }
  }

  private createCompany() {
    const company: Company = Object.assign(new Company(), this.companyForm.value);
    this.companyService.createCompany(company).subscribe(
      company => {
        alert('Solicitação processada com sucesso.')
        // this.toastr.success('Solicitação processada com sucesso.')
        this.router.navigate(['/empresas'])},
      error => alert('Ocorreu um erro ao processar a solicitação')
      // this.toastr.error('Ocorreu um erro ao processar a solicitação')
    )
  }

  private updateCompany(){
    const company: Company = Object.assign(new Company(), this.companyForm.value);
    this.companyService.updateCompany(company).subscribe(
      user => {
        alert('Solicitação processada com sucesso.')
        // this.toastr.success('Solicitação processada com sucesso.')
        this.router.navigate(['/usuarios/'+ user.id])},
      error => alert('Ocorreu um erro ao processar a solicitação')
      // this.toastr.error('Ocorreu um erro ao processar a solicitação')
    )
  }

}
