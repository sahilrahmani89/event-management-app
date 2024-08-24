import axios from 'axios';
import React ,{useState,useEffect} from 'react'

const useSingleEvent = (id:string|string[]) =>{

    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`/api/event?id=${id}`);
            setEvent(response.data.data);
            setLoading(false);
          } catch (error) {
            setError('No data found!');
            setLoading(false);
          }
        };
    
        if (id) {
          fetchEvent();
        }
      }, [id]);

    return{
        error,
        loading,
        event,
    }
}

export default useSingleEvent