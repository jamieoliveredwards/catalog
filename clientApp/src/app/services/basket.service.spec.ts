import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BasketService } from './basket.service';
import { ProductService } from './product.service';

describe('BasketService', () => {

  let service: BasketService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    http = TestBed.get(HttpClient);
    service = new BasketService(http, new ProductService(http));
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
});
