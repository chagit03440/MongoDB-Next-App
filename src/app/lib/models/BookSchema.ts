import mongoose, { Model, Schema } from "mongoose";
import IBook from "@/app/types/BookForSchema";  // Ensure correct path to IBook interface

// Define the schema matching the IBook interface
const BookSchema: Schema<IBook> = new Schema({
    title: { type: String, required: true },        // Title of the book
    author: { type: String, required: true },       // Author of the book
    price: { type: Number, required: true }         // Price of the book
});

// Check if the model is already created, otherwise create a new one
const Book: Model<IBook> = mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);

export default Book;
