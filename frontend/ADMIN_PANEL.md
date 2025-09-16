# Admin Panel Documentation

## Overview

The admin panel provides comprehensive management capabilities for the E-Ticketing system. It includes dashboard analytics, event management, booking oversight, and user administration.

## Features

### Dashboard (`/admin`)

- **Statistics Overview**: Total events, bookings, users, and revenue
- **Recent Activity**: Latest events and bookings with quick access
- **Visual Cards**: Clean, informative display of key metrics

### Events Management (`/admin/events`)

- **Event Listing**: View all events with availability status
- **Create Events**: Form to add new events with validation
- **Edit/Delete**: Modify or remove existing events
- **Progress Bars**: Visual representation of ticket sales

### Bookings Management (`/admin/bookings`)

- **Booking Overview**: Complete list of all bookings
- **Filtering**: Search by event, status, or user
- **User Details**: Customer information and booking history
- **Cancel Bookings**: Admin ability to cancel bookings

### Users Management (`/admin/users`)

- **User Directory**: Complete user list with roles
- **Role Management**: Admin, VIP, and regular user roles
- **User Statistics**: Booking count and spending totals
- **User Actions**: View, edit, or delete user accounts

## Navigation

- **Sidebar Navigation**: Persistent sidebar with active state indicators
- **Breadcrumb Navigation**: Easy navigation between admin sections
- **Back to Site**: Quick return to main application

## Technical Implementation

- **Layout**: Custom admin layout with sidebar and main content area
- **Components**: Built with Nuxt UI free components and Tailwind CSS
- **Responsive**: Mobile-friendly design with responsive grid layouts
- **Mock Data**: Currently uses mock data for demonstration

## Future Enhancements

- API integration with Laravel backend
- Real-time statistics updates
- Advanced filtering and search
- Export functionality for reports
- User role management interface
- Event analytics and insights
