import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalNeedsComponent } from './total-needs.component';

describe('TotalNeedsComponent', () => {
  let component: TotalNeedsComponent;
  let fixture: ComponentFixture<TotalNeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalNeedsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalNeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
