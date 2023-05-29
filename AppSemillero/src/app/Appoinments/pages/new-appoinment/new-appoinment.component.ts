import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { AppoinmentsService } from '../../services/appoinments.service';
import { Appoinment } from '../../interfaces/appoinments';
import { Test } from 'src/app/c-tests/interfaces/test';
import { Affiliates } from 'src/app/Affiliates/interfaces/affiliate';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuccessComponent } from 'src/app/shared/components/dialog-success/dialog-success.component';


@Component({
  selector: 'app-new-appoinment',
  templateUrl: './new-appoinment.component.html',
  styles: []
})
export class NewAppoinmentComponent implements OnInit {
  public title: string = 'Citas - Nueva cita';
  public tests: Test[] = [];
  public affiliates: Affiliates[] = [];



  public appoinmentForm = new FormGroup({
    date: new FormControl<string>('',  [Validators.required]),
    hour: new FormControl<string>('',  [Validators.required]),
    idTest: new FormControl<number>(0,  [Validators.min(1)]),
    idAffiliates: new FormControl<number>(0,  [Validators.min(1)]),
  });



  constructor(
    private apoinmentService: AppoinmentsService,
    private datePipe: DatePipe,
    private snackBar : MatSnackBar,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.apoinmentService.searchTest().subscribe((tests) => {
      this.tests = tests;
    });

    this.apoinmentService.searchAffiliate().subscribe((affiliates) => {
      this.affiliates = affiliates;
    });

  }


  get currentAppoinment(): Appoinment {
    const appoinment = this.appoinmentForm.value as Appoinment;
    return appoinment;
  }


  onSubmit(): void {
    if(this.appoinmentForm.invalid){
      this.appoinmentForm.markAllAsTouched();
      return;
    }

    const dialogRef = this.dialog.open(DialogSuccessComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      if(this.currentAppoinment){

    this.currentAppoinment.date =  moment(this.currentAppoinment.date).format('DD/MM/YYYY');
    this.apoinmentService.addAppoinmet(this.currentAppoinment).subscribe((appoinment) => {
      this.showSnackBar(` Cita guardada con éxito!`);
      this.router.navigate(['/appoinments/all'])
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
