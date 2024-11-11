import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/db/mongodb';
import Post from '@/app/lib/models/PostSchema';

// GET a post by ID
export async function GET(req: NextRequest, { params }: { params: { postId: string } }) {
    const { postId } = await params;

    try {
        await connect();
        const post = await Post.findById(postId);
        if (!post) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ message: 'Error fetching post', error }, { status: 500 });
    }
}

// PUT update a post by ID
export async function PUT(req: NextRequest, { params }: { params: { postId: string } }) {
    const { postId } = await params;
    const { title, content, author } = await req.json(); // Parse the request body

    try {
        await connect();
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title, content, author, updatedAt: new Date() },
            { new: true, runValidators: true }
        );
        if (!updatedPost) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({ message: 'Error updating post', error }, { status: 500 });
    }
}

// DELETE a post by ID
export async function DELETE(req: NextRequest, { params }: { params: { postId: string } }) {
    const { postId } = await params;
    console.log("id",postId);
    try {
        await connect();
        const deletedBook = await Post.findByIdAndDelete(postId);
        if (!deletedBook) {
            return NextResponse.json({ message: 'Book not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Book deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting book:', error);
        return NextResponse.json({ message: 'Error deleting book', error }, { status: 500 });
    }
}