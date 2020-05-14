import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private httpClient: HttpClient
  ) { }

  baseUrl = 'https://firebootcamp-crm-api.azurewebsites.net/api';

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.baseUrl}/company`).pipe(
      catchError(error => this.errorHandler(error))
    );
  }

  errorHandler(error): Observable<any> {
    console.error('ERROR', error);
    return of([]);
  }

}
