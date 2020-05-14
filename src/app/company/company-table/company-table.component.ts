import { Component, OnInit, Input, ComponentFactoryResolver, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyTableComponent implements OnInit {

  @Input()
  companies: Company[];

  @Output()
  deleteClicked: EventEmitter<Company> = new EventEmitter<Company>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteCompany(company: Company) {
    this.deleteClicked.emit(company);
  }


}
