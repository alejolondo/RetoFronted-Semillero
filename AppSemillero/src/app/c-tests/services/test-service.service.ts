import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Test } from '../interfaces/test';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {
  private apiURL: string = 'http://localhost:8081/api/controller/tests';

  constructor(private httpClient : HttpClient) { }

  searchTest(): Observable<Test[]>{
    return this.httpClient.get<Test[]>(this.apiURL)
    .pipe(
      catchError(error => of([]) )
    );
  }
  searchTestByID(id: number): Observable<Test>{
    return this.httpClient.get<Test>(`${this.apiURL}/${id}`)
    .pipe(
      catchError(error => of() )
    );
  }

  addTest(test: Test) : Observable<Test>{
    return this.httpClient.post<Test>(this.apiURL, test)
  }

  updateTest(test: Test) : Observable<Test>{
    return this.httpClient.put<Test>(this.apiURL, test)
  }

  deleTest(id: number ) : Observable<boolean>{
    return this.httpClient.delete(`${this.apiURL}/${id}`)
    .pipe(
      catchError( err => of(false)),
      map(resp => true)
    )
  }
}
