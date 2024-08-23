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
        <div className="card w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="p-4 border border-gray-200 rounded-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{event.name}</h3>
        
        <div className="text-gray-600 mb-1">
            <p className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 2a1 1 0 100 2V2zM6 4a1 1 0 11-2 0V2a1 1 0 112 0v2zm8 0a1 1 0 100 2V2a1 1 0 100-2v2zm-8 4a1 1 0 100 2v-2zm8 0a1 1 0 11-2 0v-2a1 1 0 112 0v2zM2 9a2 2 0 014 0v7H4V9a2 2 0 00-2-2zm12-7a2 2 0 014 0v7h-2V9a2 2 0 00-2-2zM7 9a2 2 0 012 2v7H5v-7a2 2 0 012-2zm8 0a2 2 0 012 2v7h-4v-7a2 2 0 012-2zM5 19a3 3 0 01-3-3h2a1 1 0 002 0h6a1 1 0 002 0h2a3 3 0 01-3 3H5zM5 19a1 1 0 00-1 1v2h8v-2a1 1 0 10-2 0H7a1 1 0 10-2 0H5z" />
                </svg>
                {formattedDate(event.date)}, {event.time}
            </p>
        </div>

        <p className="text-gray-600 mb-1">
            <svg className="w-5 h-5 inline mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 7h2v4H9V7zm0 6h2v2H9v-2z" />
            </svg>
            {event.location}
        </p>

        <p className="text-gray-600 mb-1">
            <svg className="w-5 h-5 inline mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 8h6v2H7V8z" />
            </svg>
            Capacity: {event.capacity || 'N/A'}
        </p>

        <p className="text-gray-600 mb-2">
            {event.description.length > 40
                ? `${event.description.substring(0, 40)}...`
                : event.description}
        </p>

        <div className="flex justify-between space-x-2">
            <button
                onClick={handleViewDetails}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
                View
            </button>
            <button
                onClick={() => onEdit(event)}
                className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-300"
            >
                Edit
            </button>
            <button
                onClick={() => onDelete(event._id || '')}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
                Delete
            </button>
        </div>
    </div>
</div>



    );
};

export default EventCard;
