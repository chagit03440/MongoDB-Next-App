import connect from '@/app/lib/db/mongodb';
import Book from '@/app/lib/models/BookSchema';
import { NextRequest, NextResponse } from 'next/server';

// GET all books
export const GET = async () => {
    try {
        await connect();
        const books = await Book.find();
        return NextResponse.json(books, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching books', error }, { status: 500 });
    }
};

// POST a new book
export const POST = async (req: NextRequest) => {
    try {
        await connect();
        const { title, author, price } = await req.json(); // Use `await req.json()` for body parsing
        const newBook = new Book({ title, author, price });
        await newBook.save();
        return NextResponse.json(newBook, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating book', error }, { status: 500 });
    }
};
