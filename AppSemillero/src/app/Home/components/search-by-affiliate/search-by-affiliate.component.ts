import { Component, EventEmitter, Input, Output, OnInit, ElementRef } from '@angular/core';
import { Affiliates } from 'src/app/Affiliates/interfaces/affiliate';
import { AffiliatesServiceService } from 'src/app/Affiliates/services/affiliates-service.service';

@Component({
  selector: 'app-search-by-affiliate',
  templateUrl: './search-by-affiliate.component.html',
  styles: [
  ]
})
export class SearchByAffiliateComponent implements OnInit {

  public affiliates: Affiliates[] = [];

  constructor(private affiService: AffiliatesServiceService,
    private elementRef: ElementRef){}
    
  ngOnInit(): void {
    this.affiService.searchAffiliates().subscribe(affiliate=>{
      this.affiliates = affiliate
    })
  }


  @Output() optionSelected: EventEmitter<number> = new EventEmitter<number>();

  handleSelectChange() {
    const selectElement = this.elementRef.nativeElement.querySelector('select');
    const numericValue = parseInt(selectElement.value, 10);
    this.optionSelected.emit(numericValue);
  }
}

