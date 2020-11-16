import { Router } from 'express';
import { getPromoCode } from '../controllers';

export const promocodeRouter = Router();

promocodeRouter.get('/:promoCode', getPromoCode);
