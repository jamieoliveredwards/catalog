import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { take, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProduct, IBasket } from '../models';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private basketItems: BehaviorSubject<IProduct[]> = new BehaviorSubject(this.getInitialBasketItems());
  public basket$: Observable<IBasket>;
  public discount$: BehaviorSubject<number> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {
    this.basket$ = this.initBasket();
  }

  addItemToBasket(sku: number) {
    const currentBasketItems = this.basketItems.value;

    // Business logic - Maximum 10 of any individual items can be added to basket
    if (currentBasketItems.filter(product => product.sku === sku).length >= 10) {
      return;
    }

    this.productService.findProductBySku(sku).subscribe(item => this.basketItems.next([...currentBasketItems, item]));
  }

  removeItemFromBasket(sku: number) {
    const newBasket = this.basketItems.value.filter(p => p.sku !== sku);
    this.basketItems.next(newBasket);
  }

  setQuantityOfProducts(sku: number, quantity: number) {
    this.productService.findProductBySku(sku).subscribe(product => {
      const newItems = Array(quantity).fill(product);
      const basketWithoutSkuItems = this.basketItems.value.filter(p => p.sku !== sku);
      this.basketItems.next([...basketWithoutSkuItems, ...newItems]);
    });
  }

  getPromotionalDiscount(promoCode: string): Observable<{ field: string, msh: string }[] | true> {
    return this.http.post<any>(`${environment.apiBase}/promocode`, { promoCode }).pipe(
      take(1),
      map(response => {
        if (response.errors) {
          return response.errors;
        }
        this.discount$.next(response.amount);
        return true;
      })
    );
  }

  checkout(cardNumber: string) {
    return this.basket$.pipe(
      map(basket => basket.items.map(product => ({ sku: product.product.sku, quantity: product.quantity }))),
      switchMap(basket => this.http.post(`${environment.apiBase}/checkout`, { basket, cardNumber })),
      take(1)
    );
  }

  private getInitialBasketItems(): IProduct[] {
    const storedItems = localStorage.getItem('basketItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }

  private initBasket(): Observable<IBasket> {
    return combineLatest(this.basketItems, this.discount$).pipe(
      tap(([products, _]) => localStorage.setItem('basketItems', JSON.stringify(products))),
      map(([products, promotionalDiscount]) => {
        const uniqueSkus = [...new Set(products.map(p => p.sku))];
        const uniqueProducts = uniqueSkus.map(sku => products.find(p => p.sku === sku));
        const items = uniqueProducts.map(product => ({
          product,
          quantity: products.filter(p => p.sku === product.sku).length
        })).sort((a, b) => a.product.sku - b.product.sku);
        const totalItems = products.length;
        const subTotal = products.reduce((acc, p) => acc + p.price, 0);
        const totalPrice = promotionalDiscount ? subTotal * (1 - promotionalDiscount / 100) : subTotal;
        return { items, totalPrice, totalItems, promotionalDiscount, subTotal };
      })
    );
  }
}
