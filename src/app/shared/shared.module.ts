import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
  ],
  exports: [FormsModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class SharedModule { }
