import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/db/mongodb';
import Post from '@/app/lib/models/PostSchema';

// GET all posts
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connect();
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching posts', error });
    }
};

// POST a new post
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connect();
        const { title, content, author } = req.body;
        const newPost = new Post({ title, content, author });
        await newPost.save();
        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating post', error });
    }
};
