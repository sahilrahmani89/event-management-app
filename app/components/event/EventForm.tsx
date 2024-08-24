import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface EventFormProps {
    onSubmit: (values: EventFormValues) => void;
    initialValues?: EventFormValues | null | undefined;
    isEditing?: boolean;
    registerRef?: (name: string, ref: HTMLElement | null) => void;
}

export interface EventFormValues {
    name: string;
    date: string;
    location: string;
    description: string;
    capacity: number;
    _id?: string;
    time:string;
}

// Utility function to format the date
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD' format
};

const EventForm: React.FC<EventFormProps> = ({ onSubmit, initialValues, isEditing, registerRef }) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        date: Yup.string().required('Required'),
        time: Yup.string().required('Required'),
        location: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        capacity: Yup.number().required('Required').min(1, 'At least 1'),
    });
  
    const router = useRouter()

    useEffect(() => {
        if (initialValues?.date) {
            initialValues.date = formatDate(initialValues.date); // Ensure date is in the correct format
        }
    }, [initialValues]);

   

    const handleCancel = () =>{
        router.back()
    }
    return (
        <div >
            <Formik
                initialValues={initialValues || { name: '', date: '' ,time:'', location: '', capacity: 1 , description: ''}}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={(values, { resetForm }) => {
                    onSubmit(values);
                    if (!isEditing) {
                        resetForm();
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-6 p-6 bg-slate-200 rounded-lg shadow-lg "  >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" >
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="font-medium text-gray-700">Event Name</label>
                                <Field name="name" type="text" className="input px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter event name" />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="date" className="font-medium text-gray-700">Event Date</label>
                                <Field name="date" type="date" className="input px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700">
                                    Event Time
                                </label>
                                <Field
                                    id="time"
                                    name="time"
                                    type="time"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                <ErrorMessage name="time" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="location" className="font-medium text-gray-700">Location</label>
                                <Field name="location" type="text" className="input px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter location" />
                                <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
                            </div>

                            

                            <div className="flex flex-col gap-2">
                                <label htmlFor="capacity" className="font-medium text-gray-700">Capacity</label>
                                <Field name="capacity" type="number" className="input px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter capacity" />
                                <ErrorMessage name="capacity" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="description" className="font-medium text-gray-700">Description</label>
                                <Field name="description" as="textarea" className="input px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter event description" rows="4" />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full max-w-[350px] py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                {isEditing ? 'Update' : 'Submit'}
                            </button>

                            <button
                                type='button'
                                onClick={handleCancel}
                                className="w-full max-w-[350px] py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 ml-3"
                            >
                                Cancel
                            </button>
                        </div>
                        
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EventForm;
