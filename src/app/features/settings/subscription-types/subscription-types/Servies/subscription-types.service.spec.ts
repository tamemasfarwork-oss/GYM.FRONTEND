import { TestBed } from '@angular/core/testing';

import { SubscriptionTypesService } from './subscription-types.service';

describe('SubscriptionTypesService', () => {
  let service: SubscriptionTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
