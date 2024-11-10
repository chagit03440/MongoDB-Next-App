import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/db/mongodb'; // Ensure this is the correct path to your MongoDB connection
import Car from '@/app/lib/models/CarSchema'; // Ensure this is the correct path to your Car model

// GET all cars
export async function GET() {
    try {
        await connect();
        const cars = await Car.find();
        return NextResponse.json(cars, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching cars', error }, { status: 500 });
    }
}

// POST a new car
export async function POST(req: NextRequest) {
    try {
        await connect();
        const { make, car_model, year, color, price } = await req.json();
        const newCar = new Car({ make, car_model, year, color, price });
        await newCar.save();
        return NextResponse.json(newCar, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating car', error }, { status: 500 });
    }
}
