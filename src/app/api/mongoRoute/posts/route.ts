import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/db/mongodb';
import Post from '@/app/lib/models/PostSchema';

// GET all posts
export async function GET() {
    try {
        await connect();
        const posts = await Post.find();
        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ message: 'Error fetching posts', error }, { status: 500 });
    }
}

// POST a new post
export async function POST(req: NextRequest) {
    try {
        await connect();
        const { title, content, author } = await req.json(); // Parse the request body
        const newPost = new Post({ title, content, author });
        await newPost.save();
        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ message: 'Error creating post', error }, { status: 500 });
    }
}

