import { Component, Input } from '@angular/core';
import { Appoinment } from '../../interfaces/appoinments';

@Component({
  selector: 'app-appoinments-table',
  templateUrl: './appoinments-table.component.html',
  styles: [
  ]
})
export class AppoinmentsTableComponent {
  public pathUpdate = '/appoinments/update'
  public pathDelete = '/appoinments/delete'

  @Input()
  public appoinments: Appoinment[] = []
}
