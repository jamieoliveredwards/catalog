import { Document, model, Schema } from 'mongoose';

interface IPromotion extends Document {
    percentageDiscount: number;
    promoCode: string;
    validFrom: Date;
    validUntil: Date;
}

const promotionSchema = new Schema({
    percentageDiscount: {
        required: true,
        type: Number
    },
    promoCode: {
        required: true,
        type: String
    },
    validFrom: {
        required: true,
        type: Date
    },
    validUntil: {
        required: true,
        type: Date
    }
});

promotionSchema.index('promoCode');

export const Promotion = model<IPromotion>('promotion', promotionSchema);
