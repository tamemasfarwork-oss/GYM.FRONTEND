import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredSubs } from './expired-subs';

describe('ExpiredSubs', () => {
  let component: ExpiredSubs;
  let fixture: ComponentFixture<ExpiredSubs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpiredSubs],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpiredSubs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
