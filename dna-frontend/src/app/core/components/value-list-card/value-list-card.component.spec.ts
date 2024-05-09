import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueListCardComponent } from './value-list-card.component';

describe('ValueListCardComponent', () => {
  let component: ValueListCardComponent;
  let fixture: ComponentFixture<ValueListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueListCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ValueListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
