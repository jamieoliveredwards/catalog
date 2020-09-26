import express from 'express';
import cors from 'cors';
import { checkoutRouter, productsRouter, promocodeRouter } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productsRouter);
app.use('/promocode', promocodeRouter);
app.use('/checkout', checkoutRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Api listening on port ${port}`));
