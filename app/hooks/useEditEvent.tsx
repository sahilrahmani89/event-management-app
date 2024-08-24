import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useCustomToast } from './useCustomToast';
import axios from 'axios';
import { EventFormValues } from '../components/event/EventForm';

const useEditEvent = (id:string|string[]) => {
    const router = useRouter()
    const [formData, setFormData] = useState({ name: '', date: '', time:'', location: '', description: '', capacity: 1,  });
    const { showToast } = useCustomToast();
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                // Replace this URL with your actual API endpoint
                const response = await axios.get(`/api/event?id=${id}`);
                setFormData(response.data.data);
                setLoading(false);
              } catch (error) {
                setError('Failed to fetch event data');
                setLoading(false);
              }
        };
        
        fetchEvent();
      }, [id]);

      const updateEvent = async (updatedEvent: EventFormValues) => {
        try {
          // Send a PUT request with the entire updated event data
          const response = await axios.put('/api/event', updatedEvent);
          if(response.data.statusCode===200){
            router.push('/')
        }
          showToast('Updated Successfully','success')
          
        } catch (error) {
          console.error('Error updating event:', error);
          showToast('Something Went Wrong','error')
    
        }
      };

  return {
    updateEvent,
    loading,
    error,
    formData,
  }
}

export default useEditEvent