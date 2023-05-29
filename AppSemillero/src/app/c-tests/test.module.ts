import { NgModule } from '@angular/core';
import { TestsComponent } from './pages/tests/tests.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TestRoutingModule } from './test-routing.module';
import { TestTableComponent } from './components/test-table/test-table.component';
import { NewTestComponent } from './pages/new-test/new-test.component';
import { UpdateTestComponent } from './pages/update-test/update-test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { DeleteTestComponent } from './pages/delete-test/delete-test.component';




@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    TestRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [],
  declarations: [
    TestsComponent,
    TestTableComponent,
    NewTestComponent,
    UpdateTestComponent,
    DeleteTestComponent,
  ],
  providers: [],
})
export class TestModule { }
