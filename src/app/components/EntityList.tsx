"use client";
import React, { useState, useEffect } from 'react';
import { createCar, getAllCars, updateCar, deleteCar } from '../services/carServices';
import { createPost, getAllPosts, updatePost, deletePost } from '../services/postServices';
import { createBook, getAllBooks, updateBook, deleteBook } from '../services/bookServices';

type Entity = 'cars' | 'posts' | 'books';

interface EntityListProps {
  entityType: Entity;
}

const EntityList: React.FC<EntityListProps> = ({ entityType }) => {
  const [entities, setEntities] = useState<any[]>([]);
  const [newEntity, setNewEntity] = useState<any>({});
  const [editingEntityId, setEditingEntityId] = useState<string | null>(null);
  const [editedEntity, setEditedEntity] = useState<any>({});

  const entityServices = {
    cars: {
      getAll: getAllCars,
      create: createCar,
      update: updateCar,
      deleteEntity: deleteCar,
    },
    posts: {
      getAll: getAllPosts,
      create: createPost,
      update: updatePost,
      deleteEntity: deletePost,
    },
    books: {
      getAll: getAllBooks,
      create: createBook,
      update: updateBook,
      deleteEntity: deleteBook,
    },
  };

  const { getAll, create, update, deleteEntity } = entityServices[entityType];

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const entityList = await getAll();
        setEntities(entityList);
      } catch (error) {
        console.error(`Failed to fetch ${entityType}:`, error);
      }
    };
    fetchEntities();
  }, [entityType]);

  const handleAddEntity = async () => {
    if (Object.values(newEntity).every(val => val)) {
      try {
        const entityToAdd = { ...newEntity };
        const newEntityData = await create(entityToAdd);
        setEntities((prevEntities) => [...prevEntities, newEntityData]);
        setNewEntity({});
      } catch (error) {
        console.error(`Failed to add ${entityType}:`, error);
      }
    }
  };

  const handleEditEntity = async (entity: any) => {
    if (editingEntityId === entity._id) {
      const updatedEntity = { ...editedEntity };
      try {
        const updatedEntityData = await update(entity._id, updatedEntity);
        setEntities((prevEntities) =>
          prevEntities.map((e) => (e._id === entity._id ? updatedEntityData : e))
        );
        setEditingEntityId(null);
      } catch (error) {
        console.error(`Failed to update ${entityType}:`, error);
      }
    } else {
      setEditingEntityId(entity._id);
      setEditedEntity({ ...entity });
    }
  };

  const handleDeleteEntity = async (entityId: string) => {
    try {
      await deleteEntity(entityId);
      setEntities((prevEntities) => prevEntities.filter((entity) => entity._id !== entityId));
    } catch (error) {
      console.error(`Failed to delete ${entityType}:`, error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mt-16 mb-6">{entityType.charAt(0).toUpperCase() + entityType.slice(1)} List</h1>
      <div className="flex flex-col sm:flex-row gap-8 items-start w-full max-w-4xl">
        <div className="flex flex-col gap-4 max-w-xs">
          {entityType === 'cars' && (
            <>
              <input
                type="text"
                value={newEntity.make || ''}
                onChange={(e) => setNewEntity({ ...newEntity, make: e.target.value })}
                placeholder="Make"
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                value={newEntity.car_model || ''}
                onChange={(e) => setNewEntity({ ...newEntity, car_model: e.target.value })}
                placeholder="Model"
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="number"
                value={newEntity.year || ''}
                onChange={(e) => setNewEntity({ ...newEntity, year: Number(e.target.value) })}
                placeholder="Year"
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                value={newEntity.color || ''}
                onChange={(e) => setNewEntity({ ...newEntity, color: e.target.value })}
                placeholder="Color"
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="number"
                value={newEntity.price || ''}
                onChange={(e) => setNewEntity({ ...newEntity, price: Number(e.target.value) })}
                placeholder="Price"
                className="border border-gray-300 rounded-md p-2"
              />
            </>
          )}
          {entityType === 'posts' && (
            <>
              <input
                type="text"
                value={newEntity.title || ''}
                onChange={(e) => setNewEntity({ ...newEntity, title: e.target.value })}
                placeholder="Title"
                className="border border-gray-300 rounded-md p-2"
              />
              <textarea
                value={newEntity.content || ''}
                onChange={(e) => setNewEntity({ ...newEntity, content: e.target.value })}
                placeholder="Content"
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                value={newEntity.author || ''}
                onChange={(e) => setNewEntity({ ...newEntity, author: e.target.value })}
                placeholder="Author"
                className="border border-gray-300 rounded-md p-2"
              />
            </>
          )}
          {entityType === 'books' && (
            <>
              <input
                type="text"
                value={newEntity.title || ''}
                onChange={(e) => setNewEntity({ ...newEntity, title: e.target.value })}
                placeholder="Title"
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                value={newEntity.author || ''}
                onChange={(e) => setNewEntity({ ...newEntity, author: e.target.value })}
                placeholder="Author"
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="number"
                value={newEntity.price || ''}
                onChange={(e) => setNewEntity({ ...newEntity, price: Number(e.target.value) })}
                placeholder="Price"
                className="border border-gray-300 rounded-md p-2"
              />
            </>
          )}
          <button
            onClick={handleAddEntity}
            className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600"
          >
            Add {entityType.slice(0, -1)}
          </button>
        </div>

        <ul className="flex-1 space-y-4">
          {entities.map((entity) => (
            <li key={entity._id} className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-gray-300 rounded-md">
              <div className="flex flex-col">
                {editingEntityId === entity._id ? (
                  <>
                    {entityType === 'cars' && (
                      <>
                        <input
                          type="text"
                          value={editedEntity.make || ''}
                          onChange={(e) => setEditedEntity({ ...editedEntity, make: e.target.value })}
                          placeholder="Make"
                          className="border border-gray-300 rounded-md p-1"
                        />
                        <input
                          type="text"
                          value={editedEntity.car_model || ''}
                          onChange={(e) => setEditedEntity({ ...editedEntity, car_model: e.target.value })}
                          placeholder="Model"
                          className="border border-gray-300 rounded-md p-1"
                        />
                        <input
                          type="number"
                          value={editedEntity.year || ''}
                          onChange={(e) => setEditedEntity({ ...editedEntity, year: Number(e.target.value) })}
                          placeholder="Year"
                          className="border border-gray-300 rounded-md p-1"
                        />
                        <input
                          type="text"
                          value={editedEntity.color || ''}
                          onChange={(e) => setEditedEntity({ ...editedEntity, color: e.target.value })}
                          placeholder="Color"
                          className="border border-gray-300 rounded-md p-1"
                        />
                        <input
                          type="number"
                          value={editedEntity.price || ''}
                          onChange={(e) => setEditedEntity({ ...editedEntity, price: Number(e.target.value) })}
                          placeholder="Price"
                          className="border border-gray-300 rounded-md p-1"
                        />
                      </>
                    )}
                    {entityType === 'posts' && (
                      <>
                        <input
                          type="text"
                          value={editedEntity.title || ''}
                          onChange={(e) => setEditedEntity({ ...editedEntity, title: e.target.value })}
                          placeholder="Title"
                          className="border border-gray-300 rounded-md p-1"
                        />
                        <textarea
                          value={editedEntity.content || ''}
                          onChange={(e) => setEditedEntity({ ...editedEntity, content: e.target.value })}
                          placeholder="Content"
                          className="border border-gray-300 rounded-md p-1"
                        />
                        <input
                          type="text"
                          value={editedEntity.author || ''}
                          onChange={(e) => setEditedEntity({ ...editedEntity, author: e.target.value })}
                          placeholder="Author"
                          className="border border-gray-300 rounded-md p-1"
                        />
                      </>
                    )}
                    {entityType === 'books' && (
                      <>
                        <input
                          type="text"
                          value={editedEntity.title || ''}
                          onChange={(e) => setEditedEntity({ ...editedEntity, title: e.target.value })}
                          placeholder="Title"
                          className="border border-gray-300 rounded-md p-1"
                        />
                        <input
                          type="text"
                          value={editedEntity.author || ''}
                          onChange={(e) => setEditedEntity({ ...editedEntity, author: e.target.value })}
                          placeholder="Author"
                          className="border border-gray-300 rounded-md p-1"
                        />
                        <input
                          type="number"
                          value={editedEntity.price || ''}
                          onChange={(e) => setEditedEntity({ ...editedEntity, price: Number(e.target.value) })}
                          placeholder="Price"
                          className="border border-gray-300 rounded-md p-1"
                        />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <p className="font-semibold">{entity.title || `${entity.make} ${entity.car_model}`}</p>
                    <p className="text-gray-500">
                      {entity.price ? `$${entity.price}` : null}
                    </p>
                  </>
                )}
              </div>
              <button
                onClick={() => handleEditEntity(entity)}
                className={`ml-auto ${editingEntityId === entity._id ? 'bg-blue-500' : 'bg-yellow-500'} text-white p-2 rounded-md hover:bg-opacity-80`}
              >
                {editingEntityId === entity._id ? 'Save' : 'Edit'}
              </button>
              <button
                onClick={() => handleDeleteEntity(entity._id)}
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

export default EntityList;
