import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BusinessesStore } from './businesses.store';

@Component({
  selector: 'app-businesses',
  standalone: true,
  imports: [],
  providers: [BusinessesStore],
  templateUrl: './businesses.component.html',
  styleUrl: './businesses.component.scss',
})
export class BusinessesComponent {
  form = this.formBuilder.group({
    businesses: this.formBuilder.array([]),
  });

  vm$ = this.businessesStore.vm$;

  constructor(
    private formBuilder: FormBuilder,
    private businessesStore: BusinessesStore
  ) {}

  get businesses() {
    return this.form.controls['businesses'] as FormArray;
  }

  addBusiness() {
    const businessForm = this.formBuilder.group({
      name: new FormControl(), // String
      valuation: new FormControl(), // Number
    });
    this.businesses.push(businessForm);
  }

  deleteBusiness(index: number) {
    this.businesses.removeAt(index);
  }

  editBusiness(
    index: number,
    updatedValues: {
      name?: string;
      valuation?: number;
      ebitda?: number;
      apperciationRate?: number;
      term?: number;
    }
  ) {
    const currentBusiness = this.businesses.at(index) as FormGroup;
    if (updatedValues.name !== undefined) {
      currentBusiness.controls['name'].setValue(updatedValues.name);
    }
    if (updatedValues.valuation !== undefined) {
      currentBusiness.controls['valuation'].setValue(updatedValues.valuation);
    }
  }
}
