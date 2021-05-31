import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompanyFormComponent } from "./company-form/company-form.component";
import { CompanyListComponent } from "./company-list/company-list.component";

export const routes: Routes = [
  {path: '', component: CompanyListComponent},
  {path: 'new', component: CompanyFormComponent},
  {path: ':id/edit', component: CompanyFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CompanyRoutingModule {
}