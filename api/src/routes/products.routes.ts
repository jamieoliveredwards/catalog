import { Router } from 'express';
import { getProducts } from '../controllers';

export const productsRouter = Router();

productsRouter.get('', getProducts);
