import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingLogin } from './loading-login';

describe('LoadingLogin', () => {
  let component: LoadingLogin;
  let fixture: ComponentFixture<LoadingLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
