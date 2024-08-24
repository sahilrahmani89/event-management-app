"use client"
import React  from 'react'
import { useParams } from 'next/navigation';
import EventForm, { EventFormValues } from './EventForm';

import useEditEvent from '@/app/hooks/useEditEvent';
import LoadingPage from '../common/LoadingPage';
import NotFound from '../common/NotFound';

const EditEvent = () => {
    
    const { id } = useParams();
    const {error,formData,
        loading,updateEvent
    } = useEditEvent(id)

    if (loading) return <LoadingPage />

    if (error) {
        return (
        <NotFound/>
        )
    };

  return (
    <>
    <div className="container mx-auto p-4">
         <h1 className='flex justify-center items-center text-xl font-bold mb-4'>Edit the event</h1>
        <EventForm
            onSubmit={updateEvent}
            initialValues={formData}
            isEditing={true}
        />
    </div>
    </>
  )
}

export default EditEvent