import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-btn',
  templateUrl: './add-btn.component.html',
  styles: [
  ]
})
export class AddBtnComponent {

  @Input()
  public btnText: string = ''

  @Input()
  public redirectTo: string = ''
}
