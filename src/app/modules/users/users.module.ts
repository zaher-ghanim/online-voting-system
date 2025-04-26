import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule 
  ]
})
export class UsersModule { }