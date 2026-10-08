import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypes } from './add-types';

describe('AddTypes', () => {
  let component: AddTypes;
  let fixture: ComponentFixture<AddTypes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTypes],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTypes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
