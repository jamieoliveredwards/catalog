import { Router } from 'express';

export const promocodeRouter = Router();

promocodeRouter.post('', (req, res) => {
    const { promoCode } = req.body as { promoCode: string | null };
    try {
        // Valid promo codes have format "X[percentage]" E.g X20 (for 20% discount), X50 (for 50% discount), etc.
        const amount = parseInt(promoCode?.split('X')[1].substr(0, 2) as string);
        return res.json({ amount });
    } catch (err) {
        return res.status(500).json(['Promo code not valid']);
    }
});
