import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlayer } from './update-player';

describe('UpdatePlayer', () => {
  let component: UpdatePlayer;
  let fixture: ComponentFixture<UpdatePlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePlayer],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePlayer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
