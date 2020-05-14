import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { ConditionalExpr } from '@angular/compiler';
import { Subscription, Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies$: Observable<Company[]>;

  constructor(
    private companyService: CompanyService
  ) {}


  ngOnInit(): void {
    this.companies$ = this.getCompanies();
  }

  getCompanies() {
    return this.companyService.getCompanies()
    .pipe(
      tap(x => console.log('got companies', x))
    );
  }

  deleteCompany(company: Company) {
    console.log('COMPONENT - calling DeleteCompany', company);

    this.companyService.deleteCompany(company)
    .subscribe(() => this.companies$ = this.getCompanies());
  }



}


