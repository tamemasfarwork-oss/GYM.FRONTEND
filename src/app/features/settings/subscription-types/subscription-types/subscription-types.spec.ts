import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionTypes } from './subscription-types';

describe('SubscriptionTypes', () => {
  let component: SubscriptionTypes;
  let fixture: ComponentFixture<SubscriptionTypes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionTypes],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionTypes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
