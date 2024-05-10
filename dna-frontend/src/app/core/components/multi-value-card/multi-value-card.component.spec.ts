import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiValueCardComponent } from './multi-value-card.component';

describe('MultiValueCardComponent', () => {
  let component: MultiValueCardComponent;
  let fixture: ComponentFixture<MultiValueCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiValueCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiValueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
