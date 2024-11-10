import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/mongoRoute',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createPost = async (post: { title: string; content: string; author: string; createdAt: Date }) => {
  try {
    const response = await instance.post('/posts', post);
    console.log('Post Created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await instance.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPost = async (id: string) => {
  try {
    const response = await instance.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const updatePost = async (id: string, post: { title: string; content: string; author: string; createdAt: Date }) => {
  try {
    const response = await instance.put(`/posts/${id}`, post);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (id: string) => {
  try {
    await instance.delete(`/posts/${id}`);
    console.log('Post Deleted:', id);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
