import { Document, model, Schema } from 'mongoose';

interface IProduct extends Document {
    sku: string;
    name: string;
    description?: string;
    price: number;
}

const productSchema = new Schema({
    sku: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    }
});

export const Product = model<IProduct>('product', productSchema);