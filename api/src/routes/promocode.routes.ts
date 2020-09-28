import { Router } from 'express';
import { Promotion } from '../database/models/promotion.model';

export const promocodeRouter = Router();

promocodeRouter.get('/:promoCode', async (req, res) => {
    const { promoCode } = req.params;
    try {
        const today = new Date();
        const promotion = await Promotion.findOne({ promoCode: promoCode, validUntil: { $gte: today }, validFrom: { $lt: today } });
        if (!promotion) { throw 'Promotional code not valid' };
        return res.json(promotion);
    } catch (err) {
        return res.status(500).json(err);
    }
});
