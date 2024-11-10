import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/mongoRoute',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

export const getAllUsers = async () => {
  try {
    const response = await instance.get('/users');
    console.log('Fetched Users:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (user: { username: string; email: string; password: string }) => {
  try {
    const response = await instance.post('/users', user);

    console.log('User Created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await instance.delete(`/users/${id}`);
    console.log('User Deleted:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const updateUser = async (id: string, user: { username: string; email: string; password: string }) => {
  try {
    const response = await instance.put(`/users/${id}`, user);
    console.log('User Updated:', response.data);
    return response.data; // Optionally return the updated user data
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};


export const signInUser = async (user: { username: string; email: string; password: string }) => {
  try {
    const response = await instance.post('/users/signIn', user);

    console.log('User Signed In:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};
