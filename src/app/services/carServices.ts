import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/mongoRoute',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createCar = async (car: { make: string; car_model: string; year: number; color: string; price: number }) => {
  try {
    const response = await instance.post('/cars', car);
    console.log('Car Created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating car:', error);
    throw error;
  }
};

export const getAllCars = async () => {
  try {
    const response = await instance.get('/cars');
    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

export const getCar = async (id: string) => {
  try {
    const response = await instance.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching car:', error);
    throw error;
  }
};

export const updateCar = async (id: string, car: { make: string; car_model: string; year: number; color: string; price: number }) => {
  try {
    const response = await instance.put(`/cars/${id}`, car);
    return response.data;
  } catch (error) {
    console.error('Error updating car:', error);
    throw error;
  }
};

export const deleteCar = async (id: string) => {
  try {
    await instance.delete(`/cars/${id}`);
    console.log('Car Deleted:', id);
  } catch (error) {
    console.error('Error deleting car:', error);
    throw error;
  }
};
