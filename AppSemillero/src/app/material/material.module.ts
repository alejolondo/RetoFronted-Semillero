import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatTableModule,
    NgFor,
     MatButtonModule,
     NgIf,
     MatIconModule,
     MatFormFieldModule,
     MatIconModule,


  ],
  exports: [
    MatTableModule,
    NgFor,
     MatButtonModule,
     NgIf,
     MatIconModule,
     MatDialogModule,
     MatFormFieldModule,
  ]
})
export class MaterialModule { }
