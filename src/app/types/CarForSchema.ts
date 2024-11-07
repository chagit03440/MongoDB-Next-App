import { Document } from "mongoose"
export default interface ICar extends Document{

    make: string;        
    car_model: string;      
    year: number;       
    color: string;       
    price: number;    
}

