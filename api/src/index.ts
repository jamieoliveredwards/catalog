import express from 'express';
import cors from 'cors';
import { checkoutRouter, productsRouter, promocodeRouter } from './routes';
import mongoose from 'mongoose';

const dbUri = process.env.DB_URI as string;

const app = express();

mongoose.connect(
    dbUri,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        authSource: 'admin',
        dbName: 'catalogue'
    }
).then(() => console.log('DB Connected')).catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/products', productsRouter);
app.use('/promocode', promocodeRouter);
app.use('/checkout', checkoutRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Api listening on port ${port}`));
