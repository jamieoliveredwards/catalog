import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket-button',
  templateUrl: './basket-button.component.html',
  styleUrls: ['./basket-button.component.scss']
})
export class BasketButtonComponent implements OnInit {

  public itemsCount: Observable<number>;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.itemsCount = this.setItemsCount();
  }

  private setItemsCount() {
    return this.basketService.basket$.pipe(
      map(basket => basket.totalItems)
    );
  }

}
