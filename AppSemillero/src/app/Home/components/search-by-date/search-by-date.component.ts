import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-by-date',
  templateUrl: './search-by-date.component.html',
  styles: [
  ]
})
export class SearchByDateComponent {

  fecha!: string;

  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();

  capturarFecha(event: any) {
    this.fecha = event.target.value;
    console.log('Fecha ingresada:', this.fecha);
    this.optionSelected.emit(this.fecha)
    // Aquí puedes realizar cualquier acción que desees con la fecha capturada
  }

}

