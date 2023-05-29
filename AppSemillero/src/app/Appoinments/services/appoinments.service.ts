import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appoinment } from '../interfaces/appoinments';
import { Observable, catchError, map, of } from 'rxjs';
import { Test } from 'src/app/c-tests/interfaces/test';
import { Affiliates } from 'src/app/Affiliates/interfaces/affiliate';

@Injectable({
  providedIn: 'root'
})
export class AppoinmentsService {

  private apiURL: string = 'http://localhost:8081/api/controller';


  constructor(private httpClient : HttpClient) { }

  searchAppoinments(): Observable<Appoinment[]>{
    return this.httpClient.get<Appoinment[]>(`${this.apiURL}/appoinments`)
    .pipe(
      catchError(error => of([]) )
    );
  }


  searchTest(): Observable< Test[]>{
    return this.httpClient.get<Test[]>(`${this.apiURL}/tests`)
    .pipe(
      catchError(error => of([]) )
    );
  }

  searchAffiliate(): Observable< Affiliates[]>{
    return this.httpClient.get<Affiliates[]>(`${this.apiURL}/affiliates`)
    .pipe(
      catchError(error => of([]) )
    );
  }
  searchAppoinmentByID(id: number): Observable<Appoinment>{
    return this.httpClient.get<Appoinment>(`${this.apiURL}/appoinments/${id}`)
    .pipe(
      catchError(error => of() )
    );
  }

  searchAppoinmentByAffiliate(id: number): Observable<Appoinment[]>{
    return this.httpClient.get<Appoinment[]>(`${this.apiURL}/appoinments/affiliate/${id}`)
    .pipe(
      catchError(error => of([]) )
    );
  }

  searchAppoinmentByDate(date: string): Observable<Appoinment[]>{
    return this.httpClient.get<Appoinment[]>(`${this.apiURL}/appoinments/date/${date}`)
    .pipe(
      catchError(error => of([]) )
    );
  }


  addAppoinmet(appoinment: Appoinment) : Observable<Appoinment>{
    return this.httpClient.post<Appoinment>(`${this.apiURL}/appoinments`, appoinment)
  }

  updateAppoinment(appoinment: Appoinment) : Observable<Appoinment>{
    return this.httpClient.put<Appoinment>(`${this.apiURL}/appoinments`, appoinment)
  }

  deleteAppoinment(id: number ) : Observable<boolean>{
    return this.httpClient.delete(`${this.apiURL}/appoinments/${id}`)
    .pipe(
      catchError( err => of(false)),
      map(resp => true)
    )
  }


}
