import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPasssword } from './recover-password';

describe('Recover Password', () => {
  let component: RecoverPasssword;
  let fixture: ComponentFixture<RecoverPasssword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoverPasssword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverPasssword);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
