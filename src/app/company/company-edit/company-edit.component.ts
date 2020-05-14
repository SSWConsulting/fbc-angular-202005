import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  companyForm: FormGroup;
  isNewCompany: boolean;
  companyId: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.companyId = this.activatedRoute.snapshot.params.id;
    this.isNewCompany = !this.companyId;

    this.buildForm();

    if (!this.isNewCompany) {
      this.companyService.getCompany(this.companyId)
      .subscribe(company => this.companyForm.patchValue(company));
    }

  }

  buildForm(): void {
    this.companyForm = this.formBuilder.group({
      name: ['SSW', Validators.required],
      phone: [],
      email: []
    });
  }

  saveCompany() {
    if (this.isNewCompany) {
      const newCompany: Company = this.companyForm.value;
      this.companyService.addCompany(newCompany)
      .subscribe(() => this.router.navigateByUrl('/company/list'));
    }else{
      const payload: Company = {...this.companyForm.value, id: this.companyId, anotherProperty: 'blah' };

      this.companyService.updateCompany(payload)
      .subscribe(() => this.router.navigateByUrl('/company/list'));
    }
  }
}
