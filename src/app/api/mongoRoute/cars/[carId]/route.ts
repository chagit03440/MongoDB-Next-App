import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/db/mongodb';
import Car from '@/app/lib/models/CarSchema';
// import { Params } from 'next/dist/server/request/params';

export async function GET(req: NextRequest, { params }: { params: { carId: string } }) {
    const { carId } = params;

    try {
        await connect();
        const car = await Car.findById(carId);
        if (!car) return NextResponse.json({ message: 'Car not found' }, { status: 404 });
        return NextResponse.json(car, { status: 200 });
    } catch (error) {
        console.error('Error fetching car:', error);
        return NextResponse.json({ message: 'Error fetching car', error }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: {carId: string} }) {
    const { carId } =  params;
    const { make, car_model, year, color, price } = await req.json();
    console.log("Updating car with ID:",carId);
    console.log("Updated Car Data:", make);
    try {
        await connect();
        const updatedCar = await Car.findByIdAndUpdate(carId, { make, car_model, year, color, price }, { new: true });
        if (!updatedCar) return NextResponse.json({ message: 'Car not found' }, { status: 404 });
        return NextResponse.json(updatedCar, { status: 200 });
    } catch (error) {
        console.error('Error updating car:', error);
        return NextResponse.json({ message: 'Error updating car', error }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest, { params }: { params: { carId: string } }) {
    const { carId } = params;

    try {
        await connect();
        const deletedCar = await Car.findByIdAndDelete(carId);
        if (!deletedCar) return NextResponse.json({ message: 'Car not found' }, { status: 404 });
        return NextResponse.json({ message: 'Car deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting car:', error);
        return NextResponse.json({ message: 'Error deleting car', error }, { status: 500 });
    }
}
