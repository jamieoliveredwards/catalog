import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';

describe('ProductService', () => {

  let service: ProductService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    http = TestBed.get(HttpClient);
    service = new ProductService(http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
