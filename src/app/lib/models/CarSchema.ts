import mongoose, { Model, Schema } from "mongoose";
import ICar from "@/app/types/CarForSchema";  

const CarSchema: Schema<ICar> = new Schema({
    make: { type: String, required: true },       
    car_model: { type: String, required: true },  
    year: { type: Number, required: true },       
    color: { type: String, required: true },     
    price: { type: Number, required: true }    
});

const Car: Model<ICar> = mongoose.models.Car || mongoose.model<ICar>('Car', CarSchema);

export default Car;
