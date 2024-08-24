import {useState,useEffect} from "react";
import { useCustomToast } from "./useCustomToast";
import axios from 'axios';
import  { EventFormValues } from '@/app/components/event/EventForm';


const useHomePage = () =>{
  const [events, setEvents] = useState<EventFormValues[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { showToast } = useCustomToast();

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
        events,
        loading
    }
}
export default useHomePage