import { Component, Input } from '@angular/core';
import { Affiliates } from '../../interfaces/affiliate';

@Component({
  selector: 'app-affiliates-table',
  templateUrl: './affiliates-table.component.html',
  styles: [
  ]
})
export class AffiliatesTableComponent {
  @Input()
  public affiliates : Affiliates[] = [];

  public pathUpdate = '/affiliates/update'
  public pathDelete = '/affiliates/delete'
}
