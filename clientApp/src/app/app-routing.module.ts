import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketCheckoutComponent } from './components/basket-checkout/basket-checkout.component';
import { ErrorComponent } from './components/error/error.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SuccessComponent } from './components/success/success.component';

const appRoutes: Routes = [
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'checkout',
    component: BasketCheckoutComponent
  },
  {
    path: 'checkout/success',
    component: SuccessComponent
  },
  {
    path: 'checkout/error',
    component: ErrorComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/products'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
