import { Component } from '@angular/core';
import { Appoinment } from '../../interfaces/appoinments';
import { AppoinmentsService } from '../../services/appoinments.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DialogDeleteComponent } from 'src/app/shared/components/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-delete-appointment',
  templateUrl: './delete-appointment.component.html',
  styles: [
  ]
})
export class DeleteAppointmentComponent {
  public title: string = 'Pruebas - Eliminar Prueba'

  public appoinment: Appoinment = {
    id: 0,
    date: '',
    hour: '',
    idTest: 0,
    idAffiliates: 0
  }


  constructor(
    private  appoinmentService: AppoinmentsService,
    private dialog: MatDialog,
    private activetedRoute: ActivatedRoute,
    private router:Router,
    private snackBar : MatSnackBar,){}


  ngOnInit(): void {
    this.activetedRoute.params.
    pipe(
      switchMap(({id}) => this.appoinmentService.searchAppoinmentByID(id)),
    ).subscribe(appoinment => {

      const {id, date, hour, idTest, idAffiliates} = appoinment;
      this.appoinment.id = id;
      this.appoinment.date = date;
      this.appoinment.hour = hour;
      this.appoinment.idTest = idTest;
      this.appoinment.idAffiliates = idAffiliates;


    })
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: this.appoinment
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      if(this.appoinment.id){
        this.appoinmentService.deleteAppoinment(this.appoinment.id).subscribe(wasDeleted => {

          if(wasDeleted){
            this.showSnackBar(` Cita Eliminada con éxito!`);
            this.router.navigate(['/appoinments/all'])
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
