"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { formattedDate } from '@/app/utils/datefun';
import LoadingPage from '../common/LoadingPage';

const EventSingle: React.FC = () => {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        // Replace this URL with your actual API endpoint
        const response = await axios.get(`/api/event?id=${id}`);
        setEvent(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch event data');
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (loading) return <LoadingPage/>
  if (error) return <div>{error}</div>;

  return (
    <>
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
          <h1 className="text-3xl font-bold text-white mb-4">{event.name}</h1>
          <p className="text-white text-lg">{formattedDate(event.date)}</p>
        </div>

        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Description</h2>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700">Location</h3>
                <p className="text-gray-600">{event.location}</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700">Capacity</h3>
                <p className="text-gray-600">{event.capacity} attendees</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='container mx-auto p-6 max-w-4xl'>
    <Link href={'/'} className='btn px-4 py-2 bg-blue-500 text-white'>Go to Home</Link>
    </div>
    </>
  );
};

export default EventSingle;
