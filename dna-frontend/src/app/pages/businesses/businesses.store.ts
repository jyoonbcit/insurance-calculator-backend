import { ComponentStore } from '@ngrx/component-store';

export interface Shareholder {
  shareholderName: string;
  sharePercentage: number;
  insuranceCoverage: number;
  ebitdaContributionPercentage: number;
}

export interface Business {
  businessName: string;
  valuation: string;
  ebitda: string;
  rate: number;
  term: number;
  shareholders: Shareholder[];
}

export interface BusinessesState {
  error: string | null;
  businesses: Business[];
}

export class BusinessesStore extends ComponentStore<BusinessesState> {
  private error$ = this.select(state => state.error);
  private businesses$ = this.select(state => state.businesses);

  vm$ = this.select({
    error: this.error$,
    businesses: this.businesses$,
  });

  constructor() {
    super({
      error: null,
      businesses: [],
    });
  }
}
