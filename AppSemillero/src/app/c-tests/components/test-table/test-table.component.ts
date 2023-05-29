import { Component, Input, OnInit } from '@angular/core';
import { Test } from '../../interfaces/test';

@Component({
  selector: 'test-table',
  templateUrl: './test-table.component.html',
  styles: [
  ]
})
export class TestTableComponent {

@Input()
public tests: Test[] = []
public pathUpdate = '/tests/update'
public pathDelete = '/tests/delete'
}


