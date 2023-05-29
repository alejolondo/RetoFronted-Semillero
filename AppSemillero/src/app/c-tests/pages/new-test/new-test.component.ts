import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestServiceService } from '../../services/test-service.service';
import { Test } from '../../interfaces/test';

import {  Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSuccessComponent } from 'src/app/shared/components/dialog-success/dialog-success.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styles: [
  ]
})
export class NewTestComponent {

  public testForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('',[Validators.required]),
  })

  public title: string = 'Pruebas - Nueva Prueba'

  constructor(
    private testService: TestServiceService,
    private snackBar : MatSnackBar,
    private dialog: MatDialog,
    private router: Router){}

  get currentTest() :Test{
    const test = this.testForm.value as Test
    return test
  }



  onSubmit():void {
    if(this.testForm.invalid){
      this.testForm.markAllAsTouched();
      return;
    }

    const dialogRef = this.dialog.open(DialogSuccessComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      if(this.currentTest){
      this.testService.addTest(this.currentTest)
      .subscribe(wasSaved => {

          this.showSnackBar(` Prueba guardada con éxito!`);
          this.router.navigate(['/tests/all'])

      })
    }
    });


}

  showSnackBar(message: string): void{
    this.snackBar.open(message, 'Hecho', {
      duration: 2500
    })
  }
}
