import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Affiliates } from '../interfaces/affiliate';

@Injectable({
  providedIn: 'root'
})
export class AffiliatesServiceService {
  private apiURL: string = 'http://localhost:8081/api/controller/affiliates';


  constructor(private httpClient : HttpClient) { }

  searchAffiliates(): Observable<Affiliates[]>{
    return this.httpClient.get<Affiliates[]>(this.apiURL)
    .pipe(
      catchError(error => of([]) )
    );
  }
  searchAffiliateByID(id: number): Observable<Affiliates>{
    return this.httpClient.get<Affiliates>(`${this.apiURL}/${id}`)
    .pipe(
      catchError(error => of() )
    );
  }

  addAffiliate(affiliate : Affiliates) : Observable<Affiliates>{
    return this.httpClient.post<Affiliates>(this.apiURL, affiliate)
  }

  updateAffiliate(affiliate : Affiliates ): Observable<Affiliates>{
    return this.httpClient.put<Affiliates>(this.apiURL, affiliate)
  }

  deleteAffiliate(id: number ) : Observable<boolean>{
    return this.httpClient.delete(`${this.apiURL}/${id}`)
    .pipe(
      catchError( err => of(false)),
      map(resp => true)
    )
  }
}
