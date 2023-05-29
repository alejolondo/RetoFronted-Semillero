import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AffiliatesServiceService } from '../../services/affiliates-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Affiliates } from '../../interfaces/affiliate';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuccessComponent } from 'src/app/shared/components/dialog-success/dialog-success.component';

@Component({
  selector: 'app-update-affiliate',
  templateUrl: './update-affiliate.component.html',
  styles: [
  ]
})
export class UpdateAffiliateComponent implements OnInit {

  public title:string = 'Afiliados - Actualizar Afiliado'

  public affiliatesForm = new FormGroup({
    id: new FormControl<number | undefined>(0, {nonNullable: true}),
    name: new FormControl<string>('',  [Validators.required]),
    age: new FormControl<number>(0,  [Validators.required, Validators.min(1)]),
    email: new FormControl<string>('',  [Validators.required, Validators.email]),
  })

  constructor(
    private affiliateService: AffiliatesServiceService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar : MatSnackBar,
  ){}


  ngOnInit(): void {
    this.activateRoute.params.
    pipe(switchMap(({id})=> this.affiliateService.searchAffiliateByID(+id)),
    ).subscribe(affiliate => {
      const { id, name, age, email } = affiliate;
      this.affiliatesForm.get('name')?.setValue(name);
      this.affiliatesForm.get('age')?.setValue(age);
      this.affiliatesForm.get('email')?.setValue(email);
      this.affiliatesForm.get('id')?.setValue(id);
  

    })
  }

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
    this.affiliateService.updateAffiliate(this.currentAffiliate)
    .subscribe(affiliate => {
      this.showSnackBar(` Afiliado actualizado con éxito!`);
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
