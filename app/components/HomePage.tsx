"use client"
import React from 'react';
import EventForm from './event/EventForm';
import EventCard from './event/EventCard';
import PopupModal from './common/PopupModal';
import NoItemsToShow from './common/NoItemToShow';
import useHomePage from '../hooks/useHomePage';
import LoadingPage from './common/LoadingPage';



const HomePage: React.FC = () => {
  const {
    addEvent,
    editEvent,
    handleCancelDelete,
    handleConfirmDelete,
    handleDeleteClick,
    initialValues,
    isEditing,
    isModalVisible,
    updateEvent,
    events,
    registerRef,
    loading,
  } = useHomePage()
  //  

  return (
    <div className="container mx-auto p-4">
      <h1 className='flex justify-center items-center text-xl font-bold mb-4'>Event Management App</h1>
      <EventForm 
         onSubmit={isEditing ? updateEvent : addEvent} 
         initialValues={initialValues} isEditing={isEditing} 
         registerRef={registerRef}
      />
      <div className="flex flex-col items-center justify-center  p-4 bg-gray-50">
    {
      loading  ?  <LoadingPage /> :''
    }
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {events.map((event) => (
            <EventCard 
              key={event._id} 
              event={event} 
              onEdit={editEvent} 
              onDelete={handleDeleteClick} 
            />
          ))}
        </div>
      ) : (
        <NoItemsToShow />
      )}
    </div>
      {isModalVisible && (
        <PopupModal
          message="Are you sure you want to delete this event?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

    </div>
  );
};

export default HomePage;
