import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserFormComponent } from "./user-form/user-form.component";
import { UserListComponent } from "./user-list/user-list.component";

export const routes: Routes = [
  {path: '', component: UserListComponent},
  {path: 'new', component: UserFormComponent},
  {path: ':id/edit', component: UserFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {
}
