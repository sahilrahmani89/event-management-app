import mongoose, { Schema, model, models } from 'mongoose';

interface IEvent {
  name: string;
  date: Date;
  location: string;
  description: string;
  capacity: number;
  time:string
}

const eventSchema = new Schema<IEvent>({
  name: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: [1, 'Capacity must be at least 1'],
  },
});

const Event = models.Event || model<IEvent>('Event', eventSchema);

export default Event;
