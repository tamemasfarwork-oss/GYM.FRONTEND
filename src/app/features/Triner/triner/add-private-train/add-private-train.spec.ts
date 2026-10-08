import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrivateTrain } from './add-private-train';

describe('AddPrivateTrain', () => {
  let component: AddPrivateTrain;
  let fixture: ComponentFixture<AddPrivateTrain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPrivateTrain],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPrivateTrain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
