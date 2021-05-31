import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyRoutingModule } from './company-routing.module';

@NgModule({
  imports: [
    CompanyRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    CompanyFormComponent,
    CompanyListComponent,
    CompanyDetailsComponent
  ],
  exports: [
    CompanyListComponent
  ],
  providers: [],
})
export class CompanyModule { }
