import { NgModule } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AddBtnComponent } from './components/add-btn/add-btn.component';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { MaterialModule } from '../material/material.module';
import { DialogSuccessComponent } from './components/dialog-success/dialog-success.component';



@NgModule({
  imports:
  [RouterModule,
  CommonModule,
  MaterialModule
],
  exports: [
    NavBarComponent,
    HeaderComponent,
    AddBtnComponent,
  ],
  declarations: [
    NavBarComponent,
    HeaderComponent,
    AddBtnComponent,
    DialogDeleteComponent,
    DialogSuccessComponent
  ],
  providers: [],
})
export class SharedModule { }
