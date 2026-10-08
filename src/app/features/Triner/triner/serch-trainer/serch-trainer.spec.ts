import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerchTrainer } from './serch-trainer';

describe('SerchTrainer', () => {
  let component: SerchTrainer;
  let fixture: ComponentFixture<SerchTrainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerchTrainer],
    }).compileComponents();

    fixture = TestBed.createComponent(SerchTrainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
