import mongoose, { Model, Schema } from "mongoose";
import IPost from "@/app/types/PostForSchema";  // Ensure correct path to IPost interface

// Define the schema matching the IPost interface
const PostSchema: Schema<IPost> = new Schema({
    title: { type: String, required: true },    // Title of the post
    content: { type: String, required: true },  // Content of the post
    author: { type: String, required: true },   // Author of the post
    createdAt: { type: Date, default: Date.now } // Timestamp of creation
});

// Check if the model is already created, otherwise create a new one
const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;
