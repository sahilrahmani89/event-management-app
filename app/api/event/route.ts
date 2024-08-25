import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/app/lib/mongoose';
import Event from '@/app/model/Event';
import { NextRequest } from 'next/server';


export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, date, location, description, capacity , time } = body;
    // Input Validation
    if (!name || !date || !location || !description || !capacity || !time) {
      return new Response(
        JSON.stringify({ message: 'All Fields are required', statusCode: 400, data: [] }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Create Event
    const event = new Event({
      name,
      date: new Date(date),
      location,
      description,
      capacity,
      time
    });

    await event.save();

    return new Response(JSON.stringify({ statusCode: 201, data: event, message: 'Data added Successfuly!' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error: any) {
    console.log('errro',error)
    return new Response(JSON.stringify({ statusCode: 500, data: [], message: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

// GET all events or a specific event by ID
export async function GET(request:NextRequest) {
  try {
    await dbConnect();

    // Get the URL and extract the ID if present
    const { searchParams } = new URL(request.url ||
      ''
    );
    const id = searchParams.get('id');

    if (id) {
      // Fetch a specific event by ID
      const event = await Event.findById(id);

      // Check if the event exists
      if (!event) {
        return new Response(
          JSON.stringify({
            message: 'Event not found',
            statusCode: 404,
            data: [],
          }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Return the event data
      return new Response(
        JSON.stringify({
          message: 'Event fetched successfully',
          statusCode: 200,
          data: event,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      // Fetch all events if no ID is provided
      const events = await Event.find({});
      return new Response(
        JSON.stringify({
          message: 'All events fetched successfully',
          statusCode: 200,
          data: events,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: 'Error fetching event',
        statusCode: 500,
        data: [],
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
// PUT Method - Update an existing event
export async function PUT(req: Request) {
  try {
    await dbConnect();
    
    const body = await req.json();

    // Destructure the body to extract the fields (some may be optional)
    const { _id, name, date, location, description, capacity,time } = body;

    // Ensure the `id` field is provided, as it's required for identifying the event to update
    if (!_id) {
      return new Response(
        JSON.stringify({
          message: 'ID is required to update the event',
          statusCode: 400,
          data: [],
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Build the update object dynamically
    const updateData: any = {};
    if (name) updateData.name = name;
    if (date) updateData.date = new Date(date);
    if (location) updateData.location = location;
    if (description) updateData.description = description;
    if (capacity) updateData.capacity = capacity;
    if (time) updateData.time = time

    // Find the event by ID and update it with the fields provided
    const updatedEvent = await Event.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    );

    // Check if the event was found and updated
    if (!updatedEvent) {
      return new Response(
        JSON.stringify({
          message: 'Event not found',
          statusCode: 404,
          data: [],
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Respond with the updated event data
    return new Response(
      JSON.stringify({
        message: 'Event updated successfully',
        statusCode: 200,
        data: updatedEvent,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: 'Error updating event',
        statusCode: 500,
        data: [],
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}


// DELETE Method - Delete an event by ID
export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const body = await request.json()
    const {id} = body

    if (!id) {
      return new Response(
        JSON.stringify({ message: 'ID is required', statusCode: 400, data: [] }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return new Response(
        JSON.stringify({ message: 'Event not found', statusCode: 404, data: [] }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Event deleted successfully', statusCode: 200, data: deletedEvent }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: 'Error deleting event', statusCode: 500, data: [] }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
