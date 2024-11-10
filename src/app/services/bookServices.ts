import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/mongoRoute',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createBook = async (book: { title: string; author: string; year: number; genre: string; price: number }) => {
  try {
    const response = await instance.post('/books', book);
    console.log('Book Created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

export const getAllBooks = async () => {
  try {
    const response = await instance.get('/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const getBook = async (id: string) => {
  try {
    const response = await instance.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

export const updateBook = async (id: string, book: { title: string; author: string; year: number; genre: string; price: number }) => {
  try {
    const response = await instance.put(`/books/${id}`, book);
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

export const deleteBook = async (id: string) => {
  try {
    await instance.delete(`/books/${id}`);
    console.log('Book Deleted:', id);
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
