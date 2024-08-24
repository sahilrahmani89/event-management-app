"use client"
import React from 'react'
import EventForm from './EventForm'
import useCreateEvent from '@/app/hooks/useCreateEvent';

const CreateEvent = () => {

    const {
        addEvent,
        initialValues,
    } = useCreateEvent()

  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className='flex justify-center items-center text-xl font-bold mb-4'>Create an Event</h1>
        <EventForm 
         onSubmit={addEvent} 
         initialValues={initialValues} 
      />
    </div>
    </>
  )
}

export default CreateEvent