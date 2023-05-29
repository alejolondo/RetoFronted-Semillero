import { Component, OnInit } from '@angular/core';
import { Appoinment } from '../../interfaces/appoinments';
import { AppoinmentsService } from '../../services/appoinments.service';

@Component({
  selector: 'app-appoinments',
  templateUrl: './appoinments.component.html',
  styles: [
  ]
})
export class AppoinmentsComponent implements OnInit {


  public appoinments: Appoinment[] = []
  public title:string = 'Citas'
  public btnText: string = 'Nueva cita'
  public redirectTo: string = "/appoinments/new"


  constructor(private appoinmentService: AppoinmentsService){}

   ngOnInit(): void {
    this.appoinmentService.searchAppoinments()
    .subscribe(appoinments => {
      this.appoinments = appoinments;
    });
}

}
