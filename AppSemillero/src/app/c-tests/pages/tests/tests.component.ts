import { Component, OnInit } from '@angular/core';
import { TestServiceService } from '../../services/test-service.service';
import { Test } from '../../interfaces/test';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styles: [
  ]
})
export class TestsComponent implements OnInit {
  public title: string = 'Pruebas'
  public btnText: string = 'Nueva Prueba'
  public redirectTo: string = '/tests/new'

  public tests: Test[] = []
  constructor(private testService: TestServiceService){}
  ngOnInit(): void {
    this.testService.searchTest()
    .subscribe(test => {
      this.tests = test;
    });
  }
}
