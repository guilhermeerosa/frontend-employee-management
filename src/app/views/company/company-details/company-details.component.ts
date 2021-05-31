import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/views/company/shared/company.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit{

  @Input() id: any;

  company: any;

  constructor(
    private companyService: CompanyService,
    private router: Router){
    }

  ngOnInit(){
    console.log(this.id)
    // this.companyService.showCompany(this.id).subscribe(
    //   (result) => {
    //     this.company = result;
    //   },
    //   (error) => {
    //     console.log(error)
    //   })

  }

  cancel(){
    this.router.navigate(['/empresas']);
  }
  
}
