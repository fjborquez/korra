import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesHouseInfo } from './house-info';

describe('HousesHouseInfo', () => {
  let component: HousesHouseInfo;
  let fixture: ComponentFixture<HousesHouseInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousesHouseInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousesHouseInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
