import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/db/mongodb';
import Book from '@/app/lib//models/BookSchema';

// GET all books
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connect();
        const books = await Book.find();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching books', error });
    }
};

// POST a new book
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connect();
        const { title, author, price } = req.body;
        const newBook = new Book({ title, author, price });
        await newBook.save();
        return res.status(201).json(newBook);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating book', error });
    }
};
