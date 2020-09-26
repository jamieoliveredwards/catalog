import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALIDATORS, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IBasket } from 'src/app/models';
import { BasketService } from 'src/app/services/basket.service';
import { luhnValidator } from 'src/app/validators/luhn.validator';

@Component({
  selector: 'app-basket-checkout',
  templateUrl: './basket-checkout.component.html',
  styleUrls: ['./basket-checkout.component.scss'],
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: luhnValidator,
      multi: true
    }
  ]
})
export class BasketCheckoutComponent implements OnInit {

  public basket$: Observable<IBasket>;
  public quantityOptions: number[] = new Array(10).fill(0).map((_, i) => i + 1);
  public checkoutForm: FormGroup;

  constructor(
    private basketService: BasketService,
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
    this.checkoutForm = this.buildCheckoutForm();
  }

  removeItemFromBasket(sku: number) {
    this.basketService.removeItemFromBasket(sku);
  }

  changeQuantity(sku: number, quantity: string) {
    this.basketService.setQuantityOfProducts(sku, +quantity);
  }

  applyPromotion(promoCode: string) {
    this.basketService.getPromotionalDiscount(promoCode)
      .subscribe();
  }

  checkout(cardNumber: string) {
    this.basketService.checkout(cardNumber).pipe(
      catchError(err => {
        this.router.navigate(['error'], { relativeTo: this.activeRoute });
        return EMPTY;
      })
    ).subscribe(() => this.router.navigate(['success'], { relativeTo: this.activeRoute }));
  }

  private buildCheckoutForm() {
    return this.fb.group({
      cardNumber: ['', [Validators.required, luhnValidator]]
    });
  }



}
