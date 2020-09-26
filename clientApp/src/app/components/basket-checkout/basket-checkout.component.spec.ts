import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketCheckoutComponent } from './basket-checkout.component';

describe('BasketCheckoutComponent', () => {
  let component: BasketCheckoutComponent;
  let fixture: ComponentFixture<BasketCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
