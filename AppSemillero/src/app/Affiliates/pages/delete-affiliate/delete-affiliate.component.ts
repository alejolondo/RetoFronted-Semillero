import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AffiliatesServiceService } from '../../services/affiliates-service.service';
import { Affiliates } from '../../interfaces/affiliate';
import { switchMap } from 'rxjs';
import { DialogDeleteComponent } from 'src/app/shared/components/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-delete-affiliate',
  templateUrl: './delete-affiliate.component.html',
  styles: [
  ]
})
export class DeleteAffiliateComponent implements OnInit {
  public title: string = 'Afiliados - Eliminar Afiliado';

  public affiliate: Affiliates ={
    id: 0,
    name: '',
    age: 0,
    email: ''
  }

  constructor(
    private dialog: MatDialog,
    private activetedRoute: ActivatedRoute,
    private router:Router,
    private snackBar : MatSnackBar,
    private affiliateService: AffiliatesServiceService
  ){}

  ngOnInit(): void {
    this.activetedRoute.params.
    pipe(
      switchMap(({id}) => this.affiliateService.searchAffiliateByID(id)),
    ).subscribe(affiliate => {

      const {id, name, age, email} = affiliate;
      this.affiliate.id = id;
      this.affiliate.name = name;
      this.affiliate.age = age;
      this.affiliate.email = email;
    })
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: this.affiliate
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      if(this.affiliate.id){
        this.affiliateService.deleteAffiliate(this.affiliate.id).subscribe(wasDeleted => {

          if(wasDeleted){
            this.showSnackBar(` Afiliado Eliminado con éxito!`);
            this.router.navigate(['/affiliates/all'])
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
