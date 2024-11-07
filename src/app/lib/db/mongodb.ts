import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI || "";

const connect = async ()=> {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Mongodb connection saccessfull !!!");
    } catch (error) {
        throw new Error("Error in connection to mongodb"+ error);
    }
};

export default connect;