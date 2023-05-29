import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute,  Router } from '@angular/router';
import { TestServiceService } from '../../services/test-service.service';
import { switchMap } from 'rxjs';
import { Test } from '../../interfaces/test';
import { DialogDeleteComponent } from 'src/app/shared/components/dialog-delete/dialog-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-test',
  templateUrl: './delete-test.component.html',
  styles: [
  ]
})
export class DeleteTestComponent implements OnInit {
  public title: string = 'Pruebas - Eliminar Prueba'

  public test: Test = {
    id: 0,
    name: '',
    description: ''
  }


  constructor(
    private  testService: TestServiceService,
    private dialog: MatDialog,
    private activetedRoute: ActivatedRoute,
    private router:Router,
    private snackBar : MatSnackBar,){}


  ngOnInit(): void {
    this.activetedRoute.params.
    pipe(
      switchMap(({id}) => this.testService.searchTestByID(id)),
    ).subscribe(test => {

      const {id, name, description} = test;
      this.test.id = id;
      this.test.name = name;
      this.test.description = description

    })
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: this.test
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      if(this.test.id){
        this.testService.deleTest(this.test.id).subscribe(wasDeleted => {

          if(wasDeleted){
            this.showSnackBar(` Prueba Eliminada con éxito!`);
            this.router.navigate(['/tests/all'])
          }
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
