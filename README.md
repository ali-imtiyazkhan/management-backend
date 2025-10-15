# Event Management API

## Project Overview

This project is a full-stack Event Management system that allows users to create events, register for them, cancel registrations, and view event details. Built with Node.js, Express, PostgreSQL, and Prisma ORM on the backend, and React with TypeScript on the frontend.

---

## Features

### Backend
- Create, read, update, and delete (CRUD) operations for events and users.
- User registration and cancellation for events.
- Validation rules including event capacity limits, no duplicate registrations, and no registrations for past events.
- Fetch upcoming events sorted by date and location.
- Event statistics including total registrations, remaining capacity, and percentage used.
- Proper HTTP status codes and detailed error messages.
- Database schema designed with many-to-many relationships (Users ↔ Events).

### Frontend
- Interactive interface to create events and view event lists.
- Detailed event page displaying registered users.
- User registration form with real-time validation feedback.
- Proper date/time formatting and timezone handling.
- TypeScript for type safety and clarity.

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- PostgreSQL database (Neon.tech or other)
- npm or yarn
- Git

### Setup Backend

1. Clone the repository:
