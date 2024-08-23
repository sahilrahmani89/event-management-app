import {useState,useEffect} from "react";
import { useCustomToast } from "./useCustomToast";
import axios from 'axios';
import  { EventFormValues } from '@/app/components/event/EventForm';
import useSectionRefs from "./useMoveToSection";

const useHomePage = () =>{
  const [events, setEvents] = useState<EventFormValues[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState<EventFormValues |  null>(null);
  const { showToast } = useCustomToast();
  const {  scrollToSection ,registerRef} = useSectionRefs();
  const [loading,setloading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
        setloading(true)
      try {
        const response = await axios.get('/api/event');
        setEvents(response.data.data);
        setloading(false)
      } catch (error) {
        setloading(false)
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = async (newEvent: EventFormValues) => {
    try {
      const response = await axios.post('/api/event', newEvent);
      setEvents([...events, response.data.data]);
      setIsEditing(false);
      setInitialValues(null); // Reset after adding
      showToast('Added Successfully','success')
    } catch (error) {
      console.error('Error adding event:', error);
      showToast('Something Went Wrong','error')
    }
  };

  const editEvent = (event: EventFormValues) => {
    setInitialValues(event); // Pre-populate the form
    setIsEditing(true); // Set to edit mode
    scrollToSection('form-header')
  };

  const updateEvent = async (updatedEvent: EventFormValues) => {
    try {
      // Send a PUT request with the entire updated event data
      const response = await axios.put('/api/event', updatedEvent);
  
      // Update the events state with the returned data
      setEvents(events.map(event => event._id === updatedEvent._id ? response.data.data : event));
  
      // Reset form and editing state
      setIsEditing(false);
      setInitialValues(null); // Reset the form after updating
      showToast('Updated Successfully','success')
      
    } catch (error) {
      console.error('Error updating event:', error);
      showToast('Something Went Wrong','error')

    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedEventId(id);
    setModalVisible(true);
  };

  const deleteEvent = async (id: string | number) => {
    try {
      const response = await axios.delete('/api/event', {
        data: { id },
      });
      if (response.status === 200) {
        setEvents(events.filter(event => event._id !== id));
        showToast('Deleted Successfully','error')

      }
      setModalVisible(false);
    } catch (error) {
      console.error('Error deleting event:', error);
      showToast('Something Went Wrong','error')
    }
  };

  const handleConfirmDelete = () => {
    if (selectedEventId) {
      deleteEvent(selectedEventId);
    }
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
  };

    return{
        handleCancelDelete,
        handleConfirmDelete,
        handleDeleteClick ,
        isModalVisible,
        isEditing,
        initialValues,
        updateEvent,
        editEvent,
        addEvent,
        events,
        registerRef,
        loading
    }
}
export default useHomePage