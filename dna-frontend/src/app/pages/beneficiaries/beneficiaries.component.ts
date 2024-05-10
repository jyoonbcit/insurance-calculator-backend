import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';

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
      name: new FormControl(),
      allocation: new FormControl(),
    });
    this.beneficiaries.push(beneficiaryForm);
  }

  deleteBeneficiary(index: number) {
    this.beneficiaries.removeAt(index);
  }
}
