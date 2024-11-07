import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/db/mongodb';
import Post from '@/app/lib/models/PostSchema';

// GET a post by ID
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    try {
        await connect();
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching post', error });
    }
};

// PUT update a post by ID
export const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { title, content, author } = req.body;
    try {
        await connect();
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content, author, updatedAt: new Date() },
            { new: true, runValidators: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating post', error });
    }
};
