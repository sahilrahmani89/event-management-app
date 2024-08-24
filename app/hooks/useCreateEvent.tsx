import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { EventFormValues } from "../components/event/EventForm";
import { useCustomToast } from "./useCustomToast";
import axios from "axios";

const useCreateEvent = () => {
    const router = useRouter()
    const [events, setEvents] = useState<EventFormValues[]>([]);
    const { showToast } = useCustomToast();
    const [initialValues, setInitialValues] = useState<EventFormValues | null>(null);
    const addEvent = async (newEvent: EventFormValues) => {
        try {
            const response = await axios.post('/api/event', newEvent);
            setEvents([...events, response.data.data]);
            setInitialValues(null); // Reset after adding
            showToast('Added Successfully', 'success')
            if (response.data.statusCode === 201 || response.data.statusCode === 200) {
                router.push('/')
            }
        } catch (error) {
            console.error('Error adding event:', error);
            showToast('Something Went Wrong', 'error')
        }
    };
    return {
        addEvent,
        initialValues,
    }
}

export default useCreateEvent