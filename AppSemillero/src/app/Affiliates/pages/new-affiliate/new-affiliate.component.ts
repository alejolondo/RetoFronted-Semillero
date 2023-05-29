import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AffiliatesServiceService } from '../../services/affiliates-service.service';
import { Affiliates } from '../../interfaces/affiliate';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogSuccessComponent } from 'src/app/shared/components/dialog-success/dialog-success.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-affiliate',
  templateUrl: './new-affiliate.component.html',
  styles: []
})
export class NewAffiliateComponent {

  public title: string = 'Afiliados - Nuevo Afiliado'

  public affiliatesForm = new FormGroup({
    name: new FormControl<string>('',  [Validators.required]),
    age: new FormControl<number>(0,  [Validators.required, Validators.min(1)]),
    email: new FormControl<string>('',  [Validators.required, Validators.email]),
  })

  constructor(private affiliateService: AffiliatesServiceService,
    private snackBar : MatSnackBar,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
    ){}

  get currentAffiliate(): Affiliates {
    const affiliate = this.affiliatesForm.value as Affiliates;
    return affiliate;
  }

  onSubmit():void{
    if(this.affiliatesForm.invalid){
      this.affiliatesForm.markAllAsTouched();
      return;
    }
    const dialogRef = this.dialog.open(DialogSuccessComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      if(this.currentAffiliate){
        this.affiliateService.addAffiliate(this.currentAffiliate)
        .subscribe(affiliate => {
        this.showSnackBar(` Afiliado guardado con éxito!`);
        this.router.navigate(['/affiliates/all'])
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
