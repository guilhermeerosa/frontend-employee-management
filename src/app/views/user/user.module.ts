import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  declarations: [
    UserFormComponent,
    UserListComponent
  ],
  exports: [
    UserListComponent
  ],
  providers: [],
})

export class UserModule { }
