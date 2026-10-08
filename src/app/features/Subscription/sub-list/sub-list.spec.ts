import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubList } from './sub-list';

describe('SubList', () => {
  let component: SubList;
  let fixture: ComponentFixture<SubList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubList],
    }).compileComponents();

    fixture = TestBed.createComponent(SubList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
