"use client";
import React, { useState, useEffect } from 'react';
import { createCar, getAllCars, updateCar, deleteCar } from '../services/carServices'; // Import the updated car service functions
import ICar from '../types/CarForSchema';

const CarsList = () => {
  const [cars, setCars] = useState<ICar[]>([]); // State to hold the list of cars
  const [newCar, setNewCar] = useState({ make: '', car_model: '', year: 0, color: '', price: 0 }); // New car form state
  const [editingCarId, setEditingCarId] = useState<string | null>(null); // Track which car is being edited
  const [editedCar, setEditedCar] = useState({ make: '', car_model: '', year: 0, color: '', price: 0 }); // State for edited car

  // Fetch the list of cars on initial load
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carList = await getAllCars(); // Use the getAllCars service function to fetch the car list
        setCars(carList);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };
    fetchCars();
  }, []);

  // Handle adding a new car
  const handleAddCar = async () => {
    if (newCar.make && newCar.car_model && newCar.year && newCar.color && newCar.price) {
      try {
        const carToAdd = { ...newCar };
        const newCarData = await createCar(carToAdd); // Call createCar service to add the new car
        setCars((prevCars) => [...prevCars, newCarData]); // Update the cars state with the new car
        setNewCar({ make: '', car_model: '', year: 0, color: '', price: 0 }); // Reset the form
      } catch (error) {
        console.error("Failed to add car:", error);
      }
    }
  };

  // Handle editing a car
  const handleEditCar = async (car: ICar) => {
    if (editingCarId === car._id) {
      const updatedCar = { make: editedCar.make, car_model: editedCar.car_model, year: editedCar.year, color: editedCar.color, price: editedCar.price };
      try {
        const updatedCarData = await updateCar(car._id, updatedCar); 
        setCars((prevCars) => prevCars.map((c) => (c._id === car._id ? updatedCarData : c))); // Update the car list with the updated car data
        setEditingCarId(null); // Exit editing mode
      } catch (error) {
        console.error("Failed to update car:", error);
      }
    } else {
      // Set the car ID and data in edit mode
      setEditingCarId(car._id);
      setEditedCar({ make: car.make, car_model: car.car_model, year: car.year, color: car.color, price: car.price });
    }
  };
  

  // Handle deleting a car
  const handleDeleteCar = async (carId: string) => {
    try {
      await deleteCar(carId); // Call deleteCar service to delete the car
      setCars((prevCars) => prevCars.filter((car) => car._id !== carId)); // Remove the deleted car from the state
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mt-16 mb-6">Cars List</h1>
      <div className="flex flex-col sm:flex-row gap-8 items-start w-full max-w-4xl">
        <div className="flex flex-col gap-4 max-w-xs">
          <input
            type="text"
            value={newCar.make}
            onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
            placeholder="Make"
            className="border border-gray-300 rounded-md p-2"
          />
          <input
            type="text"
            value={newCar.car_model}
            onChange={(e) => setNewCar({ ...newCar, car_model: e.target.value })}
            placeholder="Model"
            className="border border-gray-300 rounded-md p-2"
          />
          <input
            type="number"
            value={newCar.year}
            onChange={(e) => setNewCar({ ...newCar, year: Number(e.target.value) })}
            placeholder="Year"
            className="border border-gray-300 rounded-md p-2"
          />
          <input
            type="text"
            value={newCar.color}
            onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
            placeholder="Color"
            className="border border-gray-300 rounded-md p-2"
          />
          <input
            type="number"
            value={newCar.price}
            onChange={(e) => setNewCar({ ...newCar, price: Number(e.target.value) })}
            placeholder="Price"
            className="border border-gray-300 rounded-md p-2"
          />
          <button
            onClick={handleAddCar}
            className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600"
          >
            Add Car
          </button>
        </div>

        <ul className="flex-1 space-y-4">
          {cars.map((car: ICar) => (
            <li key={car._id} className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-gray-300 rounded-md">
              <div className="flex flex-col">
                {editingCarId === car._id ? (
                  <>
                    <input
                      type="text"
                      value={editedCar.make}
                      onChange={(e) => setEditedCar({ ...editedCar, make: e.target.value })}
                      className="border border-gray-300 rounded-md p-1"
                    />
                    <input
                      type="text"
                      value={editedCar.car_model}
                      onChange={(e) => setEditedCar({ ...editedCar, car_model: e.target.value })}
                      className="border border-gray-300 rounded-md p-1"
                    />
                    <input
                      type="number"
                      value={editedCar.year}
                      onChange={(e) => setEditedCar({ ...editedCar, year: Number(e.target.value) })}
                      className="border border-gray-300 rounded-md p-1"
                    />
                    <input
                      type="text"
                      value={editedCar.color}
                      onChange={(e) => setEditedCar({ ...editedCar, color: e.target.value })}
                      className="border border-gray-300 rounded-md p-1"
                    />
                    <input
                      type="number"
                      value={editedCar.price}
                      onChange={(e) => setEditedCar({ ...editedCar, price: Number(e.target.value) })}
                      className="border border-gray-300 rounded-md p-1"
                    />
                  </>
                ) : (
                  <>
                    <p className="font-semibold">{car.make} {car.car_model}</p>
                    <p className="text-gray-500">{car.year} | {car.color} | ${car.price}</p>
                  </>
                )}
              </div>
              <button
                onClick={() => handleEditCar(car)}
                className={`ml-auto ${editingCarId === car._id ? 'bg-blue-500' : 'bg-yellow-500'} text-white p-2 rounded-md hover:bg-opacity-80`}
              >
                {editingCarId === car._id ? 'Save' : 'Edit'}
              </button>
              <button
                onClick={() => handleDeleteCar(car._id)}
                className="ml-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarsList;
