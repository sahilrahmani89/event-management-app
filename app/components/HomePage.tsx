"use client"
import React from 'react';
import EventCard from './event/EventCard';
import PopupModal from './common/PopupModal';
import NoItemsToShow from './common/NoItemToShow';
import useHomePage from '../hooks/useHomePage';
import LoadingPage from './common/LoadingPage';
import Link from 'next/link';




const HomePage: React.FC = () => {

  const {
    handleCancelDelete,
    handleConfirmDelete,
    handleDeleteClick,
    isModalVisible,
    events,
    loading,
  } = useHomePage()
  //  

  return (
    <>
      <div className="container mx-auto p-4">
        <div className='flex justify-end'>
          <Link
            href={`/event/create`}
            className='flex px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors duration-300 text-center'
          >Create Event</Link>
        </div>
        <div className="flex flex-col items-center justify-center  p-4 bg-gray-50">
          {
            loading ? <LoadingPage /> :

              events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                  {events.map((event) => (
                    <EventCard
                      key={event._id}
                      event={event}
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
    </>
  );
};

export default HomePage;
