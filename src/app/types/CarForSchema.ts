import { Document } from "mongoose"
export default interface ICar extends Document{

    _id: string; 
    make: string;        
    car_model: string;      
    year: number;       
    color: string;       
    price: number;    
}

