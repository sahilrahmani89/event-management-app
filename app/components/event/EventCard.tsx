import { useRouter } from 'next/navigation';
import { EventFormValues } from './EventForm';
import { formattedDate } from '@/app/utils/datefun';


interface EventCardProps {
    event: EventFormValues;
    onEdit: (event: EventFormValues) => void;
    onDelete: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
    const router = useRouter();

    const handleViewDetails = () => {
        router.push(`/event/${event._id}`);
    };

    return (
        <div className="card w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{event.name}</h3>
                <p className="text-gray-600 mb-1">{formattedDate(event.date)}</p>
                <p className="text-gray-600 mb-1">{event.location}</p>
                <p className="text-gray-600 mb-1">Capacity: {event.capacity || 'N/A'}</p>
                <p className="text-gray-600 mb-2">
                    {event.description.length > 40
                        ? `${event.description.substring(0, 40)}...`
                        : event.description}
                </p>
                <div className="flex justify-between space-x-2">
                    <button
                        onClick={handleViewDetails}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        View
                    </button>
                    <button
                        onClick={() => onEdit(event)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(event._id || '')}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>


    );
};

export default EventCard;
