import { IProduct } from '.';

export interface IBasket {
    items: { product: IProduct, quantity: number }[];
    totalPrice: number;
    totalItems: number;
    subTotal: number;
    promotionalDiscount?: number;
}
