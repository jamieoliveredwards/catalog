import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IProduct } from 'src/app/models';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products$: Observable<IProduct[]>;
  public basket$: Observable<IBasket>;

  constructor(
    private productService: ProductService,
    private basketService: BasketService
  ) { }

  ngOnInit() {
    this.products$ = this.productService.products$;
    this.basket$ = this.basketService.basket$;
  }

  addToBasket(sku: number) {
    this.basketService.addItemToBasket(sku);
  }

}
