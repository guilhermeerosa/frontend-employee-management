import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/views/company/shared/company.service';
import { Company } from '../shared/company.model';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies: Company[] = [];

  constructor(
    private companyService: CompanyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(
      result => this.companies = result,
      error => alert('Erro ao carregar Empresas!')
    )
  }

  getLengthUsers(company: any){
    return company.users.length;
  }

  createCompany(){
    this.router.navigate(['/empresas/new'])
  }

  deleteCompany(company: any) {
    const mustDelete = confirm('Deseja deletar?');

    if (mustDelete) {
      this.companyService.deleteUser(company.id).subscribe(
        () => this.companies = this.companies.filter(element => element != company)
      )
    }
  }

  back() {
    this.router.navigate(['/'])
  }

  // showCompany(id: number){
  //   this.router.navigate(['/empresas/' + id])
  // }

}
