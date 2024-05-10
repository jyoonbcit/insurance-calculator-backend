import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-beneficiaries',
  standalone: true,
  imports: [],
  templateUrl: './beneficiaries.component.html',
  styleUrl: './beneficiaries.component.scss',
})
export class BeneficiariesComponent {
  form = this.formbuilder.group({
    beneficiaries: this.formbuilder.array([]),
  });

  constructor(private formbuilder: FormBuilder) {}

  get beneficiaries() {
    return this.form.controls['beneficiaries'] as FormArray;
  }

  addBeneficiary() {
    const beneficiaryForm = this.formbuilder.group({
      name: new FormControl(), // String
      allocation: new FormControl(), // Number
    });
    this.beneficiaries.push(beneficiaryForm);
  }

  deleteBeneficiary(index: number) {
    this.beneficiaries.removeAt(index);
  }

  editBeneficiariy(
    index: number,
    updatedValues: { name?: string; allocation?: number }
  ) {
    const currentBeneficiary = this.beneficiaries.at(index) as FormGroup;
    if (updatedValues.name !== undefined) {
      currentBeneficiary.controls['name'].setValue(updatedValues.name);
    }
    if (updatedValues.allocation !== undefined) {
      currentBeneficiary.controls['allocation'].setValue(
        updatedValues.allocation
      );
    }
  }
}
