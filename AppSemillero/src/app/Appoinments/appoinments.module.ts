import { NgModule } from '@angular/core';

import { AppoinmentsComponent } from './pages/appoinments/appoinments.component';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppoinmentsRoutingModule } from './appoinments-routing.module';
import { AppoinmentsTableComponent } from './components/appoinments-table/appoinments-table.component';
import { NewAppoinmentComponent } from './pages/new-appoinment/new-appoinment.component';
import { UpdateAppoinmentComponent } from './pages/update-appoinment/update-appoinment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { DeleteAppointmentComponent } from './pages/delete-appointment/delete-appointment.component';


@NgModule({
  imports: [
    AppoinmentsRoutingModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    DatePipe,
    MaterialModule
  ],
  exports: [],
  declarations: [
    AppoinmentsComponent,
    AppoinmentsTableComponent,
    NewAppoinmentComponent,
    UpdateAppoinmentComponent,
    DeleteAppointmentComponent
  ],
  providers: [DatePipe],
})
export class AppoinmentsModule { }
