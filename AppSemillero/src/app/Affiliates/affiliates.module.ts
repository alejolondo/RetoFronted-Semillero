import { NgModule } from '@angular/core';
import { AffiliatesComponent } from './pages/affiliates/affiliates.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AffiliatesRoutingModule } from './affiliates-routing.module';
import { AffiliatesTableComponent } from './components/affiliates-table/affiliates-table.component';
import { NewAffiliateComponent } from './pages/new-affiliate/new-affiliate.component';
import { UpdateAffiliateComponent } from './pages/update-affiliate/update-affiliate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { DeleteAffiliateComponent } from './pages/delete-affiliate/delete-affiliate.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AffiliatesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [],
  declarations: [AffiliatesComponent, AffiliatesTableComponent, NewAffiliateComponent, UpdateAffiliateComponent, DeleteAffiliateComponent],
  providers: [],
})
export class AffiliatesModule { }
