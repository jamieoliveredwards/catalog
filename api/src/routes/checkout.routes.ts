import { Router } from 'express';

export const checkoutRouter = Router();

checkoutRouter.post('', (req, res) => {
    // API should pass every 8 out of every 10 tries for testing perposes
    const shouldPass = Math.floor(Math.random() * 10) >= 3;
    if (shouldPass) {
        return res.json({ success: true });
    }
    return res.status(500).json('Error checking out');
});
