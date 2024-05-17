import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtEditComponent } from './debt-edit.component';

describe('DebtEditComponent', () => {
  let component: DebtEditComponent;
  let fixture: ComponentFixture<DebtEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DebtEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
