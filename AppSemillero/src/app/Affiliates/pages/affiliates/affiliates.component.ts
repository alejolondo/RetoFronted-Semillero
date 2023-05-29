import { Component, OnInit } from '@angular/core';
import { Affiliates } from '../../interfaces/affiliate';
import { AffiliatesServiceService } from '../../services/affiliates-service.service';

@Component({
  selector: 'app-affiliates',
  templateUrl: './affiliates.component.html',
  styles: [
  ]
})
export class AffiliatesComponent implements OnInit {
  public affiliates: Affiliates[] = [];
  public titulo: string = 'Afiliados'
  public btnText: string = 'Nuevo Afiliado'
  public redirectTo: string = '/affiliates/new'

  constructor(private affiliatesService: AffiliatesServiceService){}

  ngOnInit(): void {
    this.affiliatesService.searchAffiliates()
    .subscribe(affiliates => {
      this.affiliates = affiliates;
    });
  }
}
