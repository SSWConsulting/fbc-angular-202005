import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  deleteCompany(company: Company): Observable<Company> {

    console.log('SERVICE - calling DeleteCompany', company);

    return this.httpClient.delete<Company>(`${this.baseUrl}/company/${company.id}`)
    .pipe(
      catchError(error => this.errorHandler(error))
    );
  }

  addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(`${this.baseUrl}/company`,
    company,
    { headers: new HttpHeaders().set('content-type', 'application/json') })
    .pipe(
      catchError(error => this.errorHandler(error))
    );
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.baseUrl}/company/${companyId}`)
    .pipe(
      catchError(error => this.errorHandler(error))
    );
  }

  updateCompany(company: Company): Observable<Company> {
    return this.httpClient.put<Company>(`${this.baseUrl}/company/${company.id}`,
    company,
    { headers: new HttpHeaders().set('content-type', 'application/json') })
    .pipe(
      catchError(error => this.errorHandler(error))
    );
  }

  errorHandler(error): Observable<any> {
    console.error('ERROR', error);
    return of([]);
  }

}
