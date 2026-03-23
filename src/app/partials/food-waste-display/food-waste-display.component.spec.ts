import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodWasteDisplayComponent } from './food-waste-display.component';

describe('FoodWasteDisplayComponent', () => {
  let component: FoodWasteDisplayComponent;
  let fixture: ComponentFixture<FoodWasteDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodWasteDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodWasteDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
