import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/lib/db/mongodb';
import Car from '@/app/lib/models/CarSchema';

// GET a car by ID
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    try {
        await connect();
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        return res.status(200).json(car);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching car', error });
    }
};

// PUT update a car by ID
export const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { make, car_model, year, color, price } = req.body;
    try {
        await connect();
        const updatedCar = await Car.findByIdAndUpdate(
            id,
            { make, car_model, year, color, price },
            { new: true }
        );
        if (!updatedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }
        return res.status(200).json(updatedCar);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating car', error });
    }
};

// DELETE a car by ID
export const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    try {
        await connect();
        const deletedCar = await Car.findByIdAndDelete(id);
        if (!deletedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }
        return res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting car', error });
    }
};
