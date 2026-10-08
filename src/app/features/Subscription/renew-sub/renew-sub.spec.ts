import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewSub } from './renew-sub';

describe('RenewSub', () => {
  let component: RenewSub;
  let fixture: ComponentFixture<RenewSub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenewSub],
    }).compileComponents();

    fixture = TestBed.createComponent(RenewSub);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
