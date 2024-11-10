import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/db/mongodb';
import Book from '@/app/lib/models/BookSchema';

// GET a book by ID
export async function GET({ params }: { params: { bookId: string } }) {
    const { bookId } = params;

    try {
        await connect();
        const book = await Book.findById(bookId);
        if (!book) {
            return NextResponse.json({ message: 'Book not found' }, { status: 404 });
        }
        return NextResponse.json(book, { status: 200 });
    } catch (error) {
        console.error('Error fetching book:', error);
        return NextResponse.json({ message: 'Error fetching book', error }, { status: 500 });
    }
}

// PUT update a book by ID
export async function PUT(req: NextRequest, { params }: { params: { bookId: string } }) {
    const { bookId } = params;
    const { title, author, price } = await req.json(); // Use `await req.json()` to parse the body

    try {
        await connect();
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { title, author, price },
            { new: true }
        );
        if (!updatedBook) {
            return NextResponse.json({ message: 'Book not found' }, { status: 404 });
        }
        return NextResponse.json(updatedBook, { status: 200 });
    } catch (error) {
        console.error('Error updating book:', error);
        return NextResponse.json({ message: 'Error updating book', error }, { status: 500 });
    }
}

// DELETE a book by ID
export async function DELETE(req: NextRequest, { params }: { params: { bookId: string } }) {
    const { bookId } = params;
    console.log("id",bookId);
    try {
        await connect();
        const deletedBook = await Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            return NextResponse.json({ message: 'Book not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Book deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting book:', error);
        return NextResponse.json({ message: 'Error deleting book', error }, { status: 500 });
    }
}
