"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { formattedDate } from '@/app/utils/datefun';
import LoadingPage from '../common/LoadingPage';
import Header from '../common/Header';
import useSingleEvent from '@/app/hooks/useSingleEvent';
import NotFound from '../common/NotFound';

const EventSingle: React.FC = () => {

  const { id } = useParams();
  const {
    loading,
    error,
    event,
  } = useSingleEvent(id)


  if (loading) return <LoadingPage />
  if (error) {
    return (
      <NotFound/>
    )
  };

  return (
    <>
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            <h1 className="text-3xl font-bold text-white mb-4">{event?.name}</h1>
            <p className="text-white text-lg">{formattedDate(event?.date)},<span className='ml-1'></span> {event?.time}</p>
          </div>

          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-2/3">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{event?.description}</p>
              </div>

              <div className="w-full lg:w-1/3 flex flex-col gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700">Location</h3>
                  <p className="text-gray-600">{event?.location}</p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700">Capacity</h3>
                  <p className="text-gray-600">{event?.capacity} attendees</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto p-6 max-w-4xl'>
        <Link href={'/'} className='btn px-4 py-2 bg-blue-500 text-white max-w-[350px] rounded-lg'>
          Go to Home
        </Link>
      </div>
    </>
  );
};

export default EventSingle;
