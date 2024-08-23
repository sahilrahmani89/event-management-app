

## Getting Started

### Prerequisites

- Nextjs
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/sahilrahmani89/event-management-app.git
    cd event-management-app
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add your MongoDB connection string:
    ```env
    uri=mongodb+srv://<username>:<password>@cluster.mongodb.net/yourdbname
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Usage

1. **Create an Event**: On the homepage, fill out the event form and submit it.
2. **View Events**: After submission, the event will appear in the card list on the homepage.
3. **Edit an Event**: Click the "Edit" button on any event card to modify the event's details.
4. **Delete an Event**: Click the "Delete" button to remove an event.
5. **View Event Details**: Click the "View" button on any event card to see detailed information.

# Event Management App

Welcome to the Event Management App! This application allows users to manage events by creating, viewing, editing, and deleting them. The app is built using Next.js 14, TypeScript, Tailwind CSS, and MongoDB for the backend.

## Features

- **Create Events**: Users can fill out a form on the homepage to create new events. The form includes fields for the event Event name, date and time, location, description, and capacity.
- **View Events**: After submitting the form, the events are displayed in a responsive card list on the homepage. Each card contains basic information about the event and options to view, edit, or delete the event.
- **Edit Events**: Users can edit the details of an event. The edit form is pre-filled with the current event information.
- **Delete Events**: Users can delete an event. A confirmation prompt ensures that the event is not deleted accidentally.
- **View Event Details**: Users can click on the "View" button on an event card to navigate to a detailed page showing all the information about the event.

## Technologies Used

- **Next.js 14**: A React framework used for building the frontend and backend of the application.
- **TypeScript**: Used for type safety and better development experience.
- **Tailwind CSS**: A utility-first CSS framework used for responsive and modern UI design.
- **MongoDB**: A NoSQL database used to store event data.




