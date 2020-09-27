import { Request, Response } from "express"
import { Product } from "../database/models"

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        return res.json(products);

    } catch (err) {
        return res.status(500).json(err);
    }
}