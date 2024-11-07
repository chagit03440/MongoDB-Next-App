import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/db/mongodb';
import Book from '@/app/lib/models/BookSchema';

// GET a book by ID
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    try {
        await connect();
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching book', error });
    }
};

// PUT update a book by ID
export const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { title, author, price } = req.body;
    try {
        await connect();
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author, price },
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json(updatedBook);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating book', error });
    }
};

// DELETE a book by ID
export const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    try {
        await connect();
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting book', error });
    }
};
