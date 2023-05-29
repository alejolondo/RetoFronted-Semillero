import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Test } from '../../interfaces/test';
import { TestServiceService } from '../../services/test-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuccessComponent } from 'src/app/shared/components/dialog-success/dialog-success.component';

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styles: [
  ]
})
export class UpdateTestComponent  implements OnInit{

  public title:string = 'Pruebas - Actualizar Prueba'


  public testForm = new FormGroup({
    id: new FormControl<number | undefined>(0, [Validators.required]),
    name: new FormControl<string>('',  [Validators.required]),
    description: new FormControl<string>('',  [Validators.required]),
  })

  constructor(
    private testService: TestServiceService,
    private snackBar : MatSnackBar,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router){}

  ngOnInit(): void {
    this.activateRoute.params.
    pipe(switchMap(({id})=> this.testService.searchTestByID(+id)),
    ).subscribe(test => {
      const {id, name, description} = test;
      this.testForm.get('id')?.setValue(id);
      this.testForm.get('name')?.setValue(name);
      this.testForm.get('description')?.setValue(description);
      console.log(this.currentTest);

    })
  }

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
    this.testService.updateTest(this.currentTest)
    .subscribe(wasSaved => {

      this.showSnackBar(` Prueba actualizada con éxito!`);
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

