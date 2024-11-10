import { Document } from "mongoose";

export default interface IBook extends Document {

    _id: string; 
    title: string;       // Title of the book
    author: string;      // Author of the book
    price: number;       // Price of the book
}
