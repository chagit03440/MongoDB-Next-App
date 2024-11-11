"use client";
import EntityList from '@/app/components/EntityList';
import React, { useEffect, useState } from 'react';
import { createPost, getAllPosts, updatePost, deletePost } from '@/app/services/postServices';
import IPost from '@/app/types/PostForSchema';

const Page = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data || []);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setPosts([]); 
      }
    };
    fetchPosts();
  }, []);

  const handleCreate = async (postData: IPost) => {
    await createPost(postData);
    const updatedPosts = await getAllPosts();
    setPosts(updatedPosts);
  };

  const handleUpdate = async (id: string, postData: IPost) => {
    await updatePost(id, postData);
    const updatedPosts = await getAllPosts();
    setPosts(updatedPosts);
  };

  const handleDelete = async (id: string) => {
    await deletePost(id);
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
  };

  const postServices = {
    create: handleCreate,
    update: handleUpdate,
    deleteEntity: handleDelete,
  };

  return (
    <div>
      <EntityList entities={posts} entityType="posts" entityServices={postServices} />
    </div>
  );
};

export default Page;
