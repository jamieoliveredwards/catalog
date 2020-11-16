import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../models';

import { BasketService } from './basket.service';
import { ProductService } from './product.service';

describe('BasketService', () => {

  let service: BasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BasketService,
        ProductService
      ]
    });
    spyOn(localStorage, 'getItem').and.returnValue(null);
    service = TestBed.get(BasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have empty basket', (done) => {
    service.basket$.subscribe(basket => {
      expect(basket.items.length).toBe(0);
      done();
    });
  });

  it('on add item should have 1 item in basket', (done) => {
    const productService: ProductService = TestBed.get(ProductService);
    productService.products$ = new BehaviorSubject<IProduct[]>([
      {
        sku: 1,
        name: 'Test product',
        description: 'Test Description',
        price: 1.99
      }
    ]);
    service.addItemToBasket(1);
    service.basket$.subscribe(basket => {
      expect(basket.items.length).toBe(1);
      done();
    });
  });
});
