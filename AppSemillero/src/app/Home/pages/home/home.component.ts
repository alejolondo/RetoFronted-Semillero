import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Affiliates } from '../../../Affiliates/interfaces/affiliate';
import { AffiliatesServiceService } from 'src/app/Affiliates/services/affiliates-service.service';
import { AppoinmentsService } from 'src/app/Appoinments/services/appoinments.service';
import { Appoinment } from 'src/app/Appoinments/interfaces/appoinments';
import { catchError, of } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class HomeComponent implements OnInit {
  public title: string = 'Consultas';

  columnsToDisplay = ['expand','id', 'name', 'age', 'email'];

  displayedColumns = ['id', 'date', 'hour', 'idTest','expand_second'];


  public affiliatesHome: Affiliates[] = [];
  public affiliatesCopy: Affiliates[] = [];

  public appoinments: Appoinment[] = [];
  public appoinmentsCopy: Appoinment[] = [...this.appoinments];

  public expandedElement: any|null;



  constructor(
    private affiliatesService: AffiliatesServiceService,
    private appoinmentService: AppoinmentsService,
    @Inject(DOCUMENT) private _document: Document

  ) {}

  ngOnInit(): void {
    this.allAffiliates();

  }



  allAffiliates(){
    this.affiliatesService.searchAffiliates().subscribe(affiliate => {
      this.affiliatesCopy = affiliate;
    })
  }

  searchAppointmentsByAffiliate(id: number)  {
    this.appoinmentService.searchAppoinmentByAffiliate(id).subscribe(response => {
     this.appoinmentsCopy = response;
    })
  }

  toggleRow(element: any, id: number) {
    element.expanded = !element.expanded;

    this.appoinments = [...this.appoinmentsCopy]

    // Filtrar la copia del array original en lugar del array original
    this.appoinments = this.appoinments.filter(appointment => appointment.idAffiliates === id);

  }



  searchAffiliate(id: number) {
    if(!id) {
      this.refreshPage()
    }
    this.affiliatesHome = this.affiliatesCopy.filter(affiliate => affiliate.id===id)
    this.searchAppointmentsByAffiliate(id)
  }



  searchAppointments(date: string){

    this.appoinmentService.searchAppoinmentByDate(date).subscribe(response =>{
      if(!response) {
        this.refreshPage()
      }
      this.appoinments = response
      this.appoinmentsCopy = this.appoinments.slice(0)

      this.affiliatesHome=this.affiliatesCopy.filter(b=>
        response.map(c=> c.idAffiliates).includes(b.id!)
        )
    }
    )}

    refreshPage() {
      this._document.location.reload();
    }




}
