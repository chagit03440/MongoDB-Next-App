"use client";
import EntityList from '@/app/components/EntityList';
import React, { useEffect, useState } from 'react';
import { createCar, getAllCars, updateCar, deleteCar } from '@/app/services/carServices';
import ICar from '@/app/types/CarForSchema';

const Page = () => {
  const [cars, setCars] = useState<ICar[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars();
        setCars(data || []);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
        setCars([]); 
      }
    };
    fetchCars();
  }, []);

  const handleCreate = async (carData: ICar) => {
    await createCar(carData);
    const updatedCars = await getAllCars();
    setCars(updatedCars);
  };

  const handleUpdate = async (id: string, carData: ICar) => {
    await updateCar(id, carData);
    const updatedCars = await getAllCars();
    setCars(updatedCars);
  };

  const handleDelete = async (id: string) => {
    await deleteCar(id);
    setCars((prevCars) => prevCars.filter((car) => car._id !== id));
  };

  const carServices = {
    create: handleCreate,
    update: handleUpdate,
    deleteEntity: handleDelete,
  };

  return (
    <div>
      <EntityList entities={cars} entityType="cars" entityServices={carServices} />
    </div>
  );
};

export default Page;
