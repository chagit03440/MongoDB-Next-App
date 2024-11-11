"use client";
import EntityList from '@/app/components/EntityList';
import React, { useEffect, useState } from 'react';
import { createBook, getAllBooks, updateBook, deleteBook } from '@/app/services/bookServices';
import IBook from '@/app/types/BookForSchema';

const Page = () => {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data || []);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        setBooks([]); 
      }
    };
    fetchBooks();
  }, []);

  const handleCreate = async (bookData: IBook) => {
    await createBook(bookData);
    const updatedBooks = await getAllBooks();
    setBooks(updatedBooks);
  };

  const handleUpdate = async (id: string, bookData: IBook) => {
    await updateBook(id, bookData);
    const updatedBooks = await getAllBooks();
    setBooks(updatedBooks);
  };

  const handleDelete = async (id: string) => {
    await deleteBook(id);
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
  };

  const carServices = {
    create: handleCreate,
    update: handleUpdate,
    deleteEntity: handleDelete,
  };

  return (
    <div>
      <EntityList entities={books} entityType="books" entityServices={carServices} />
    </div>
  );
};

export default Page;
