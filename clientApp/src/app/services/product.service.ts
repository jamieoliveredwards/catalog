import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public products$: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this.getProducts().subscribe(products => this.products$.next(products));
  }

  refreshProducts() {
    this.getProducts().subscribe(products => this.products$.next(products));
  }

  findProductBySku(sku: number) {
    return this.products$.pipe(
      map(products => products.find(product => product.sku === sku)),
      take(1)
    );
  }

  private getProducts() {
    return this.http.get<IProduct[]>(`${environment.apiBase}/products`).pipe(
      take(1)
    );
  }

}
