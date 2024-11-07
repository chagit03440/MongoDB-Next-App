import { Document } from "mongoose";

export default interface IPost extends Document {
    title: string;       // Title of the post
    content: string;     // Content of the post
    author: string;      // Author of the post
    createdAt: Date;     // Date when the post was created
}
