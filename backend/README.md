# Event Booking System

## Overview

This is a personal project aimed at building a simplified Event Booking System. It allows event organizers to create and manage events, and customers to view available events, book tickets, and manage their bookings. The system is designed with a clear separation of concerns, utilizing a modern JavaScript framework for the frontend and a robust PHP framework for the backend API.

## Features

### Event Organizer

-   **Create Events:** Organizers can create new events by providing details such as name, date, venue, total available tickets, and ticket price.

### Customer

-   **View Available Events:** Customers can browse a list of upcoming events. The system implements special logic for VIP users, allowing them early access to view newly created events within the first 24 hours.
-   **Book Tickets:** Customers can book tickets for an event, with validation checks for ticket availability and event status.
-   **View Booking Details:** Customers can view the specifics of their confirmed bookings, including event information and total cost.
-   **Cancel Booking:** Customers have the option to cancel their existing bookings, which refunds the tickets and makes them available to other users.

## Technologies Used

### Backend (API)

-   **Laravel**: A PHP web application framework with expressive, elegant syntax. It provides a robust foundation for the API, handling routing, database interactions (Eloquent ORM), validation, and more.
-   **PostgresSQL**: A powerful, open source object-relational database system.
-   (Optional: Add any other backend tools/libraries you plan to use, e.g., for authentication, testing)

### Frontend (Client)

-   **Nuxt.js**: An open-source framework that makes web development simple and powerful. It's built on Vue.js.
-   (Optional: Add any other frontend tools/libraries you plan to use, e.g., Vuex for state management, Axios for HTTP requests, a UI library like Vuetify/Tailwind CSS)

## Project Structure

The project is split into two main parts:

1.  **`backend/`**: Contains the Laravel API application. This handles all business logic, database interactions, and exposes the RESTful API endpoints.
2.  **`frontend/`**: Contains the Nuxt.js client application. This consumes the backend API to provide a rich user interface.

## Setup and Installation

### Prerequisites

Before you begin, ensure you have the following installed:

-   **PHP**: Version 8.3 or higher (for Laravel)
-   **Composer**: PHP Dependency Manager
-   **Node.js**: Version 22.11.0 or higher (for Nuxt.js)
-   **npm** or **Yarn**: Node.js Package Manager
-   **A Database System**: (e.g., MySQL, PostgreSQL, or SQLite if using file-based)

### Backend Setup (Laravel)

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd event-booking-system/backend
    ```
2.  **Install PHP dependencies:**
    ```bash
    composer install
    ```
3.  **Copy the environment file:**
    ```bash
    cp .env.example .env
    ```
4.  **Generate application key:**
    ```bash
    php artisan key:generate
    ```
5.  **Configure your database:**
    Open the `.env` file and update the `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` variables to match your database setup.
6.  **Run database migrations:**
    ```bash
    php artisan migrate
    ```
7.  **Serve the Laravel application:**
    ```bash
    php artisan serve
    ```
    The API will typically be available at `http://127.0.0.1:8000/api`.

### Frontend Setup (Nuxt.js)

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend # If you are in the backend directory, or
    # cd event-booking-system/frontend
    ```
2.  **Install Node.js dependencies:**
    ```bash
    npm install # or yarn install
    ```
3.  **Configure API base URL:**
    You might need to configure the base URL for your Laravel API in your Nuxt.js project's `.env` file or `nuxt.config.js` (e.g., `NUXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api`).
4.  **Run the Nuxt.js development server:**
    ```bash
    npm run dev # or yarn dev
    ```
    The frontend application will typically be available at `http://localhost:3000`.

## API Endpoints

Here's a summary of the API endpoints will be implement in the backend:

### Events

-   `POST /api/events`: Create a new event.
    -   **Body:** `{name, date, venue, totalTickets, ticketPrice}`
-   `GET /api/events`: Retrieve a list of available events.
    -   **Response:** `{name, date, venue, availableTicket}`

### Bookings

-   `POST /api/bookings`: Book tickets for an event.
    -   **Body:** `{eventId, numOfTickets}`
-   `GET /api/bookings`: View details of a specific booking (authentication required).
    -   **Response:** `{event, numOfTickets, totalPrice}`
-   `DELETE /api/bookings/{id}`: Cancel a ticket booking.

## Database Schema (ER Diagram)

This project uses the following database schema:

-   `TBA`
