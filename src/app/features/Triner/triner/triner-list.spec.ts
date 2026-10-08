import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrinerList } from './triner-list';

describe('TrinerList', () => {
  let component: TrinerList;
  let fixture: ComponentFixture<TrinerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrinerList],
    }).compileComponents();

    fixture = TestBed.createComponent(TrinerList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
